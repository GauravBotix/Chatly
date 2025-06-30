import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare , User } from "lucide-react";

const Header = () => {
  const { logoutAuth, authUser } = useAuthStore();

  const handleLogout = () => {
    logoutAuth();
  };

  return (
    <header 
      className="bg-linear-to-r from-primary-900  to-secondary-900  text-black  border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg "
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/20 flex items-center justify-center border border-chat-third-900">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold uppercase">Chatly</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2 bg-slate-200 tracking-wider text-black `}>
                  <User className="size-5" />
                  <span className="hidden sm:inline ">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
