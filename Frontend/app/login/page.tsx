"use client";
import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import "./page.css";
import LoginCard from "@/my_components/loginCard/loginCard";
import DemoCard from "@/my_components/loginCard/demoCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BACKEND_URI } from "@/CONSTANTS";
import Cookies from "js-cookie";
import { tokenCookies } from "@/Helpers/cookieHandling";
import axios from "@/utils/axios";

function Page() {
  const Router = useRouter();
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    // Check if access token or refresh token exist
    const checkTokens = async () => {
      // Check for access token
      try {
        const accessTokenResponse = await axios.post(
          `${BACKEND_URI}/auth/verifyAccessToken`,
        );
        if (accessTokenResponse.status === 200) {
          // Access token exist, i.e. user is already logged in
          if (accessTokenResponse.data.data.isDoctor) {
            // if he is a doctor then his page will be the My Patients' page
            Router.push("/sections/myPatients");
          } else {
            // if he is a patient then his page will be the My Doctor' page
            Router.push("/sections/myDoctors");
          }
          return;
        }
      } catch (error) {
        console.log("Access token invalid, trying refresh token...");
      }

      // If access token has expired there is still a check for refresh token
      try {
        const refreshTokenResponse = await axios.post(
          `${BACKEND_URI}/auth/refreshAccessToken`,
          {
            refreshToken: Cookies.get("refreshToken") || "",
          },
        );
        if (refreshTokenResponse.status === 200) {
          // if refresh token was there, then we will recieve new access token and refresh token, so we save it on cookies
          tokenCookies(
            refreshTokenResponse.data.data.accessToken,
            refreshTokenResponse.data.data.refreshToken,
          );
          // based on doctor or patient status we send them to their required page
          if (refreshTokenResponse.data.data.isDoctor) {
            Router.push("/sections/myPatients");
          } else {
            Router.push("/sections/myDoctors");
          }
          return;
        }
      } catch (error) {
        console.log("Refresh token invalid.");
      }
    };
    checkTokens();
  }, [Router]);

  return (
    <>
      {/* TOAST NOTIFICATION COMPONENT */}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* MAIN CONTENT */}
      <div>
        {/* BACKGROUND GRADIENT ANIMATION */}
        <div className="absolute left-0 top-0 z-0 h-screen w-full">
          {theme === "dark" ? (
            <BackgroundGradientAnimation
              gradientBackgroundStart="rgb(26, 255, 213)"
              gradientBackgroundEnd="rgb(11, 47, 159)"
              firstColor="65, 179, 162"
              secondColor="11, 47, 159"
              thirdColor="118, 149, 255"
              fourthColor="65, 179, 162"
              fifthColor="11, 47, 159"
              pointerColor="118, 149, 255"
            />
          ) : (
            <BackgroundGradientAnimation
              gradientBackgroundStart="rgb(26, 255, 213)"
              gradientBackgroundEnd="rgb(125, 131, 255)"
              firstColor="26, 255, 213" // green
              secondColor="125, 131, 255" // purple
              thirdColor="255,255,255" // white
              fourthColor="26, 255, 213"
              fifthColor="125, 131, 255"
              pointerColor="255,255,255"
            />
          )}
        </div>
        {/* Stuff of top */}
        <div className="z-1 absolute left-0 top-0 flex h-screen w-full items-center justify-center">
          <div className="loginGlass relative z-0 flex h-5/6 w-10/12 items-center justify-between rounded-[20px] bg-color2 px-[5rem] shadow-ourBoxShadow">
            {/* The left dynamic part of the login page */}
            <LoginCard />
            {/* The fixed text on the login page*/}
            <DemoCard />
            {/* The right most image */}
            <img
              src="./icons/HeartImg.svg"
              alt="heartImage"
              className="hide-on-small m-[-1rem] w-[25%] min-w-40"
            />{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
