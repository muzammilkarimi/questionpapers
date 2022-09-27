import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";

const login = () => {
  const { data:session } = useSession();

  if (session) {
    return (
      <>
        <div
          onClick={()=> signOut()}
          className="bg-qp-orange flex h-10 w-28 rounded- items-center justify-evenly rounded-full drop-shadow-neo cursor-pointer "
        >
          <img className="h-10 w-10 rounded-full" src={session.user.image} alt="user" />
          {/* <h3>logout</h3>
          <p>{session.user.name}</p> */}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
        onClick={()=> signIn()}
          className="bg-qp-orange flex h-10 w-28 items-center justify-evenly rounded-xl drop-shadow-neo cursor-pointer "
        >
          <img src="/login.svg" alt="login icon" />
          <h3>Signin</h3>
        </div>
      </>
    );
  }
};

export default login;
