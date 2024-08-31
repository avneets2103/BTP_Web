export const DBName = "smartkart"

export const messageBodyGen = (otp) => {
    return `Your OTP is ${otp}. Please enter it to verify your account.`;
}