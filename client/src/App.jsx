import React, { useEffect } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");

      setTimeout(() => {
        window.location.reload();
      }, 50);
    }
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center ">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster />
    </>
  );
};

/* className="lg:pt-20 pt-35 flex-1 overflow-y- auto pb-[10vh] z-50 " */
export default App;
