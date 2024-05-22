import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@auth/prisma-adapter'
import DiscordProvider from "next-auth/providers/discord";

const prisma : any = new PrismaClient()
const scopes : any = ['identify', 'email']

const authOptions : any = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any, req: any) {
                if (!credentials) return null
                const user : any = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })

                if (
                    user &&
                    (await bcrypt.compare(credentials.password, user.password))
                ) {
                    return {
                        id: user.id,
                        image: user.image,
                        name: user.name,
                        role: user.role,
                        email: user.email
                    }
                } else {
                    throw new Error('Invalid email or password')
                }
            },
        }),
        DiscordProvider({
            clientId: String(process.env.DISCORD_CLIENT_ID),
            clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
            authorization: {params: {scope: scopes.join(' ')}},
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        jwt: async ({ token, user,account }: any) => {
            if (user) {
                token.id = user.id
                token.role = user.role
                token.image = user.image
            }
            if (account) {
                token.provider = account.provider;
              }
            return token
        },
        session: async ({ session, token }: any) => {
            if (session.user) {
                session.user.id = token.id
                session.user.role = token.role
                session.user.image = token.image
                session.user.provider = token.provider;
            }
            return session
        }
    },
}

const handler : any = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }