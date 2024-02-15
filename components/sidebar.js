import Link from "next/link";
import { FiUpload } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { BsGlobe } from "react-icons/bs";
import { BsFilePost } from "react-icons/bs";

const menuItems = [
  {
    label: "Upload",
    icon: FiUpload,
    href: "/upload",
  },
  {
    label: "Write",
    icon: FiEdit,
    href: "#",
  },
  {
    label: "Boards",
    icon: BsGlobe,
    href: "/Boards",
  },
  {
    label: "Saved",
    icon: BsBookmark,
    href: "#",
  },
  {
    label: "Your Uploads",
    icon: AiOutlineFileDone,
    href: "/uploads",
  },
  {
    label: "Your Posts",
    icon: BsFilePost,
    href: "#",
  },
];

const Sidebar = () => {
  return (
    <>
      <div>
        <div className="hidden lg:flex bg-back-grey rounded-l-lg h-[520px] overflow-scroll p-10 ">
          <div className="flex  flex-col space-y-8 justify-start">
            {menuItems.map(({ label, href, icon: Icon }) => (
              <div key={label}>
              <Link href={href}>
                <div className="duration-200  hover:bg-qp-orange flex h-12 w-[19.5rem] items-center justify-start space-x-3 pl-5 rounded-xl cursor-pointer bg-black/[0.05] shrink-0">
                  <Icon className="w-5 h-5 shrink-0 text-black" />
                  <h3>{label}</h3>
                </div>
              </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
