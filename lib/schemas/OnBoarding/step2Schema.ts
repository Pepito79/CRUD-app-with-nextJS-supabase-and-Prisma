import { z } from "zod";

export enum CompanySituation {
    PENDING_SIRET = 1,
    LESS_THAN_3_MONTHS = 2,
    FROM_3_MONTHS_TO_1_YEAR = 3,
    MORE_THAN_1_YEAR = 4,
    NO_BUSINESS = 5,
}

export const step2Schema = z.object({
    situationStatus: z.enum(CompanySituation),
});

export type TStep2Form = z.infer<typeof step2Schema>;