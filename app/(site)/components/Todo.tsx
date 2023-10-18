import Form from "./Form";
import Header from "./Header";
import Tasks from "./Tasks/Tasks";

export default function Todo() {
  return (
    <main className="w-[95%] md:w-5/6  lg:max-w-2xl bg-todo h-3/4 sm:max-h-[800px] rounded-md p-8 shadow-md ">
      <Header />
      <Form />
      <Tasks />
    </main>
  );
}
