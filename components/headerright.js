import Link from "next/link";
import Script from "next/script";
import { signIn } from 'next-auth/react'
const headerright = () => {
  return (
    <>
      <div>
        <div className="hidden lg:flex bg-back-grey rounded-b-lg h-20 items-center  pl-10 pr-10">
          <div className="flex space-x-4 ">
            <Link href="/">
              <div className="bg-qp-orange flex h-10 w-28 items-center justify-evenly rounded-xl drop-shadow-neo cursor-pointer ">
                <img src="/upload.svg" alt="" />
                <h3>Upload</h3>
              </div>
            </Link>
            <Link href="/">
              <div className="bg-qp-orange flex h-10 w-28 items-center justify-evenly rounded-xl drop-shadow-neo cursor-pointer">
                <img src="/write.svg" alt="" />
                <h3>Write</h3>
              </div>
            </Link>
            
              <div onClick={()=>signIn()}  className="bg-qp-orange flex h-10 w-28 items-center justify-evenly rounded-xl drop-shadow-neo cursor-pointer ">
                <img src="/login.svg" alt="" />
                <h3>Signin</h3>
              </div>
            
          </div>
        </div>
        {/* mobile menu */}
        <div className="lg:hidden">
          <div
            id="menu"
            className="absolute hidden flex-col rounded-b-xl items-center self-end py-8 mt-20 space-y-6 font-bold bg-back-grey sm:w-auto sm:self center left-6 right-6 drop-shadow-md"
          >
            <Link href="/">
              <a>Login</a>
            </Link>
            <Link href="/">
              <a>Uplaod</a>
            </Link>
            <Link href="/">
              <a>Write</a>
            </Link>
            <Link href="/Boards">
              <a>Boards</a>
            </Link>
            <Link href="/">
              <a>Universities</a>
            </Link>
            <Link href="/">
              <a>Ent. Exams</a>
            </Link>
            <Link href="/">
              <a>Notes</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default headerright;
