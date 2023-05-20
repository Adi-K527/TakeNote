import { PrismaClient } from "@prisma/client";
import NextAuth, {NextAuthOptions} from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs" 

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req){ 
                const prisma = new PrismaClient()

                const {username, password} = credentials as {
                    username: string,
                    password: string
                }

                const user = await prisma.user.findUnique({where: {userName: username}})
                if (user) {
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (passwordMatch){
                        return {id: '', 'name': user.id, 'email': user.userName}
                    }
                    else{
                        throw new Error("Invalid Credentials")
                    }
                }
                else {
                    throw new Error("Invalid Credentials")
                }
            }
        })
    ],
    pages: {
        signIn: "../../../app/Login/page",
    }
}

export default NextAuth(authOptions)