import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        fullName: { label: "Full Name", type: "text" },
        phone: { label: "Phone Number", type: "text" }
      },
      async authorize(credentials) {
        console.log("Authorize request received:", { fullName: credentials?.fullName, phone: credentials?.phone });
        
        try {
          if (!credentials?.fullName || !credentials?.phone) {
            console.log("Missing credentials");
            return null;
          }

          await dbConnect();
          console.log("Connected to MongoDB");

          // Passwordless flow: Find or create the user
          let user = await User.findOne({ phone: credentials.phone });
          console.log("User lookup result:", user ? "Found" : "Not Found");
          
          if (!user) {
            console.log("Creating new user...");
            user = await User.create({
              fullName: credentials.fullName,
              phone: credentials.phone,
              role: 'user',
            });
            console.log("User created successfully:", user._id);
          }

          const userToReturn = {
            id: user._id.toString(),
            name: user.fullName,
            phone: user.phone,
            role: user.role,
          };
          
          console.log("Returning user object:", userToReturn.id);
          return userToReturn;
        } catch (error: any) {
          console.error("DEBUG - NextAuth Authorize Error:", error.message);
          return null; // NextAuth 401
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin', // You can create a custom sign-in page later
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
