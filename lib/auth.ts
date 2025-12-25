import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            firstName: { type: "string", required: false },
            lastName: { type: "string", required: false },
            hasOnBoarded: { type: "boolean", required: false },
            phoneNumber: { type: "string", required: false },
            job: { type: "string", required: false }
        }
    }
});

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user