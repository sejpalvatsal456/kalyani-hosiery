import { NextRequest } from "next/server"
import { getCookie } from "./lib/cookies";

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if(pathname === '/' || pathname.includes('/subcategories') || pathname.includes('/product')) {
        const user_token = await getCookie("user_token");
        console.log("Token: " + user_token);
    }

}