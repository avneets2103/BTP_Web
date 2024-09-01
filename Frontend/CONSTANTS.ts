import { sidebarMenuItems } from "./Interfaces";

const minPassLength = 6;
const BACKEND_URI="http://localhost:4000/api/v1" 
const RENDER_BACKEND_URI= "https://smartkart-server.onrender.com/api/v1";
const WAITLIST_URI="https://smartkart-waitlist-server.vercel.app/api/v1";
// const WAITLIST_URI = "http://localhost:4001/api/v1";
const otpLength = 4;
const otpGap = 60;
const accessTokenExpiration = 60 * 60 * 24 * 100; // 7 days
const refreshTokenExpiration = 60 * 60 * 24 * 200; // 30 days

const sidebarMenu:Array<sidebarMenuItems>= [
    {
        name: "My Doctors",
        path: "myCart",
        iconS: "../icons/doc.s.png",
        iconNS: "../icons/doc.ns.png",
    },
    {
        name: "My Reports",
        path: "history",
        iconS: "../icons/rep.s.png",
        iconNS: "../icons/rep.ns.png",
    },
    {
        name: "Health Vitals",
        path: "expenses",
        iconS: "../icons/vitals.s.png",
        iconNS: "../icons/vitals.ns.png",
    },
    {
        name: "24x7 Support",
        path: "wishlist",
        iconS: "../icons/sup.s.png",
        iconNS: "../icons/sup.ns.png",
    },
    {
        name: "My Patients",
        path: "priceTracker",
        iconS: "../icons/doc.s.png",
        iconNS: "../icons/doc.ns.png",
    },
]

export { 
    BACKEND_URI,
    RENDER_BACKEND_URI,
    WAITLIST_URI,
    minPassLength,
    otpLength,
    otpGap,
    sidebarMenu,
    accessTokenExpiration,
    refreshTokenExpiration
};