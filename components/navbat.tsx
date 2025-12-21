
"use client"
import { Button } from "@/components/ui/button";
import { Blocks } from "lucide-react";
import Link from "next/link";

interface NavLink {
    name: string;
    href: string;
}

interface NavbarProps {
    domainName?: string;
    logo?: React.ReactNode;
    navLinks?: NavLink[];
    authLinks?: {
        login: { text: string; href: string };
        register: { text: string; href: string };
    };
    className?: string;
}

const Navbar1 = ({
    domainName = "TheBuilder",
    logo = <Blocks size={30} />,
    navLinks = [
        { name: "Home", href: "#" },
        { name: "About Us", href: "#" },
        { name: "Contact Us", href: "#" },
    ],
    authLinks = {
        login: { text: "Login", href: "/login" },
        register: { text: "Sign-Up", href: "/signup" },
    },
    className = "",
}: NavbarProps) => {
    return (
        <nav className={`py-4 px-6 flex items-center justify-between bg-blue-50 ${className}`}>
            {/* Logo + Domain name */}
            <div className="flex justify-center items-center gap-2">
                {logo}

                <h1 className="text-2xl font-bold">{domainName}</h1>
            </div>

            {/* Navigation Links */}
            <div className="flex opacity-85 items-center text-sm text-muted-foreground space-x-8">
                <div className="hidden md:flex space-x-6 ">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-600 font-bold hover:text-gray-900  transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Auth Links */}
            <div className="flex items-center space-x-4">
                <Button className="h-10 bg-gray-900 text-white rounded-lg" asChild>
                    <Link href={authLinks.login.href}>{authLinks.login.text}</Link>
                </Button>

                <Button className="h-10 bg-blue-400 text-white rounded-lg" asChild>
                    <Link href={authLinks.register.href}>{authLinks.register.text}</Link>
                </Button>
            </div>
        </nav>
    );
};

export default Navbar1;
