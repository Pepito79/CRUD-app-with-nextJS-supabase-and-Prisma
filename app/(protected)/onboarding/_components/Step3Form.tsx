"use client"
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"
import { Loader2, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { step1Schema } from "@/lib/schemas/OnBoarding/step1Schema";
import { step2Schema, TStep2Form } from "@/lib/schemas/OnBoarding/step2Schema";
import onBoardingAction2 from "@/app/actions/onboarding/onboarding2";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { step3Schema, TStep3Form } from "@/lib/schemas/OnBoarding/step3Schema";
import { NumWokers } from "@/lib/generated/prisma/enums";
import onBoardingAction3 from "@/app/actions/onboarding/onBoarding3";





const SignUpHeader = () => {
    return (
        <CardHeader className="space-y-1 mt-10">
            <CardTitle className="text-center text-4xl tracking-tighter font-serif ">
                Parlez nous de vous et de votre entreprise
            </CardTitle>
        </CardHeader>
    );
};


const Loading = () => {

    const currentStep = 4;
    const totalSteps = 4;
    const progressValue = (currentStep / totalSteps) * 100;

    return <div className="px-4 pt-4 space-y-2">
        <div
            className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
            <span>Étape {currentStep} sur {totalSteps}</span>
            <span>{progressValue}%</span>
        </div>
        <Progress value={progressValue} className="h-1.5" />
    </div>

}



const Step2Form = () => {

    // Définition du router 
    const router = useRouter()

    // Fonction pour autoc-completion de la ville
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleCitySearch = async (query: string) => {

        if (query.length < 3) {
            setSuggestions([]);
            return;
        }
        setIsLoading(true);
        try {
            // API Géo : Recherche par nom de commune
            const response = await fetch(
                `https://geo.api.gouv.fr/communes?nom=${query}&fields=nom,codesPostaux&limit=8`
            );
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error("Erreur API Géo", error);
        } finally {
            setIsLoading(false);
        }
    };

    //Utilisation de react hook form pour gerer la data 
    const { register, setValue, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<TStep3Form>({
        resolver: zodResolver(step3Schema)
    })

    //Handle du submit 
    const onSubmit = async (formData: TStep3Form) => {
        const result = await onBoardingAction3(formData)
        if (!result.success) {
            toast.error(result.message)
        } else {
            toast.success(result.message)
            router.push("/dashboard")
        }
    };


    return (
        <div
            className="flex items-center justify-center  min-h-screen py-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="w-120  p-3 border-none shadow-2xl bg-white/80 backdrop-blur-md">
                    <Loading />
                    <SignUpHeader />
                    <CardContent className="space-y-2 mt-4 ">
                        {/* Selection des nombres d'employés */}
                        <div className=" pt-3 ">
                            <div className="font-bold italic text-md  font-sans ">
                                Nombre d'employés
                                <span className="text-red-500 ">*</span>
                            </div>
                            <select
                                {...register("num_workers")}
                                className="w-full p-3 rounded-md border-2 border-slate-200 bg-white  transition-all ">
                                <option value={NumWokers.ALONE}>Je travaille seul </option>
                                <option value={NumWokers.ONE}>1 employé</option>
                                <option value={NumWokers.TWO_TO_TEN}>2 à 10 employés </option>
                                <option value={NumWokers.MORE_THAN_TEN}>Plus de 10 employés</option>
                            </select>
                            {errors.num_workers &&
                                <p className="text-sm text-red-500"> {`${errors.num_workers.message}`}</p>}
                        </div>

                        {/* Selection de la ville */}
                        <div className=" relative">
                            <div className="relative">
                                <Label className="font-bold italic text-md font-sans">
                                    Ville <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    {...register("city", {
                                        onChange: (e) => handleCitySearch(e.target.value),
                                    })}
                                    id="city"
                                    placeholder="Tapez le nom d'une ville (ex: Paris)"
                                    className="bg-white text-black h-10 border border-slate-200 focus:border-black transition-all"
                                    autoComplete="off"
                                />
                                {errors.city &&
                                    <p className="text-sm text-red-500"> {`${errors.city.message}`}</p>}
                                {suggestions.length > 0 && (
                                    <ul className="absolute z-50 w-full bg-white border border-slate-200 mt-1 rounded-xl shadow-xl">
                                        {suggestions.map((city) => (
                                            <li
                                                key={`${city.nom}-${city.codesPostaux[0]}`}
                                                onClick={() => {
                                                    setValue("city", city.nom, { shouldValidate: true });
                                                    setSuggestions([]);
                                                }}
                                                className="p-2 hover:bg-slate-100 cursor-pointer text-sm flex justify-between items-center "
                                            >
                                                <span className="font-semibold text-slate-800">{city.nom}</span>
                                                <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">
                                                    {city.codesPostaux[0]}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Input pour le nombre de SIRET */}
                            <div className="">
                                <div className="flex flex-row mb-5">

                                </div>
                                <Label className="font-bold italic text-md  font-sans ">
                                    Numéro de SIRET
                                    <span className="text-red-500 ">*</span>
                                </Label>
                                <Input
                                    {...register("siret")}
                                    id="siret"
                                    placeholder="Numéro de SIRET (14 chiffres)"
                                    className="bg-white text-black h-10 border-2 border-amber-50"
                                />
                                {errors.siret &&
                                    <p className="text-sm text-red-500"> {`${errors.siret.message}`}</p>}

                            </div>
                        </div>



                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 mt-6">
                        <Button className="w-full h-10 mb-4 rounded-xl border-2 border-black bg-black text-white transition-all duration-200 hover:bg-background hover:text-black hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting} variant="outline" type="submit">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Preparation de l'étape suivante
                                </>
                            ) : (
                                "Continuer"
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div >
    );
};



export default Step2Form 