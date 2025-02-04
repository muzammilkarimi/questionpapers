import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../lib/prisma';
// import { PrismaClient } from '@prisma/client';

// Instantiate Prisma Client
// const prisma = new PrismaClient();
export default NextAuth({
  
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

    }),
    // ...add more providers here
  ],
  
  secret: process.env.JWT_SECRET,
  adapter: PrismaAdapter(prisma),
  
});
