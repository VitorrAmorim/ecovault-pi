import BottomNav from "./BottomNav";
import DesktopSidebar from "./DesktopSidebar";
import { Toaster } from "sonner";

const AppShell = ({ children, activeTab }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Toaster />
      <DesktopSidebar activeTab={activeTab} />
      <div className="flex-1 flex justify-center">
        <div className="w-full pl-57.5 min-h-screen relative max-md:pl-0">
          <div className="animate-screen-in flex flex-col min-h-screen pb-22 lg:pb-0">
            {children}
          </div>
          <BottomNav activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default AppShell;
