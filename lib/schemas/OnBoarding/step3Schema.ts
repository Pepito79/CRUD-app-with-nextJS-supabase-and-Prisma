import { NumWokers } from "@/lib/generated/prisma/enums";
import { z } from "zod";

export const step3Schema = z.object({
    num_workers: z.enum(NumWokers),
    siret: z.string().length(14, "Le numéro SIRET doit faire 14 chiffres"),
    city: z.string().min(3, "Veuillez selectioner une ville valide")
})

export type TStep3Form = z.infer<typeof step3Schema>

