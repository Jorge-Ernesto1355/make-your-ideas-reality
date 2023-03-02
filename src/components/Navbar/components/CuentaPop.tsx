import { motion } from "framer-motion";
import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { variants } from "../utils/variants";
const CuentaPop = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FiChevronDown
        className="cursor-pointer"
        size={"20px"}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      />
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        className={"absolute"}
      >
        <div className="h-20 w-32 rounded-md bg-white  shadow-md  before:h-2 before:w-2 before:bg-red-500">
          <ul className="flex flex-col items-center rounded-md">
            <li className="flex w-full cursor-pointer items-center justify-evenly border-b-2 py-2  hover:rounded-t-md hover:bg-slate-200 ">
              <BiUserCircle size={"20px"} />
              <p className="font-medium">Cuenta</p>
            </li>
            <li className="flex w-full cursor-pointer items-center justify-evenly p-2 last:border-none hover:rounded-b-md  hover:bg-slate-200 ">
              <FiLogOut size={"20px"} />
              <p className="font-medium">Salir</p>
            </li>
          </ul>
        </div>
      </motion.div>
    </>
  );
};
export default CuentaPop;
