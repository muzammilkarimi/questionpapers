import Link from "next/link";
import Image from "next/image";
import Login from "../components/login";
import { useRouter } from "next/router";

const Headerleft = () => {
  const router = useRouter();

  const navLinks = [
    { label: "Boards", href: "/Boards" },
    { label: "Universities", href: "/Universities" },
    { label: "Entrance Exams", href: "/EntExam" },
    { label: "Notes", href: "/Notes" },
  ];

  return (
    <div className="flex items-center gap-8 lg:gap-12">
      <Link href="/">
        <div className="flex items-center cursor-pointer group">
          <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
            <Image
              layout="fill"
              src="/logo.svg"
              alt="questionpapers logo"
              priority
            />
          </div>
          <div className="ml-3 font-extrabold text-xl tracking-tighter">
            <span className="text-gray-900 leading-none block">Questionpaperz</span>
            <span className="text-qp-orange text-[10px] uppercase tracking-widest leading-none">Educational Hub</span>
          </div>
        </div>
      </Link>
      
      <nav className="hidden lg:flex items-center">
        <ul className="flex space-x-1 items-center">
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <li key={link.href}>
                <Link href={link.href}>
                  <div className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-qp-orange/10 text-qp-orange' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}>
                    {link.label}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Headerleft;
