import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import authConfig from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/lib/validations";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { User } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },

    async jwt({ token }) {
      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials): Promise<User | null> {
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
          };
        }
        return null;
      },
    }),
  ],
});
