'use server'

import { getServerSession } from "@/lib/get-sessions";
import NavbarDash from "./NavbarDash";
import { unauthorized } from "next/navigation";

export default async function Dashboard() {

    //Verifier si la session est valide
    const session = await getServerSession()
    const user = session?.user

    if (!user) {
        unauthorized()
    }

    return (
        <div>
            <NavbarDash />
        </div>
    );
}

