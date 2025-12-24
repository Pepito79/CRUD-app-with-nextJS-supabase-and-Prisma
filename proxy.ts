import { NextRequest, NextResponse } from "next/server";
import { User } from "./lib/auth";

export default async function proxy(request: NextRequest) {

    const { pathname } = request.nextUrl;

    //Session de l'user
    const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
        headers: { cookie: request.headers.get("cookie") || "" }
    })


    const session = await response.json()
    const user: User = session?.user

    //Cas 1: user non connecté , on envoi vers login/singup
    if (!user && pathname === "/dashboard") {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (user && !user.hasOnBoarded && pathname !== "/onboarding") {
        return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    if (!user)
        return NextResponse.next()
}

