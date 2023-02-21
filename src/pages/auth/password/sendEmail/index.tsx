import { ErrorMessage, Form, Formik } from "formik";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { api } from "../../../../utils/api";
import { ButtonLoader } from "../../components/ButtonLoading";
import Toster, { toast, Toaster } from "react-hot-toast";

const SendEmail = () => {
  const {
    mutateAsync: sendEmail,
    error,
    isLoading,
  } = api.auth.sendEmail.useMutation({
    onSuccess: () => {
      toast.success("se ha enviado el correo");
    },
  });

  const onSubmit = async (values: { email: string }) => {
    const { email } = values;
    console.log(email);

    const result = await sendEmail({
      email,
    });

    console.log(result);
  };

  const validate = (values: { email: string }) => {
    const { email } = values;
    const errors: { email: string } = {} as { email: string };

    if (!email) errors.email = "introduce un correo";
    if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
      errors.email =
        "el correo solo puede contener letras, numeros, puntos, guiones, guion bajo.";
    }
    return errors;
  };

  return (
    <div className="bg-white-700 grid h-screen w-screen place-content-center">
      <div className="relative flex h-96  w-96 flex-col items-center rounded-lg bg-white p-3 shadow-lg">
        <i className="absolute top-4 -left-5 h-12 w-96 rounded-full rounded-bl-none bg-blue-400 before:absolute before:top-[48px]  before:z-20 before:h-8 before:w-5 before:rounded-l-full before:bg-blue-500 before:content-[''] after:absolute after:top-9 after:h-7 after:w-4 after:bg-blue-400   after:content-['']" />
        <Link href={"/auth/signin"}>
          <FiArrowLeft
            className="absolute left-2 top-6 z-10 cursor-pointer"
            size={"2rem"}
            color="#fff"
          />
        </Link>
        <p className="absolute right-28 top-6 z-10  text-2xl font-bold text-white">
          Envia tu correo
        </p>
        <br />
        <br />
        <br />

        <p className="font-medium text-black">
          envianos tu correo verificado para que sea posible cambiar la
          contraseña
        </p>

        <Formik
          initialValues={{ email: "" }}
          validate={validate}
          onSubmit={onSubmit}
          className="flex flex-col items-center"
        >
          {({
            handleBlur,
            handleChange,
            values: { email },
            errors: { email: ErrorEmail },
          }) => (
            <Form className="flex flex-col items-center">
              <input
                type="text"
                placeholder="correo"
                value={email}
                name="email"
                id="email"
                onBlur={handleBlur}
                onChange={handleChange}
                className={`mt-9 rounded-md  border-2 p-2 font-medium shadow-sm outline-none placeholder:text-sm  text-black${
                  ErrorEmail ? "border-red-300" : ""
                } ${error?.message ? "border-red-300" : ""}`}
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <span className="ml-16 text-sm font-normal text-red-400">
                    {ErrorEmail}
                  </span>
                )}
              />
              <span className="text-center text-sm font-normal text-red-400">
                {error?.message}
              </span>

              {isLoading ? (
                <ButtonLoader className="mt-8" />
              ) : (
                <>
                  {" "}
                  <button
                    type="submit"
                    name="submit"
                    value="login"
                    className=" mt-3 flex  items-center rounded-md bg-blue-500 px-5 py-3 text-white  shadow-sm hover:bg-blue-600"
                  >
                    <p className="text-sm font-bold">Enviar Email</p>
                  </button>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
      <Toaster />
    </div>
  );
};
export default SendEmail;
