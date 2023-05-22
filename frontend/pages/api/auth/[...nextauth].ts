import { PrismaClient } from "@prisma/client";
import NextAuth, {NextAuthOptions} from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs" 

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    secret: "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4NDU1MTI0NCwiaWF0IjoxNjg0NTUxMjQ0fQ.b-aEVDpSIFdrBTLU1XuBIzh3qsxjh4mUqYjmoyf-Dw4=",
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