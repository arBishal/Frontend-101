import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ConceptSidebar from "@/app/components/ConceptSidebar";
import ConceptNav from "@/app/components/ConceptNav";

type ConceptsLayoutProps = {
  children: React.ReactNode;
};

export default function ConceptsLayout({ children }: ConceptsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <ConceptSidebar />
        <main className="flex min-w-0 flex-1 flex-col p-6 lg:p-8">
          <div className="flex-1">{children}</div>
          <ConceptNav />
        </main>
      </div>
      <Footer />
    </div>
  );
}
