import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ConceptSidebar from "@/app/components/ConceptSidebar";
import ConceptNav from "@/app/components/ConceptNav";

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
        <main className="flex-1 min-w-0 p-6 lg:p-8">
          {children}
          <ConceptNav />
        </main>
      </div>
      <Footer />
    </div>
  );
}
