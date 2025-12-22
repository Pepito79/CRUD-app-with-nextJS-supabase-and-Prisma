import z from "zod";




export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "The password has at least 6 characters")
})