import Form from "./(site)/components/Form";
import Header from "./(site)/components/Header";
import Tasks from "./(site)/(home)/Tasks/Tasks";
import { Suspense } from "react";
import FetchLoading from "./(site)/components/FetchLoading";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/AuthOptions";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function Home() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/signin");
  // }
  return (
    <main className="w-[95%] max-w-xl bg-todo h-3/4 sm:max-h-[800px] rounded-md p-8 shadow-md ">
      <Header />
      <Form />
      <span>
        <Suspense
          fallback={
            <div className="mt-16 w-full h-64 flex items-center justify-center relative z-10">
              <FetchLoading />
            </div>
          }
        >
          <Tasks />
        </Suspense>
      </span>
    </main>
  );
}
