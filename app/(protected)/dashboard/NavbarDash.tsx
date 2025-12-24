
import { LogoutButton } from "@/components/auth/LogOutButton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "@/lib/get-sessions";
import {
    Settings,
    LogOut,
    User,
    LayoutDashboard,
    Trophy,
    Bell,
    CreditCard
} from "lucide-react";
import Link from "next/link";

export default async function NavbarDash() {

    //Obtenir la data de l'user connecté
    const session = await getServerSession()
    const user = session?.user
    if (!user) return null;

    const userData = {
        name: user.name,
        email: user.email,
        initials: `${user.firstName[0]}${user.lastName[0]}`
    }
    return (
        <nav className="fixed top-0 left-0 right-0 flex justify-center pt-6 z-50">
            <div className="flex items-center justify-between h-14 w-full max-w-5xl px-6 bg-white/80 backdrop-blur-md border border-gray-100 shadow-xl rounded-full">

                <div className="flex items-center gap-2 cursor-pointer group">
                    <div className="size-8 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <span className="text-white font-bold text-xs font-mono">M</span>
                    </div>
                    <span className="font-bold tracking-tighter text-lg bg-linear-to-r from-black to-gray-500 bg-clip-text text-transparent">
                        Matchup
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <Link
                        href="/welcome"
                        className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-gray-100 text-sm transition-all duration-200 text-gray-600 hover:text-black font-bold font-mono"
                    >
                        <LayoutDashboard size={16} />
                        Dashboard
                    </Link>
                    <Link
                        href="/welcome"
                        className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-gray-100 text-sm transition-all duration-200 text-gray-600 hover:text-black font-bold font-mono"
                    >
                        <Trophy size={16} />
                        Matchs
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-400 hover:text-black transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    <div className="h-6 w-px bg-gray-200 mx-1"></div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="size-9 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 border-2 border-white shadow-md cursor-pointer overflow-hidden hover:scale-105 transition-all flex items-center justify-center text-white font-bold text-[10px] ring-1 ring-gray-100">
                                {userData.initials}
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-64 mt-3 rounded-2xl p-2 shadow-2xl border-gray-100" align="end">
                            <DropdownMenuLabel className="p-3">
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-sm font-bold text-gray-900">{userData.name}</p>
                                    <p className="text-xs text-gray-400 font-medium">{userData.email}</p>
                                </div>
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator className="bg-gray-50" />

                            <div className="p-1">
                                <DropdownMenuItem className="flex items-center gap-3 p-2.5 cursor-pointer rounded-xl focus:bg-gray-50 transition-colors">
                                    <div className="size-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <User size={16} />
                                    </div>
                                    <span className="font-semibold text-sm">Mon Profil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-3 p-2.5 cursor-pointer rounded-xl focus:bg-gray-50 transition-colors">
                                    <div className="size-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600">
                                        <Settings size={16} />
                                    </div>
                                    <span className="font-semibold text-sm">Paramètres</span>
                                </DropdownMenuItem>
                            </div>

                            <DropdownMenuSeparator className="bg-gray-50" />
                            <div className="p-1">
                                <LogoutButton />
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>
        </nav>
    );
}