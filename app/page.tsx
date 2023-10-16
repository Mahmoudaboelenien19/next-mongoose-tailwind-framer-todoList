import Form from "./(home)/components/Form";
import Header from "./(home)/components/Header";
import Tasks from "./(home)/components/Tasks/Tasks";

export default function Home() {
  return (
    <main className="w-[95%] md:w-5/6  lg:max-w-2xl bg-todo h-5/6 sm:max-h-[800px] rounded-md p-8 shadow-md">
      <Header />
      <Form />
      <Tasks />
    </main>
  );
}
