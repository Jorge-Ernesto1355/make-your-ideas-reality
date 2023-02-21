import type { ILogin, ISignUp } from "../signin/interfaces/ILogin";

export const validateSignIn = (values: ILogin) => {
  const { email, password } = values;
  const errors = {} as ILogin;

  if (!email) errors.email = "email requerido";
  if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
    errors.email =
      "el correo solo puede contener letras, numeros, puntos, guiones, guion bajo.";
  }

  if (!password) {
    //validacion contraseña

    errors.password = "introduce una contraseña";
  } else if (
    new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z]|[^ ]){8,20}$/
    ).test(password)
  ) {
    errors.password =
      "Minimo 8 ,caracteres Maximo 15, Al menos una letra mayúscula, Al menos una letra minuscula, Al menos un dígito, No espacios en blanco,  Al menos 1 caracter especial";
  }

  return errors;
};

export const validateSignUp = (values: ISignUp) => {
  const { email, password, username } = values;
  const errors = {} as ISignUp;

  if (!username) {
    errors.username = "introduce un nombre";
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,20}$/.test(username)) {
    errors.username = "el nombre solo puede contener letras y espacios";
  }

  if (!email) errors.email = "email requerido";
  if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
    errors.email =
      "el correo solo puede contener letras, numeros, puntos, guiones, guion bajo.";
  }

  if (!password) {
    //validacion contraseña

    errors.password = "introduce una contraseña";
  } else if (
    new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z]){8,20}$/).test(
      password
    )
  ) {
    errors.password =
      "Minimo 8 ,caracteres Maximo 15, Al menos una letra mayúscula, Al menos una letra minuscula, Al menos un dígito, No espacios en blanco,  Al menos 1 caracter especial";
  }

  return errors;
};
