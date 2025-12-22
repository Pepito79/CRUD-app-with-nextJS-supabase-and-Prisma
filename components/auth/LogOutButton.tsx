"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                    router.refresh();
                },
            },
        });
    };

    return (
        <DropdownMenuItem
            onSelect={handleLogout} // Utilise onSelect pour les Dropdown Shadcn
            className="flex items-center gap-3 p-2.5 cursor-pointer rounded-xl focus:bg-red-50 text-red-600 transition-colors"
        >
            <div className="size-8 rounded-lg bg-red-50 flex items-center justify-center">
                <LogOut size={16} />
            </div>
            <span className="font-bold text-sm">Déconnexion</span>
        </DropdownMenuItem>
    );
}