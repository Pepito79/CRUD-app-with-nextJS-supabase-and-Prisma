import { CompanySituation } from "@/lib/generated/prisma/enums";
import { z } from "zod";



export const step2Schema = z.object({
    situationStatus: z.enum(CompanySituation),
});

export type TStep2Form = z.infer<typeof step2Schema>;