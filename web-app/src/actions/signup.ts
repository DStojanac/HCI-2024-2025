"use server";
import * as z from "zod";

import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { SignUpSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";

export const signup = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .execute();

  if (existingUser.length > 0) {
    return { error: "User already exists!" };
  }

  await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
      name,
    })
    .execute();
  return { success: "User created!" };
};
