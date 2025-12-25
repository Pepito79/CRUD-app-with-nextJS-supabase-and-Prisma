"use server"
import { prisma } from '@/lib/db'
import { getServerSession } from '@/lib/get-sessions'
import { step1Schema, TStep1Form } from '@/lib/schemas/OnBoarding/step1Schema'


export default async function onBoardingAction1(step1Data: TStep1Form) {


    const session = await getServerSession()
    const user = session?.user

    const { data, error } = step1Schema.safeParse(step1Data)
    if (error) {
        return { success: false, message: `Erreur ${error.message}` }
    }
    try {
        await prisma.user.update({
            where: { id: user?.id },
            data: {
                firstName: data?.firstName,
                lastName: data?.lastName,
                job: data?.job,
                phoneNumber: data?.phoneNumber,
                name: `${data?.firstName} ${data?.lastName}`
            }
        })
        return { success: true }
    }
    catch (error) {
        console.log(error);
        return { success: false }
    }
}
