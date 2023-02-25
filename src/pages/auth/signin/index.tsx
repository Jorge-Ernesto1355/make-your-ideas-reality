import { useState, useRef, useCallback } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CheckBox from "./components/CheckBox";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { Formik, Form, ErrorMessage } from "formik";

import Providers from "../components/Providers";
import { validateSignIn } from "../utils/validateForm";

import { InitialValues } from "../utils/InitialValues";
import CheckPassword from "../components/checkPassword";
import type { ILogin } from "../../../server/api/validation/auth";
import { useRouter } from "next/router";
interface SignInState {
  error: string | undefined;
  status: number;
  ok: boolean;
  url: null | string;
}



const LogIn = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [signInState, setSignInState] = useState<SignInState | undefined>();

  const router = useRouter();

  const ref = useRef<{
    checkPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }>(null);

  const onSubmit = useCallback(
    async (data: ILogin) => {
      const result = await signIn("credentials", { ...data, redirect: false });
      setSignInState(result);
      if (result?.ok && result.status === 200) {
        await router.push("/");
      }
    },
    [router]
  );

  return (
    <div className="bg-white-700 grid h-screen w-screen place-content-center">
      <div className="bg-white-100 relative h-[520px]  w-[400px] rounded-md shadow-xl ">
        <i className="absolute    -left-4 h-12 w-96 rounded-full rounded-bl-none bg-blue-400 before:absolute before:top-[48px]  before:z-20 before:h-8 before:w-5 before:rounded-l-full before:bg-blue-500 before:content-[''] after:absolute after:top-9 after:h-7 after:w-4 after:bg-blue-400   after:content-['']" />
        <p className="absolute top-3 left-[90px]   text-2xl font-bold text-white">
          {" "}
          INICIAR SESION
        </p>
        <br />
        <br />
        <br />

        <div className="flex w-full justify-end   space-x-2 px-4 text-sm font-medium text-black ">
          <span className=" text-black">has tus ideas realidad</span>
          <AiOutlineInfoCircle size={"1.25rem"} />
        </div>

        <Formik
          initialValues={InitialValues}
          onSubmit={onSubmit}
          validate={validateSignIn}
        >
          {({
            handleChange,
            handleBlur,
            values: { email, password },
            errors: { email: ErrorEmail },
          }) => (
            <Form className=" relative my-2 flex w-full flex-col items-center justify-center space-y-2 px-5">
              <label
                htmlFor="Correo"
                className="w-9/12 text-start font-semibold text-black "
              >
                Correo
              </label>
              <input
                className="w-9/12 rounded-md border-2 p-1 shadow-sm outline-none placeholder:text-sm"
                type="email"
                name="email"
                id="email"
                placeholder="Correo"
                onChange={handleChange}
                value={email}
                onBlur={handleBlur}
              />

              <ErrorMessage
                name="email"
                component={() => (
                  <span className="mr-2 w-full text-center  text-sm text-red-400 ">
                    {ErrorEmail}
                  </span>
                )}
              />

              <label
                htmlFor="password"
                className="w-9/12 text-start font-semibold text-black"
              >
                Password
              </label>
              <div className="mb-3 flex w-9/12 items-center justify-between rounded-md border-2 p-1 shadow-sm outline-none placeholder:text-sm ">
                <input
                  className="bg-none outline-none placeholder:text-sm "
                  type={visiblePassword ? "text" : "password"}
                  id="password"
                  onChange={(e) => {
                    handleChange(e);
                    ref.current?.checkPassword(e);
                  }}
                  value={password}
                  name="password"
                  placeholder="Password"
                  onBlur={handleBlur}
                />

                <span
                  onClick={() => setVisiblePassword((prev) => !prev)}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 "
                >
                  {visiblePassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <span className="  text-start  text-sm text-red-400">
                {" "}
                {signInState?.error}
              </span>

              <CheckPassword ref={ref} />
              <div className="mt-5 flex min-w-full justify-between ">
                <div className="flex space-x-1  ">
                  <CheckBox />
                  <span className="text-sm text-black">Recuerdeme</span>
                </div>
                <Link
                  href={"/auth/password/sendEmail"}
                  className="cursor-pointer  text-sm text-lightBlue"
                >
                  ¿Olvidaste la contraseña?
                </Link>
              </div>
              <div className="flex w-full flex-col items-center justify-center">
                <button
                  type="submit"
                  name="submit"
                  value="login"
                  className=" mb-3 flex  items-center rounded-md bg-blue-500 px-4 py-3 text-white  shadow-sm hover:bg-blue-600"
                >
                  <p className="text-sm font-bold">INICIAR SESION</p>
                </button>
                <p className="w-full  cursor-pointer text-center">
                  <Link href={"/auth/signup"} className="text-lightBlue">
                    ¿No tienes cuenta?
                  </Link>{" "}
                  <Link href={"/auth/signup"} className="text-black">
                    Abre cuenta
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>

        <Providers></Providers>
      </div>
    </div>
  );
};

export default LogIn;
