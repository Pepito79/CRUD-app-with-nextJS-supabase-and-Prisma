"use server"
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/get-sessions";
import { step2Schema, TStep2Form } from "@/lib/schemas/OnBoarding/step2Schema";

export default async function onBoardingAction2(step2Data: TStep2Form) {
    const session = await getServerSession()
    const userId = session?.user?.id

    const validation = step2Schema.safeParse(step2Data)
    if (!validation.success) {
        return { success: false, message: "Données invalides" }
    }

    if (!userId) {
        return { success: false, message: "Problème dans user" }
    }

    try {
        await prisma.userWorkingInfo.upsert({
            where: {
                userId: userId // On cherche la ligne liée à cet utilisateur
            },
            update: {
                comp_status: validation.data.situationStatus
            },
            create: {
                userId: userId,
                comp_status: validation.data.situationStatus
            }
        })


        return { success: true }
    } catch (error) {
        console.error("Erreur Prisma:", error)
        return { success: false, message: "Erreur base de données" }
    }
}