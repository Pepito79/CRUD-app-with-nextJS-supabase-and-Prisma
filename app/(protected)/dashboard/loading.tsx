import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
    return (
        <div className="w-full">
            {/* Simulation de la Navbar */}
            <nav className="fixed top-0 left-0 right-0 flex justify-center pt-6 z-50">
                <div className="flex items-center justify-between h-14 w-full max-w-5xl px-6 bg-white/40 backdrop-blur-md border border-gray-100 shadow-sm rounded-full">

                    {/* Logo Skeleton */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="size-8 rounded-full bg-gray-200" />
                        <Skeleton className="h-5 w-24 bg-gray-200 rounded-md" />
                    </div>

                    {/* Links Skeleton */}
                    <div className="hidden md:flex items-center gap-8">
                        <Skeleton className="h-4 w-20 bg-gray-200 rounded-md" />
                        <Skeleton className="h-4 w-16 bg-gray-200 rounded-md" />
                    </div>

                    {/* Profile Skeleton */}
                    <div className="flex items-center gap-3">
                        <Skeleton className="size-9 rounded-full bg-gray-200" />
                    </div>
                </div>
            </nav>

            {/* Contenu de la page (Optionnel) */}
            <div className="max-w-5xl mx-auto mt-32 px-6 space-y-4">
                <Skeleton className="h-10 w-1/3 bg-gray-100" />
                <Skeleton className="h-4 w-full bg-gray-100" />
                <Skeleton className="h-4 w-2/3 bg-gray-100" />
            </div>
        </div>
    );
}