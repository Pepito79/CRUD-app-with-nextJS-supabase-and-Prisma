"use server"
import { prisma } from "@/lib/db"
import { signUpSchema } from "@/lib/schemas/auth"
import z from "zod"



export async function signUpAction(data: z.infer<typeof signUpSchema>) {

    const validateData = signUpSchema.safeParse(data)

    if (!validateData.success) {
        return { success: false, message: "Data invalid" }
    }

    const { email, password } = validateData.data;

    try {

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return { success: false, message: "Adresse mail déjà utilisée !" }
        }

        await prisma.user.create({
            data: {
                email,
                password
            }
        })


        return { success: true, message: "User successfully created !" }
    } catch (error) {
        console.error("DEBUG PRISMA ERROR:", error);
        return { success: false, message: "Une erreur est survenue lors de la création de votre compte !" }
    }
}



