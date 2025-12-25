import z from "zod";


export const step1Schema = z.object({
    firstName: z.string().min(2, "Veuillez entrez un prénom valable"),
    lastName: z.string().min(2, "Veuillez entrez un nom valable"),
    job: z.string().min(3, "Veuillez entrez un job valable"),
    phoneNumber: z.string().length(10, "Le numéro doit faire 10 chiffres"),
})

export type TStep1Form = z.infer<typeof step1Schema>
