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
        phone: { label: "Phone Number", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Authorize request received:", { fullName: credentials?.fullName, phone: credentials?.phone });
        
        try {
          await dbConnect();
          console.log("Connected to MongoDB");

          // --- ADMIN LOGIN FLOW (Email + Password) ---
          if (credentials?.email && credentials?.password) {
            console.log("Processing Admin Login...");
            const user = await User.findOne({ email: credentials.email });
            
            if (!user) {
              console.log("Admin not found.");
              return null;
            }

            const isValidPassword = await bcrypt.compare(credentials.password, user.password);
            
            if (!isValidPassword) {
              console.log("Invalid admin password.");
              return null;
            }

            console.log("Admin authenticated successfully.");
            return {
              id: user._id.toString(),
              name: user.email, // using email as Name for admin
              role: user.role,
            };
          }

          // --- USER PASSWORDLESS FLOW (Name + Phone) ---
          if (credentials?.fullName && credentials?.phone) {
            console.log("Processing User Login...");
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

            return {
              id: user._id.toString(),
              name: user.fullName,
              phone: user.phone,
              role: user.role,
            };
          }

          console.log("Missing valid credentials combination.");
          return null;

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
