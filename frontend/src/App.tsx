import ListTasks from "@/components/ListTasks";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import NewTask from "./components/NewTask";
import { Button } from "./components/ui/button";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/new-task",
    element: <NewTask />,
  },
  {
    path: "/list-tasks",
    element: <ListTasks />,
  },
]);

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-background font-sans antialiased bg-gray-200">
        <main className="flex flex-1 sm:p-4 sm:container flex-col">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
            Task Management System
          </h1>

          <div className="my-4 space-x-2">
            <a href="/new-task">
              <Button>New Task</Button>
            </a>
            <a href="/list-tasks">
              <Button>List Tasks</Button>
            </a>
          </div>

          <RouterProvider router={router} />
        </main>
      </div>
    </>
  );
}

export default App;
