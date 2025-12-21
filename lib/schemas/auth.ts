import { z } from "zod";


export const signUpSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"]
})

