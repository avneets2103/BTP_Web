import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_URI, sidebarMenu } from "@/CONSTANTS";
import { sidebarMenuItems } from "@/Interfaces";
import { setCurrentPage } from "@/RTK/features/sidebar";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { logout } from "@/Helpers/logout";
import axios from "@/utils/axios";

interface listItem {
  emoji: string;
  key: string;
  name: string;
  budget: string;
}

const Sidebar: React.FC = () => {
  const Router = useRouter();
  const dispatcher = useDispatch();
  useEffect(() => {
    const checkTokens = async () => {
      try {
        // Verify access token
        const accessTokenResponse = await axios.post(
          `${BACKEND_URI}/auth/verifyAccessToken`,
        );
        if (accessTokenResponse.status !== 200) {
          Router.push("/login");
          logout() 
          return;
        }
      } catch (error) {
        Router.push("/login");
        logout()
        console.log("Access token invalid, trying refresh token...");
      }
    };

    checkTokens();
  }, [Router]);
  const [isDoctor, setIsDoctor] = useState(
    Cookies.get("isDoctor") === "true" || false,
  );
  const currentPage = useSelector((state: any) => state.sidebar.currentPage);
  const { theme, setTheme } = useTheme();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex h-screen w-[6rem] min-w-[6rem] items-center justify-center">
      <div className="flex h-full w-[3rem] flex-col justify-between gap-[2rem] py-[1rem]">
        <div className="flex flex-col items-center justify-center gap-[0.7rem]">
          <div>
            <img
              src="../icons/logo.png"
              alt="logo"
              className="w-full p-[5px]"
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-[0.8rem] rounded-[25px] bg-color1 py-[1rem] drop-shadow-md">
            <img
              src={
                theme === "dark"
                  ? "../icons/darkMode.png"
                  : "../icons/lightMode.png"
              }
              alt="Theme"
              className="w-[40%]"
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-[25px] bg-color1 py-[0.2rem] drop-shadow-md">
            {sidebarMenu.map((item: sidebarMenuItems, index: number) => {
              if (item.patient == !isDoctor) {
                if (item.path === currentPage) {
                  return (
                    <div
                      key={index}
                      className="flex h-[2.8rem] w-[2.8rem] flex-col items-center justify-center rounded-[50%] border-[1px] border-textColorDark bg-secondaryColor"
                    >
                      <img
                        src={item.iconS}
                        alt={item.name}
                        className="w-[40%]"
                      />
                    </div>
                  );
                }
                return (
                  <div
                    key={index}
                    className="flex h-[2.8rem] w-[2.8rem] flex-col items-center justify-center rounded-[50%] bg-color1"
                    onClick={() => {
                      dispatcher(setCurrentPage({ currentPage: item.path }));
                      console.log(item.path);
                      Router.push(`/sections/${item.path}`);
                    }}
                  >
                    <img
                      src={theme==="dark"?item.iconNSD:item.iconNS}
                      alt={item.name}
                      className="w-[40%]"
                    />
                  </div>
                );
              }
              return <></>;
            })}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center rounded-[25px] bg-color1 py-[0.2rem] drop-shadow-md">
          <div
            className="flex h-[2.8rem] w-[2.8rem] flex-col items-center justify-center rounded-[50%] bg-color1"
            onClick={onOpen}
          >
            <img
              src={"../icons/setting.NS.png"}
              alt={"settings"}
              className="w-[40%]"
            />
          </div>
          <div className="flex h-[2.8rem] w-[2.8rem] flex-col items-center justify-center rounded-[50%] bg-color1">
            {/* TODO: Image of user */}
            <img
              src={`../icons/avatar${Number(Cookies.get("avatarNumber")) || 1}.png`}
              alt={"avatar"}
              className="w-[95%]"
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Settings
              </ModalHeader>
              <ModalBody>
                
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-purple-200 text-black"
                  variant="flat"
                  onPress={async () => {
                    logout();
                    onClose();
                    Router.push("/login");
                  }}
                >
                  Logout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Sidebar;
