import axios from "axios";
import { BACKEND_URI, minPassLength, otpLength, RENDER_BACKEND_URI } from "@/CONSTANTS";
import { ToastErrors, ToastInfo } from "./toastError";
import Cookies from "js-cookie";

const validateEmail = (value: string): boolean => 
  /^\+?(\d{1,3})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/.test(value);


function passIsValid(password: string): boolean {
    return password.length >= minPassLength || password.length === 0;
}

const handleLogin = async(isInvalid: boolean, password: string, email: string, setOtpPage: Function) => { 
    if(!isInvalid && (password.length >= minPassLength)) {
        try {
            const user = {
                email: email.trim(),
                password: password,
            };
            const loginRes = await axios.post(`${RENDER_BACKEND_URI}/users/registerLogin`, user); 
            Cookies.set("avatarNumber", loginRes.data.data.user.avatarNumber, { expires: 60 * 60 * 24 * 30 });
            setOtpPage(true);
          } catch (error: any) {
            ToastErrors("Invalid Login Credentials!");
          }
    }else {
        if (isInvalid && !(password.length >= minPassLength)) {
          ToastErrors("Email and Password invalid!");
        } else if (isInvalid) {
          ToastErrors("Email invalid!");
        } else {
          ToastErrors("Password invalid!");
        }
    }
};

const handleReset = async (otpGap: number, time: number, setTime: Function, setOTP: Function) => {
  if (time > 0) {
    return;
  }
  try {
    const body = {
      email: Cookies.get("email") || "",
    };
    await axios.post(
      `${RENDER_BACKEND_URI}/users/resendOTP`,  
      body
    );
    ToastInfo("Email sent containing new otp!");
  } catch (error) {
    ToastErrors("OTP resend issue");
  }
  setTime(otpGap);
  setOTP("");
};

const handleForgotPass = (setForgotPass: Function, setOtpPage: Function, setPassword: Function) => {
  setForgotPass(true);
  setOtpPage(false);
  setPassword("");
}

const handleGenerateNewPassword = async (email: string, setForgotPass: Function, setOTP: Function) => {
  try {
    const body = {
      "email": email
    }
    await axios.post(`${RENDER_BACKEND_URI}/users/generateNewPassword`, body);
    ToastInfo("New password generated");
    setForgotPass(false);
    setOTP(false);
  } catch (error) {
    ToastInfo("Email not registered, Sign Up first");
  }
}

export { 
    validateEmail, 
    passIsValid, 
    handleLogin,
    handleReset,
    handleForgotPass,
    handleGenerateNewPassword
};