import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import { nextCookies } from "better-auth/next-js"
import { auth } from "./auth"


// Le plugin inferAddtionalFields nous permet d'avoir accès aux attributs ajoutés au prisma
// modèle depuis un composant client

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [
        inferAdditionalFields<typeof auth>(),
        nextCookies()
    ]
})