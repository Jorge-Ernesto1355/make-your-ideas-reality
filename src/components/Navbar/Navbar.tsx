import Link from "next/link";
import { IoIosNotificationsOutline } from "react-icons/io";

import CuentaPop from "./components/CuentaPop";
import HowITWorksPop from "./components/ImpactPop";
const Navbar = () => {
  return (
    <div className=" fixed top-0 flex w-full items-center justify-between px-4 py-2 shadow-md">
      <div>Logo</div>
      <div className="flex items-center justify-center space-x-6">
        <Link href={"/about"}>
          <p>Acerca de Nosotros</p>
        </Link>
        <Link href={"/how-it-works"}>
          <p>Como Trabajamos</p>
        </Link>
      </div>
      <div className="mr-9 flex items-center justify-center space-x-3">
        <IoIosNotificationsOutline size={"25px"} className={"cursor-pointer"} />
        <img
          className="h-10 w-10 rounded-full object-cover
        "
          src="https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2023/01/Yor-Forger-te-enamorara-con-impactante-cosplay-de-Spy-x-Family-2.jpg?fit=1280%2C720&quality=80&ssl=1"
          alt="si"
        />
        <CuentaPop />
      </div>
    </div>
  );
};
export default Navbar;
