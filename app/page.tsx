import { getAllTodos } from "@/lib/todos/getAllTodos";
import Form from "./(site)/components/Form";
import Header from "./(site)/components/Header";
import Tasks from "./(site)/components/Tasks/Tasks";
import Container from "./(site)/components/nav/(shared)/Container";
import { Suspense } from "react";
import FetchLoading from "./(site)/components/FetchLoading";

export default function Home() {
  return (
    <Container>
      <main className="w-[95%] md:w-5/6  lg:max-w-2xl bg-todo h-3/4 sm:max-h-[800px] rounded-md p-8 shadow-md ">
        <Header />
        <Form />
        <Suspense fallback={<FetchLoading />}>
          <Tasks />
        </Suspense>
      </main>
    </Container>
  );
}
