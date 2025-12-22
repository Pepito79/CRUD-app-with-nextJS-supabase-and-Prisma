import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { LockKeyhole, UserPlus, LogIn, ArrowLeft } from "lucide-react";
import Link from "next/link";

const UnauthorizedPage = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <Card className="max-w-md w-full border-none shadow-2xl bg-white/80 backdrop-blur-md mt-20">
                <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-amber-100 rounded-full text-amber-600 animate-pulse">
                            <LockKeyhole size={40} />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-serif tracking-tight text-slate-900">
                        Accès Restreint
                    </CardTitle>
                    <CardDescription className="text-slate-500 italic mt-2">
                        Oups ! Vous devez être connecté pour explorer cette page.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                    <div className="group relative flex items-start space-x-4 rounded-xl border border-slate-200 p-4 transition-all hover:bg-slate-50 hover:border-slate-300">
                        <div className="mt-1 text-blue-600">
                            <LogIn size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900">Déjà membre ?</h3>
                            <p className="text-sm text-slate-500">Reprenez là où vous vous étiez arrêté.</p>
                        </div>
                        <Button asChild variant="ghost" size="sm" className="self-center font-bold text-blue-600 hover:text-blue-700">
                            <Link href="/login">Se connecter</Link>
                        </Button>
                    </div>

                    <div className="group relative flex items-start space-x-4 rounded-xl border border-slate-200 p-4 transition-all hover:bg-slate-50 hover:border-slate-300">
                        <div className="mt-1 text-emerald-600">
                            <UserPlus size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900">Nouveau ici ?</h3>
                            <p className="text-sm text-slate-500">Créez un compte en moins de 2 minutes.</p>
                        </div>
                        <Button asChild variant="ghost" size="sm" className="self-center font-bold text-emerald-600 hover:text-emerald-700">
                            <Link href="/signup">S'inscrire</Link>
                        </Button>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 pt-2">
                    <div className="w-full border-t border-slate-100" />
                    <Button asChild variant="link" className="text-slate-400 hover:text-slate-600">
                        <Link href="/" className="flex items-center gap-2 text-xs">
                            <ArrowLeft size={14} /> Retour à l'accueil
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default UnauthorizedPage;