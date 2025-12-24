// import { getServerSession } from "@/lib/get-sessions";
// import { redirect, unauthorized } from "next/navigation";

// export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {

//     const session = await getServerSession();
//     if (!session) unauthorized();

//     // //Verifier si l'user est onboarder
//     // if (!session.user.hasOnBoarded) {
//     //     redirect("/onboarding")
//     // }

//     return <>
//         <div className="min-h-screen bg-[#ecddbe]">
//             {children}
//         </div>
//     </>

// }