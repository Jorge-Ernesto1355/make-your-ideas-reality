import { signIn } from "next-auth/react";
import Image from "next/image";
const Providers = () => {
  return (
    <div className="my-3 w-full items-center justify-center ">
      <span className="flex items-center justify-center space-x-3">
        <div className=" h-[1px]  w-4/12 bg-gray-400"></div>
        <span className="text-gray-500">O</span>
        <div className="h-[1px] w-4/12  bg-gray-400 "></div>
      </span>
      <div className="my-5 flex items-center justify-evenly ">
        <Image
          src={"/googleLogo.png"}
          width={50}
          height={50}
          onClick={() =>
            void signIn("google", { callbackUrl: " http://localhost:3000" })
          }
          alt="google logo session"
          className="cursor-pointer rounded-full p-1 shadow-lg"
        />

        <Image
          onClick={() =>
            void signIn("facebook", { callbackUrl: " http://localhost:3000" })
          }
          src={"/facebookLogo.webp"}
          width={50}
          height={50}
          alt="facebook logo session"
          className="cursor-pointer rounded-full p-1 shadow-lg"
        />
      </div>
    </div>
  );
};
export default Providers;
