import { NextRequest, NextResponse } from "next/server";
import { User } from "./lib/auth";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname === "/" || // On autorise la landing page pour TOUT LE MONDE
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') ||
        pathname === "/signup" ||
        pathname === "/login"
    ) {
        return NextResponse.next();
    }
    try {
        // 2. Vérification session
        const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
            headers: { cookie: request.headers.get("cookie") || "" }
        });

        const session = await response.json();
        const user: User = session?.user;


        if (!user) {
            // S'il n'est pas sur login/signup, on le renvoie au login
            return NextResponse.redirect(new URL("/login", request.url));
        }
        // Si utilisateur connecté mais ONBOARDING non fait
        if (user && !user.hasOnBoarded) {
            if (!pathname.startsWith("/onboarding")) {
                return NextResponse.redirect(new URL("/onboarding/step1", request.url));
            }
        }

        // Si utilisateur connecté et ONBOARDING fait : on interdit /onboarding
        if (user.hasOnBoarded && pathname.startsWith("/onboarding")) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        if (user && !user.hasOnBoarded && user.job) {
            if (pathname === "/onboarding/step1") {
                return NextResponse.redirect(new URL("/onboarding/step2", request.url));

            }
        }


    } catch (e) {
        console.error(e)
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    // On n'exécute le middleware QUE sur les routes de l'application
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};