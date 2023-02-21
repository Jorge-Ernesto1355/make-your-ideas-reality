import { useState, useRef, useCallback } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { Formik, Form, ErrorMessage } from "formik";

import Providers from "../components/Providers";

import CheckPassword from "../components/checkPassword";
import { InitialValuesSignup } from "../utils/InitialValues";
import { validateSignUp } from "../utils/validateForm";
import { api } from "../../../utils/api";
import type { ISignUp } from "../../../server/api/validation/auth";
import { ButtonLoader } from "../components/ButtonLoading";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const SignUp = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const router = useRouter();

  const ref = useRef<{
    checkPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }>(null);

  const notify = useCallback((text: string) => {
    toast.error(text);
  }, []);

  const { mutateAsync, isLoading } = api.auth.signUp.useMutation({
    onError: (e) => {
      notify(e.message);
    },
  });

  const onSubmit = useCallback(
    async (data: ISignUp) => {
      const result = await mutateAsync(data);

      if (result.status === 201) {
        await router.push("/auth/signin");
      }
    },
    [mutateAsync, router]
  );

  return (
    <div className="bg-white-700 grid h-screen w-screen place-content-center">
      <div className="bg-white-100 relative h-max  w-[400px] rounded-md shadow-xl ">
        <i className="absolute    -left-4 h-12 w-96 rounded-full rounded-bl-none bg-blue-400 before:absolute before:top-[48px]  before:z-20 before:h-8 before:w-5 before:rounded-l-full before:bg-blue-500 before:content-[''] after:absolute after:top-9 after:h-7 after:w-4 after:bg-blue-400   after:content-['']" />
        <p className="absolute top-3 left-[90px]   text-2xl font-bold text-white">
          {" "}
          INICIAR SESION
        </p>
        <br />
        <br />
        <br />
        <br />

        <div className="flex w-full justify-end   space-x-2 px-4 text-sm font-medium text-black ">
          <span className="text-gray-400">has tus ideas realidad</span>
          <AiOutlineInfoCircle size={"1.25rem"} />
        </div>
        <Formik
          initialValues={InitialValuesSignup}
          onSubmit={onSubmit}
          validate={validateSignUp}
        >
          {({
            handleChange,
            handleBlur,
            values: { email, password, username },
            errors: { email: ErrorEmail, username: usernameError },
          }) => (
            <Form className="relative my-2 flex w-full flex-col items-center justify-center space-y-3 px-5">
              <div className="flex w-full flex-col items-center justify-center">
                <input
                  className={`w-9/12 rounded-md border-2  p-1 shadow-sm outline-none placeholder:text-sm ${
                    usernameError
                      ? "border-red-300 placeholder:text-red-300"
                      : ""
                  } `}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Nombre"
                  onChange={handleChange}
                  value={username}
                  onBlur={handleBlur}
                />
                <span className="text-start text-sm text-red-400">
                  {usernameError}
                </span>
              </div>

              <input
                className={`w-9/12 rounded-md border-2 p-1 shadow-sm outline-none placeholder:text-sm ${
                  ErrorEmail ? "border-red-400 placeholder:text-red-400 " : ""
                }`}
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
                  <span className="ml-8  text-start  text-sm text-red-400 ">
                    {ErrorEmail}
                  </span>
                )}
              />

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

              <CheckPassword ref={ref} />

              <div className="flex w-full flex-col items-center justify-center">
                {isLoading ? (
                  <ButtonLoader />
                ) : (
                  <>
                    {" "}
                    <button
                      type="submit"
                      name="submit"
                      value="login"
                      className=" mb-3 flex  items-center rounded-md bg-blue-500 px-5 py-3 text-white  shadow-sm hover:bg-blue-600"
                    >
                      <p className="text-sm font-bold">Registrarse</p>
                    </button>
                  </>
                )}

                <p className="w-full  cursor-pointer text-center">
                  <Link href={"/auth/signin"} className="text-lightBlue">
                    ¿Ya tienes una cuenta?
                  </Link>
                  <Link href={"/auth/signin"} className="ml-2 text-black">
                    inica sesion{" "}
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>

        <Providers></Providers>
      </div>
      <Toaster />
    </div>
  );
};

export default SignUp;
