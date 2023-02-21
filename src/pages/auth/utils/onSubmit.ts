import { signIn } from "next-auth/react";
import type { ILogin } from "../signin/interfaces/ILogin";

export const onSubmit = async (values: ILogin) => {
  const { email, password } = values;
  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
};
