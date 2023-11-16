import AddTodoList from "@/components/AddTodoList";
import CurrentDate from "@/lib/currentDate";

const AddTodo = async () => {
  const date: string = CurrentDate();

  return (
    <section className="max-w-[40rem] min-h-screen mx-auto pt-36 p-5 ">
      <header className="w-full border-b-[1px] flex items-center gap-2 mb-5 p-2">
        <h2 className="font-bold text-2xl">Today</h2>
        <span className="text-sm">{date}</span>
      </header>
      <AddTodoList />
    </section>
  );
};

export default AddTodo;
