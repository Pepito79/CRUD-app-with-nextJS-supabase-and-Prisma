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

import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { authClient } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";



type SignUpFormData = z.infer<typeof signUpSchema>

const SignUpHeader = () => {

    const LogoPlaceholder = () => {
        return (
            <div className="flex justify-center mb-4 mt-10  ">
                <span className="font-bold bg-black size-12  rounded-lg text-white flex justify-center items-center">
                    <UserPlus />
                </span>
            </div>
        );
    };

    return (
        <CardHeader className="space-y-1">
            <LogoPlaceholder />
            <CardTitle className="text-center text-4xl tracking-tighter font-serif ">Create Account</CardTitle>
            <CardDescription className="text-center italic text-gray-700 -tracking-wide ">
                Enter your details to register
            </CardDescription>
        </CardHeader>
    );
};


const SignUpFooter = () => {
    return (
        <div className="text-center text-sm text-amber-950 tracking-tighter">
            Already have an account?
            <Button variant={"link"} className="px-1 ml-1">
                <a href="/login" className="text-red-600">Log in</a>
            </Button>
        </div>
    );
};

const SignUp = () => {

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset } = useForm<SignUpFormData>({
            resolver: zodResolver(signUpSchema)
        })


    const onSubmit = async (formData: SignUpFormData) => {
        const { data: response, error } = await authClient.signUp.email({
            email: formData.email,
            password: formData.password,
            name: `${formData.firstName} ${formData.lastName}`,
            firstName: formData.firstName,
            lastName: formData.lastName,
            callbackURL: "/dashboard"


        })
        if (error) {
            // Better-Auth renvoie des erreurs claires (ex: "User already exists")
            toast.error(error.message || "Une erreur est survenue");
        } else {
            toast.success("Compte créé avec succès !");
            // Pas besoin de redirect() de next/navigation ici car c'est du côté client
            router.push("/dashboard");
        }
    }
    return (
        <div
            className="flex items-center justify-center min-h-screen py-3"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="w-120  p-3 border-none shadow-2xl bg-white/80 backdrop-blur-md">
                    <SignUpHeader />
                    <CardContent className="space-y-4 mt-4">
                        <div className="space-y-2 pt-3">
                            <div className="flex flex-row  gap-x-5  mb-5">
                                <div>
                                    <Label className="font-bold mb-2">
                                        First Name
                                    </Label>
                                    <Input
                                        {...register("firstName")}
                                        id="firstName"
                                        placeholder="Enter your first name"
                                        type="text"
                                        className="bg-white text-black h-10 border-2 border-amber-50"
                                    />
                                    {errors.firstName &&
                                        <p className="text-sm text-red-500"> {`${errors.firstName.message}`}</p>}
                                </div>
                                <div>
                                    <Label className="font-bold mb-2">
                                        Last Name
                                    </Label>
                                    <Input
                                        {...register("lastName")}
                                        id="lastName"
                                        placeholder="Enter your last name "
                                        type="text"
                                        className="bg-white text-black h-10 border-2 border-amber-50"
                                    />
                                    {errors.lastName &&
                                        <p className="text-sm text-red-500"> {`${errors.lastName.message}`}</p>}
                                </div>

                            </div>
                            <Label className="font-bold " htmlFor="email">
                                Email
                            </Label>
                            <Input
                                {...register("email")}
                                id="email"
                                placeholder="Enter your email address"
                                type="email"
                                className="bg-white text-black h-10 border-2 border-amber-50"
                            />
                            {errors.email &&
                                <p className="text-sm text-red-500"> {`${errors.email.message}`}</p>}
                        </div>
                        <div className="space-y-2 pt-3">
                            <Label className="font-bold" htmlFor="password">
                                Password
                            </Label>
                            <Input
                                {...register("password")}
                                id="password"
                                placeholder="Enter your password"
                                type="password"
                                className="bg-white text-black h-10 border-2 border-amber-50"
                            />
                            {errors.password &&
                                <p className="text-sm text-red-500"> {`${errors.password.message}`}</p>}
                        </div>
                        <div className="space-y-2 pt-3">
                            <Label className="font-bold" htmlFor="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input
                                {...register("confirmPassword")}
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                type="password"
                                className="bg-white text-black h-10 border-2 border-amber-50"
                            />
                            {errors.confirmPassword &&
                                <p className="text-sm text-red-500"> {`${errors.confirmPassword.message}`}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 mt-6">
                        <Button className="w-full h-10 rounded-xl border-2 border-black bg-black text-white transition-all duration-200 hover:bg-background hover:text-black hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting} variant="outline">Sign up</Button>
                        <SignUpFooter />
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default SignUp;
