import { z } from "zod";


export const signUpSchema = z.object({
    email: z.email(),
    firstName: z.string().min(3, "Your name must at least have 3 letters"),
    lastName: z.string().min(3, "Your name must at least have 3 letters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"]
})

