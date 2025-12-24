'use server'

import { getServerSession } from "@/lib/get-sessions";
import NavbarDash from "./NavbarDash";
import { unauthorized } from "next/navigation";

export default async function Dashboard() {
    return (
        <div>
            <NavbarDash />
        </div>
    );
}

