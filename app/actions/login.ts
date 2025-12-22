"use server"

import { prisma } from "@/lib/db";
import { loginSchema } from "@/lib/schemas/loginSchema";
import { redirect } from "next/navigation";
import z, { success } from "zod";


export async function loginAction(data: z.infer<typeof loginSchema>) {

    const validatedData = loginSchema.safeParse(data);

    if (!validatedData.success) {
        return { success: false, message: "Problem detected in the data validation process" }
    }

    const { email, password } = validatedData.data
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!existingUser) {
            return { success: false, message: "The entered mail does not have any account please create one !" }

        }

        if (existingUser.password !== password) {
            return { success: false, message: "Mauvais mot de passe" }
        }

        return { success: true, message: "Bienvenu , vous êtes bien connecté" }

    } catch (error) {
        console.error("DEBUG PRISMA ERROR:", error);
        return { success: false, message: "Une erreur est survenue lors de la connection à votre compte !" }
    }
}