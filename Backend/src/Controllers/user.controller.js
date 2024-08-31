import { asyncHandler } from '../Utils/asyncHandler.js'
import ApiError from '../Utils/ApiError.js'
import ApiResponse from '../Utils/ApiResponse.js'
import { User } from '../Models/user.model.js'
import jwt from 'jsonwebtoken'
import {sendWAMessage} from '../Utils/messagingService.js'
import speakeasy from 'speakeasy';
import { randomString, generateOTP } from '../Utils/helpers.js'
let otpExpiry = 0;

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.accessToken = accessToken
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false }) // so that all validations dont kick in only changes are saved
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(
            500,
            'Something went wrong while generating refresh and access token'
        )
    }
}

const registerLoginUser = asyncHandler(async (req, res) => {
    try {
        const { phone_number, password } = req.body
        if (phone_number.trim().length == 0 || password.trim().length == 0) {
            throw new ApiError(400, 'All fields required')
        }

        // check if already exist
        const exsistingUser = await User.findOne({
            $or: [{ phone_number }],
        })
        
        // otp creation
        const secretBase32 = process.env.otp_secret_key;  
        let otp = generateOTP(secretBase32);
        otpExpiry = Date.now() + (60000*5);
        
        if (exsistingUser) {
            const passValid = await exsistingUser.isPasswordCorrect(password)
            if (!passValid) {
                throw new ApiError(401, 'Unauthorized access')
            }

            sendWAMessage(exsistingUser.phone_number, otp);

            const sendingUser = await User.findById(exsistingUser._id).select("-password -refreshToken");
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        { user: sendingUser},
                        'User logged in successfully'
                    )
                )
        } else {
            // save to db
            const user = await User.create({
                password: password,
                phone_number: phone_number,
            })

            const check = await User.findById(user._id).select(
                '-password -refreshToken'
            )

            if (!check) {
                throw new ApiError(500, 'User not saved')
            }
    
            sendWAMessage(exsistingUser.phone_number, otp);

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        { user: check },
                        'User signed up successfully'
                    )
                )
        }
    } catch (error) {
        throw new ApiError(500, 'Something went wrong in registerLoginUser')
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined,
            },
        },
        {
            new: true,
        }
    )

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
    }

    return res
        .status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(new ApiResponse(200, {}, 'Logout success'))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken
        if (!incomingRefreshToken) {
            throw new ApiError(401, 'refreshTokenReq')
        }

        const decodedRefreshToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedRefreshToken?._id)
        console.log(user)
        if (!user) {
            throw new ApiError(
                401,
                'Unauthorized access using invalid refresh token'
            )
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, 'Refresh token doesnt match in DB')
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(decodedRefreshToken?._id)
        const options = {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
        }
        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken },
                    'New access token generated successfully'
                )
            )
    } catch (error) {
        throw new ApiError(500, 'Something went wrong in refreshAccessToken')
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body
        const user = await User.findById(req.user._id)
        const isPassCorrect = await user.isPasswordCorrect(oldPassword)
        if (!isPassCorrect) {
            throw new ApiError(400, 'Invalid old password')
        }

        user.password = newPassword
        await user.save({ validateBeforeSave: false })

        return res
            .status(200)
            .json(new ApiResponse(200, {}, 'Password change success'))
    } catch (error) {}
})

const deleteUserByPhone = asyncHandler(async (req, res) => {
    const { phone_number } = req.body

    if (!phone_number || phone_number.trim().length === 0) {
        throw new ApiError(400, 'Email is required')
    }

    const user = await User.findOneAndDelete({ phone_number })

    if (!user) {
        throw new ApiError(404, 'User not found')
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                `User with email ${phone_number} deleted successfully`
            )
        )
})

const verifyOTP = asyncHandler(async (req, res) => {
    try {
        const {enteredOTP, phone_number} = req.body; 
        if (phone_number.trim().length == 0 || enteredOTP.trim().length == 0) {
            throw new ApiError(400, 'OTP or email not sent')
        }
        
        const secretBase32 = process.env.otp_secret_key
        if (Date.now() > otpExpiry) {
            return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    null,
                    `OTP expired, request a new one`
                )
            )
        }

        // Check if OTP matches
        const isValid = speakeasy.totp.verify({
            secret: secretBase32,
            digits: 4,
            token: enteredOTP,
            step: 60,
            window: 5 // Change the window to 1 to allow 30 seconds before and after the current time
        });

        const user = await User.findOne({
            $or: [{ phone_number }],
        })
        if(!user){
            throw new ApiError(400, 'User not found');
        }

        if (isValid) {
            console.log("OTP is correct");
            const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
            const loggedInUser = await User.findById(user._id)
            const options = {
                httpOnly: true,
                secure: false,
                sameSite: 'none',
            }
            return res
                .status(200)
                .cookie('accessToken', accessToken, options)
                .cookie('refreshToken', refreshToken, options)
                .json(
                    new ApiResponse(
                        200,
                        { user: loggedInUser, accessToken, refreshToken },
                        'User logged in successfully'
                    )
        )
        }
        else {
            console.log("OTP is incorrect");
            throw new ApiError(400, 'Invalid OTP')
        }
    } catch (error) {
        throw new ApiError(500, 'OTP verification failed')
    } 
})

const resendOTP = asyncHandler(async (req, res) => {
    const { phone_number } = req.body;
    try {
        if (phone_number.trim().length == 0 ) {
            throw new ApiError(400, 'Email not sent')
        }
        const user = await User.findOne({
            $or: [{ phone_number }],
        })
        if(!user){
            throw new ApiError(400, 'User not found');
        }
        
        const secretBase32 = process.env.otp_secret_key;
        let otp = generateOTP(secretBase32);
        otpExpiry = Date.now() + (60000*5);
        
        sendWAMessage(exsistingUser.phone_number, otp);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    null,
                    `OTP sent to ${phone_number}`
                )
            )
    } catch (error) {
        throw new ApiError(500, 'Something went wrong in resendOTP')
    }
})

const generateNewPassword = asyncHandler(async (req, res) => {
    try {
        const { phone_number } = req.body;
        if (phone_number.trim().length == 0) {
            throw new ApiError(400, 'Phone Number required')
        }

        // check if already exist
        const exsistingUser = await User.findOne({
            $or: [{ phone_number }],
        })
        if(!exsistingUser){
            throw new ApiError(400, 'User not found');
        }

        // random string generator
        const newPassword = randomString(8);
        exsistingUser.password = newPassword;
        await exsistingUser.save({ validateBeforeSave: false })

        await sendWAMessage(exsistingUser.phone_number, otp);
    
        return res
            .status(200)
            .json(new ApiResponse(200, {}, 'Password change success'))
    } catch (error) {
        return new ApiError(500, 'Something went wrong in generatingNewPassword')
    }
})

const verifyAccessToken = asyncHandler(async (req, res) => {
    console.log("Access token verified");
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                `Access token is present`
            )
        )
})

const setDoctor = asyncHandler(async (req, res) => {
    try {
        const {phone_number} = req.body;
        if (phone_number.trim().length == 0 ) {
            throw new ApiError(400, 'Phone Number not sent')
        }   
        const user = await User.findOne({
            $or: [{ phone_number }],
        })
        if(!user){
            throw new ApiError(400, 'User not found');
        }
        user.isDoctor = true;
        await user.save({ validateBeforeSave: false })
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    null,
                    `User with phone number ${phone_number} set as doctor successfully`
                )
            )
    }
    catch (error) {
        throw new ApiError(500, 'Something went wrong in setDoctor')
    }
})

export {
    registerLoginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    deleteUserByPhone,
    verifyOTP,
    resendOTP,
    generateNewPassword,
    verifyAccessToken,
    setDoctor
}
