"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "@/lib/schemas/auth";

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
                Enter your details to register.
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


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset } = useForm<SignUpFormData>({
            resolver: zodResolver(signUpSchema)
        })


    const onSubmit = (data: SignUpFormData) => {
        console.log("Data submited ! ", data);
        reset()
    }

    return (
        <div
            className="flex items-center justify-center min-h-screen py-3"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="w-120  p-3 bg-blue-100">
                    <SignUpHeader />
                    <CardContent className="space-y-4 mt-4">
                        <div className="space-y-2 pt-3">
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
                        <Button className="w-1/3 bg-white border-2 h-10 rounded-xl" disabled={isSubmitting} variant="outline">Sign up</Button>
                        <SignUpFooter />
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default SignUp;
