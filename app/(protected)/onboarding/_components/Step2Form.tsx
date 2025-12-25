"use client"
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Card,
    CardContent,
    CardDescription,
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
import onBoardingAction1 from "@/app/actions/onboarding/onboarding1";
import { Checkbox } from "@radix-ui/react-checkbox";
import { step2Schema, TStep2Form } from "@/lib/schemas/OnBoarding/step2Schema";
import onBoardingAction2 from "@/app/actions/onboarding/onboarding2";
import { CompanySituation } from "@/lib/generated/prisma/enums";



type TStep1Form = z.infer<typeof step1Schema>

const SignUpHeader = () => {
    return (
        <CardHeader className="space-y-1 mt-10">
            <CardTitle className="text-center text-4xl tracking-tighter font-serif ">Quelle est votre situation professionnelle actuelle ?</CardTitle>
            <CardDescription className="text-center italic text-gray-700 -tracking-wide ">
            </CardDescription>
        </CardHeader>
    );
};



const Step2Form = () => {

    const router = useRouter()
    const INFO = [
        { text: "Mon entreprise est en cours de création et j'attends mon SIRET", id: CompanySituation.PENDING_SIRET },
        { text: "Mon entreprise existe depuis moins de 3 mois", id: CompanySituation.LESS_THAN_3_MONTHS },
        { text: "Mon entreprise existe depuis 3 mois à 1 an", id: CompanySituation.FROM_3_MONTHS_TO_1_YEAR },
        { text: "Mon entreprise existe depuis plus d’un an", id: CompanySituation.MORE_THAN_1_YEAR },
        { text: "Je n'ai pas d'entreprise", id: CompanySituation.NO_BUSINESS }
    ]
    const {
        setValue,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TStep2Form>({
        resolver: zodResolver(step2Schema)
    })

    const selectedValue = watch("situationStatus");

    const onSubmit = async (formData: TStep2Form) => {
        try {
            const result = await onBoardingAction2(formData);

            if (result.success) {
                toast.success("Informations enregistrées !");
                router.push("/onboarding/step3");
            }
        } catch (error) {
            toast.error("Erreur lors de la sauvegarde");
            console.error(error);
        }
    };

    const currentStep = 2;
    const totalSteps = 4;
    const progressValue = (currentStep / totalSteps) * 100;
    return (
        <div
            className="flex items-center justify-center  min-h-screen py-3"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="w-120  p-3 border-none shadow-2xl bg-white/80 backdrop-blur-md">
                    <div className="px-4 pt-4 space-y-2">
                        <div
                            className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                            <span>Étape {currentStep} sur {totalSteps}</span>
                            <span>{progressValue}%</span>
                        </div>
                        <Progress value={progressValue} className="h-1.5" />
                    </div>
                    <SignUpHeader />
                    <CardContent className="space-y-4 mt-4 ">
                        <div className="space-y-2 pt-3 ">
                            {INFO.map((elem) => {
                                const isSelected = selectedValue === elem.id;
                                return (
                                    <div
                                        key={elem.id}
                                        onClick={() =>
                                            setValue("situationStatus", elem.id, {
                                                shouldValidate: true,
                                                shouldDirty: true,
                                            })
                                        }
                                        className={`flex items-center justify-between rounded-xl border-2 p-4 mb-4 cursor-pointer transition-all
                                            ${isSelected ? "border-black bg-slate-100" : "border-slate-200 hover:bg-slate-50"}`} >
                                        <span className="flex-1 text-sm tracking-wide pr-4">
                                            {elem.text}
                                        </span>

                                        <div
                                            className={` w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                                                ${isSelected ? "border-black" : "border-slate-300"}`}>
                                            {isSelected && (
                                                <div className="w-2.5 h-2.5 rounded-full bg-black" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

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