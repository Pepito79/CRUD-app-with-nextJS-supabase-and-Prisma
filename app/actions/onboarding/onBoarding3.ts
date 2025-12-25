"use server"

import { prisma } from "@/lib/db"
import { getServerSession } from "@/lib/get-sessions"
import { step3Schema, TStep3Form } from "@/lib/schemas/OnBoarding/step3Schema"

export default async function onBoardingAction3(formData: TStep3Form) {

    const session = await getServerSession()
    const userId = session?.user.id
    if (!userId) {
        return { success: false, message: "Problème dans userId" }
    }

    const { data, error } = step3Schema.safeParse(formData)
    if (error) {
        return { success: false, message: error.message }
    }

    try {
        await prisma.userWorkingInfo.upsert({
            where: { userId },
            update: {
                city: data.city,
                numb_workers: data.num_workers,
                siret: data.siret
            },
            create: {
                userId: userId,
                city: data.city,
                numb_workers: data.num_workers,
                siret: data.siret
            }
        })

        await prisma.user.update({
            where: { id: userId },
            data: {
                hasOnBoarded: true
            }
        })

        return { success: true, message: "Bienvenu on boarding terminé" }
    } catch (error) {
        console.error(error)
        return { success: false, message: "Error catched" }
    }

}
