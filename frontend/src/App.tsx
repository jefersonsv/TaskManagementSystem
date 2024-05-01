import ListTasks from "@/components/ListTasks";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditTask from "./components/EditTask";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NewTask from "./components/NewTask";
import { Popup } from "./components/Popup";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Toaster } from "./components/ui/sonner";
import { useAuthStore } from "./stores/useAuthStore";
import { useTaskStore } from "./stores/useTaskStore";

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
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

function App() {
  const popup = useTaskStore((state) => state.popup);
  const authStore = useAuthStore.getState();

  return (
    <>
      <div className="flex min-h-screen flex-col bg-background font-sans antialiased bg-gray-300">
        <main className="flex flex-1 sm:p-4 sm:container flex-col ">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
            Task Management System
          </h1>

          <div className="my-4 space-x-2">
            {authStore.token && (
              <>
                <a href="/new-task">
                  <Button>New Task</Button>
                </a>
                <a href="/list-tasks">
                  <Button>List Tasks</Button>
                </a>
                <a href="/logout">
                  <Button>Logout</Button>
                </a>
              </>
            )}

            {!authStore.token && (
              <a href="/login">
                <Button>Login</Button>
              </a>
            )}
          </div>

          <Separator className="my-4" />

          <RouterProvider router={router} />
          <Toaster />
          <Popup popup={popup} />
        </main>
      </div>
    </>
  );
}

export default App;
