import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full bg-linear-to-r from-primary-900  to-secondary-900  flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold  text-text-900 uppercase">Welcome to Chatly!</h2>
        <p className="text-text-900 font-medium mt-[-10px]">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
