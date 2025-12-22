"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/lib/schemas/loginSchema";
import { adapter } from "next/dist/server/web/adapter";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "../actions/login";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const LoginHeader = () => {

    const LogoPlaceholder = () => {
        return (
            <div className="flex justify-center mb-4 mt-10  ">
                <span className="font-bold bg-black size-12  rounded-lg text-white flex justify-center items-center">
                    <Lock />
                </span>
            </div>
        );
    };


    return (
        <CardHeader className="space-y-1">
            <LogoPlaceholder />
            <CardTitle className="text-center text-4xl tracking-tighter font-serif ">Welcome Back</CardTitle>
            <CardDescription className="text-center italic text-gray-700 -tracking-wide ">
                Enter your username and password to continue.
            </CardDescription>
        </CardHeader>
    );
};



type TloginSchema = z.infer<typeof loginSchema>

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<TloginSchema>(
        {
            resolver: zodResolver(loginSchema)
        }
    )


    const onSubmit = async (data: TloginSchema) => {
        const result = await loginAction(data)

        if (!result.success) {
            toast.error(result.message);
        } else {
            toast.success(result.message);
            redirect("/dashboard");
        }
    }
    return (
        <div
            className="flex items-center justify-center min-h-screen py-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="w-120  p-3 bg-blue-100">
                    <LoginHeader />
                    <CardContent className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label className="font-bold" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                {...register("email")}
                                id="email"
                                placeholder="Enter your email address"
                                type="email"
                                className=" text-black h-10  bg-white border-2  border-amber-50 "
                            />
                            {errors.email && <p className="text-sm text-red-500"> {`${errors.email.message}`}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold" htmlFor="password">
                                Password
                            </Label>
                            <Input
                                {...register("password")}
                                id="password"
                                placeholder="Enter your password"
                                type="password"
                                className=" text-black h-10 bg-white border-2  border-amber-50 "
                            />
                            {errors.password && <p className="text-sm text-red-500"> {`${errors.password.message}`}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember" className="text opacity-70">
                                    Remember me
                                </Label>
                            </div>
                            <Button variant={"link"} className="px-0">
                                <a href="#" className="text-sm hover:underline font-black">
                                    Forgot password
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 mt-4">
                        <Button className="w-full h-10 rounded-xl border-2 border-black bg-black text-white transition-all duration-200 hover:bg-background hover:text-black hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            Sign in
                        </Button>

                        <div className="text-center text-sm text-amber-950 tracking-tighter">
                            Don't have an account?
                            <Button variant={"link"} className="px-1 ml-1 hover:text-red-400">
                                <a href="/signup">Register</a>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default Login;
