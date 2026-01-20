import Link from "next/link";
import Image from "next/image";
import { FiGithub, FiTwitter, FiInstagram, FiMail } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await axios.post("/api/newsletter", { email });
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link href="/">
              <div className="flex items-center cursor-pointer group">
                <Image
                  width={32}
                  height={32}
                  src="/logo.svg"
                  alt="logo"
                />
                <span className="ml-2 font-black text-xl tracking-tighter">Questionpaperz</span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              The premier destination for student-shared educational resources. Helping you prepare for a better tomorrow.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-qp-orange hover:text-white transition-all"><FiTwitter /></a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-qp-orange hover:text-white transition-all"><FiInstagram /></a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-qp-orange hover:text-white transition-all"><FiGithub /></a>
            </div>
          </div>

          <div>
            <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/Boards"><span className="text-gray-500 hover:text-qp-orange transition-colors cursor-pointer font-bold text-sm">Boards</span></Link></li>
              <li><Link href="/Universities"><span className="text-gray-500 hover:text-qp-orange transition-colors cursor-pointer font-bold text-sm">Universities</span></Link></li>
              <li><Link href="/EntExam"><span className="text-gray-500 hover:text-qp-orange transition-colors cursor-pointer font-bold text-sm">Entrance Exams</span></Link></li>
              <li><Link href="/Notes"><span className="text-gray-500 hover:text-qp-orange transition-colors cursor-pointer font-bold text-sm">Study Notes</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="/upload"><span className="text-gray-500 hover:text-qp-orange transition-colors cursor-pointer font-bold text-sm">Contribute Paper</span></Link></li>
              <li><Link href="/Search"><span className="text-gray-500 hover:text-qp-orange transition-colors cursor-pointer font-bold text-sm">Search Catalog</span></Link></li>
              <li><Link href="/Bookmarks"><span className="text-gray-500 hover:text-qp-orange transition-colors cursor-pointer font-bold text-sm">Your Dashboard</span></Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-6">Newsletter</h4>
            <p className="text-gray-500 text-xs font-medium leading-relaxed">Get the latest updates on new paper uploads and exam schedules.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm w-full focus:ring-2 focus:ring-qp-orange" 
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-gray-900 text-white p-3 rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <FiMail className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            © 2026 Questionpaperz. Developed for students, by students.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900">Privacy</a>
            <a href="#" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
