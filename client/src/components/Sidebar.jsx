import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import avatarImage from "../assets/avatar.png";

const Sidebar = () => {
  const { getUser, users, selectedUser, setSelectedUser, isUserLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full   w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block ">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2 ">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3  ">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 mt-2
              hover:bg-slider-900 transition-colors rounded-md cursor-pointer 
              ${
                selectedUser?._id === user._id
                  ? "bg-slider-900 ring-1 cursor-pointer ring-base-300 rounded-md"
                  : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilepic || avatarImage}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) ? (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-1 ring-zinc-200 "
                />
              ) : (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-red-500 
                  rounded-full ring-1 ring-neutral-400 "
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden text-left min-w-0 lg:flex justify-between">
              <div className="font-sans font-Normal truncate capitalize ">
                {user.name}
              </div>
              <div className="text-sm text-green-700 mt-1 px-2">
                {onlineUsers.includes(user._id) ? (
                  <span className="text-green-700">(Online)</span>
                ) : (
                  <span className="text-red-700">(Offline)</span>
                )}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
