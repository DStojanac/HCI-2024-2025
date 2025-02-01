import NextAuth, { Session, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import authConfig from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/lib/validations";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

interface ExtendedUser extends NextAuthUser {
  role?: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      image?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }: { token: JWT; session: Session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },

    async jwt({ token, user }: { token: JWT; user?: ExtendedUser }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials): Promise<ExtendedUser | null> {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .execute();
          if (!user.length || !user[0].password) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(
            password,
            user[0].password
          );
          if (!passwordsMatch) {
            return null;
          }
          return {
            id: user[0].id,
            email: user[0].email,
            name: user[0].name,
            role: user[0].role as string,
          };
        }
        return null;
      },
    }),
  ],
});
