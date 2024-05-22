import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request : Request) {
  try {
    const { email,name, password,confirmPassword } = await request.json()
    const hashedPassword = bcrypt.hashSync(password, 10)

    if(password == confirmPassword){
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      })
      return Response.json({ message: 'User created', user })
    }else{
      return Response.json({ message: 'Password not Matching' })
    }
  } catch (error) {
    return Response.json({ message: 'User could not be created',err : error })
  }
}