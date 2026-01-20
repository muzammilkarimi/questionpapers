import Link from "next/link";
import { FiUpload, FiEdit, FiBookmark, FiGlobe, FiFileText, FiAward } from "react-icons/fi";
import { AiOutlineFileDone } from "react-icons/ai";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AuthModal from "./authmodal";

const menuItems = [
  { label: "Community Upload", icon: FiUpload, href: "/upload", desc: "Share your papers", auth: true },
  { label: "Expert Notes", icon: FiFileText, href: "/Notes", desc: "Revision guides" },
  { label: "Educational Boards", icon: FiGlobe, href: "/Boards", desc: "CBSE, ICSE & more" },
  { label: "Entrance Exams", icon: FiAward, href: "/EntExam", desc: "JEE, NEET preparation" },
  { label: "Your Uploads", icon: AiOutlineFileDone, href: "/uploads", desc: "Manage content", auth: true },
  { label: "Bookmarks", icon: FiBookmark, href: "/Bookmarks", desc: "Saved for later", auth: true },
];

const Sidebar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);

  const handleNav = (e, item) => {
    if (item.auth && !session) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 h-fit">
      <div className="space-y-6">
        <div className="px-4 py-2">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Quick Access</h3>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const { label, href, icon: Icon, desc } = item;
            const isActive = router.pathname === href;
            return (
              <Link key={label} href={isActive ? '#' : href} onClick={(e) => handleNav(e, item)} className="block">
                <div className={`group flex items-center p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-qp-orange text-white shadow-lg shadow-qp-orange/20' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-colors ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500 group-hover:text-qp-orange ring-0 group-hover:ring-4 group-hover:ring-qp-orange/10'
                  }`}>
                    <Icon />
                  </div>
                  <div className="ml-4 flex-grow">
                    <p className={`text-sm font-bold tracking-tight ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-qp-orange'}`}>{label}</p>
                    <p className={`text-[10px] font-medium opacity-60 ${isActive ? 'text-white' : 'text-gray-400'}`}>{desc}</p>
                  </div>
                  {!isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-qp-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
        <AuthModal show={showModal} onClose={() => setShowModal(false)} />

        {/* Support Section */}
        <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-qp-orange/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="relative z-10 space-y-3">
                <p className="text-xs font-black text-qp-orange uppercase tracking-widest">Help us grow</p>
                <h4 className="text-lg font-bold leading-tight">Support the project</h4>
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed">We are a student-run platform. Share this with your friends if you find it helpful!</p>
                <div className="pt-2">
                    <button className="w-full py-2 bg-qp-orange hover:bg-qp-orange-dark text-white text-xs font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-qp-orange/10">
                        Share Now
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
