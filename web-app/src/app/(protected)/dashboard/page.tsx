import { auth, signOut } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <>
      <main className="container mx-auto max-w-full px-4 lg:px-20 md:px-10 sm:px-5">
        <h1>DASHBOARD PAGE</h1>
        <h1>{JSON.stringify(session)}</h1>
        <h1>{session?.user.name}</h1>
        <h1>{session?.user.email}</h1>
        <h1>{session?.user.role}</h1>

        <form
          action={async () => {
            "use server";

            await signOut({
              redirectTo: "/login",
            });
          }}
        >
          <button type="submit">SIGN OUT</button>
        </form>
      </main>
    </>
  );
}
