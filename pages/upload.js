import React from "react";
import Listbox from "../components/listbox";
import { prisma } from "../lib/prisma";

export async function getServerSideProps() {
  // Get all homes
  const board = await prisma.boards.findMany({
  });
  const type = await prisma.q_type.findMany({
  });
  // Pass the data to the Home page
  return {
    props: {
      board: JSON.parse(JSON.stringify(board)),
      type: JSON.parse(JSON.stringify(type)),
    },
  };
  
  // Pass the data to the Home page
  return {
    props: {
      
    },
  };
}
export default function Upload({ board = [],type=[] }) {
  return (
    <div className="bg-black h-screen w-screen">
      <div className="">
        <Listbox board={board} />
      </div>
        <Listbox board={type} />  
    </div>
  );
};

