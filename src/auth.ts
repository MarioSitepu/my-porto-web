import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null

                const user = await prisma.user.findUnique({
                    where: { username: credentials.username as string }
                })

                if (!user) return null

                const passwordsMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                )

                if (passwordsMatch) {
                    return { id: user.id, name: user.username }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/login', // We will route the admin login page here
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id as string
            }
            return session
        }
    }
})
