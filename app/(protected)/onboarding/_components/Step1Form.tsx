"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "@/lib/schemas/signupSchema";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Loader2, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { step1Schema } from "@/lib/schemas/OnBoarding/step1Schema";
import onBoardingAction1 from "@/app/actions/onboarding/onboarding1";
import { Progress } from "@radix-ui/react-progress";



type TStep1Form = z.infer<typeof step1Schema>

const SignUpHeader = () => {
    return (
        <CardHeader className="space-y-1 mt-10">
            <CardTitle className="text-center text-4xl tracking-tighter font-serif ">Create Account</CardTitle>
            <CardDescription className="text-center italic text-gray-700 -tracking-wide ">
                Saisissez le nom du propriétaire de l'entreprise exactement tel qu'il apparaît dans vos documents juridiques.
            </CardDescription>
        </CardHeader>
    );
};


const SignUpFooter = () => {
    return (
        <div className="text-center text-sm text-amber-950 tracking-tighter ">
            Already have an account?
            <Button variant={"link"} className="px-1 ml-1">
                <a href="/login" className="text-red-600">Log in</a>
            </Button>
        </div>
    );
};



const Step1Form = () => {

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TStep1Form>({
        resolver: zodResolver(step1Schema)
    })


    const onSubmit = async (formData: TStep1Form) => {
        try {
            // Appel de la Server Action
            const result = await onBoardingAction1(formData);

            if (result.success) {
                toast.success("Informations enregistrées !");
                router.push("/onboarding/step2");
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
            className="flex items-center justify-center min-h-screen py-3"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="w-120  p-3 border-none shadow-2xl bg-white/80 backdrop-blur-md">
                    <div className="px-4 pt-4 space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                            <span>Étape {currentStep} sur {totalSteps}</span>
                            <span>{progressValue}%</span>
                        </div>
                        <Progress value={progressValue} className="h-1.5" />
                    </div>
                    <SignUpHeader />
                    <CardContent className="space-y-4 mt-4">
                        <div className="space-y-2 pt-3">
                            <div className="flex flex-row  gap-x-5  mb-5">

                            </div>
                            <Label className="font-bold " htmlFor="email">
                                Prénom
                                <span className="text-red-500 ">*</span>
                            </Label>
                            <Input
                                {...register("firstName")}
                                id="nom"
                                placeholder="Prénom"
                                className="bg-white text-black h-10 border-2 border-amber-50"
                            />
                            {errors.firstName &&
                                <p className="text-sm text-red-500"> {`${errors.firstName.message}`}</p>}
                        </div>
                        <div className="space-y-2 pt-3">
                            <Label className="font-bold" htmlFor="password">
                                Nom<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                {...register("lastName")}
                                placeholder="Nom"
                                className="bg-white text-black h-10 border-2 border-amber-50"
                            />
                            {errors.lastName &&
                                <p className="text-sm text-red-500"> {`${errors.lastName.message}`}</p>}
                        </div>
                        <div className="space-y-2 pt-3">
                            <Label className="font-bold" htmlFor="password">
                                Métier<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                {...register("job")}
                                placeholder="Métier"
                                className="bg-white text-black h-10 border-2 border-amber-50"
                            />
                            {errors.job &&
                                <p className="text-sm text-red-500"> {`${errors.job.message}`}</p>}
                        </div>
                        <div className="space-y-2 pt-3">
                            <Label className="font-bold" >
                                Numéro de téléphone<span className="text-red-500 ">*</span>
                            </Label>
                            <Input
                                {...register("phoneNumber")}
                                placeholder="+33 XXXX"
                                className="bg-white text-black h-10 border-2 border-amber-50"
                            />
                            {errors.phoneNumber &&
                                <p className="text-sm text-red-500"> {`${errors.phoneNumber.message}`}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 mt-6">
                        <Button className="w-full h-10 mb-5 rounded-xl border-2 border-black bg-black text-white transition-all duration-200 hover:bg-background hover:text-black hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
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



export default Step1Form 