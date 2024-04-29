import ListTasks from "@/components/ListTasks";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditTask from "./components/EditTask";
import Home from "./components/Home";
import NewTask from "./components/NewTask";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Toaster } from "./components/ui/sonner";
axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;

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
  {
    path: "/edit-task/:id",
    element: <EditTask />,
  },
]);

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-background font-sans antialiased bg-gray-300">
        <main className="flex flex-1 sm:p-4 sm:container flex-col ">
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

          <Separator className="my-4" />

          <RouterProvider router={router} />
          <Toaster />
        </main>
      </div>
    </>
  );
}

export default App;
