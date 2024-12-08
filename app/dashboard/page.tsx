import AppBar from "@/components/Appbar";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import Footer from "@/components/Footer";
//Dashboard page for todo creation , display and update components
export default function Dashboard() {
  return (
    <div className="">
      <div>
        <AppBar />
      </div>
      <div className="flex justify-center items-center">
        <AddTodo />
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-between gap-20 mx-5 md:gap-10 md:flex md:flex-row lg:flex lg:flex-row  md:w-1/2">
          <div className="pending-todos ">
            <TodoList isCompleted={false} />
          </div>
          <div className="completed-todos ">
            <TodoList isCompleted={true} />
          </div>
        </div>
      </div>
      <div className="static bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
