import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden pb-16 md:pb-0">
        <Header />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
