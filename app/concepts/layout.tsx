import Navbar from "@/app/components/Navbar";
import ConceptSidebar from "@/app/components/ConceptSidebar";

export default function ConceptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <ConceptSidebar />
        <main className="flex-1 min-w-0 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
