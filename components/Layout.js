import Head from "next/head";
import Headerleft from "./headerleft";
import Headerright from "./headerright";
import Sidebar from "./sidebar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiHome, FiSearch, FiUpload, FiGrid } from "react-icons/fi";

import { useSession } from "next-auth/react";
import { useState } from "react";
import AuthModal from "./authmodal";

const Layout = ({ children, title = "QuestionPaperz.com", description = "Download previous year question papers and notes" }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);

  const navItems = [
    { icon: FiHome, label: "Home", href: "/" },
    { icon: FiSearch, label: "Search", href: "/Search" },
    { icon: FiUpload, label: "Upload", href: "/upload", auth: true },
    { icon: FiGrid, label: "Boards", href: "/Boards" },
  ];

  const handleNav = (e, item) => {
    if (item.auth && !session) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/logo.svg" />
      </Head>

      {/* Main Navigation */}
      <header className="sticky top-0 z-[60] glass">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-4 sm:px-6 lg:px-8">
          <Headerleft />
          <Headerright />
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-grow overflow-hidden">
          {children}
        </div>
        
        {/* Sidebar - Hidden on mobile, shown on large screens */}
        <aside className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-28">
            <Sidebar />
          </div>
        </aside>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav lg:hidden">
        {navItems.map((item) => {
          const { icon: Icon, label, href } = item;
          const isActive = router.pathname === href;
          return (
            <Link key={label} href={isActive ? '#' : href} onClick={(e) => handleNav(e, item)}>
              <div className={`mobile-nav-item ${isActive ? 'active' : ''}`}>
                <Icon className="w-6 h-6" />
                <span className="text-[10px] font-medium tracking-tight">{label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Auth Modal */}
      <AuthModal show={showModal} onClose={() => setShowModal(false)} />

      {/* Footer Spacer for Mobile Nav */}
      <div className="h-24 lg:hidden" />
    </div>
  );
};

export default Layout;
