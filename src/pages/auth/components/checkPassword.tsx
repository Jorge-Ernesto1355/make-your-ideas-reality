/* eslint-disable react/display-name */
import { BsFillRecordCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import React, { useState, useImperativeHandle, forwardRef } from "react";

interface Props {
  className?: string;
}

const CheckPassword = forwardRef(({ className }: Props, ref) => {
  const [isValidLower, setIsValidLower] = useState<boolean>(false);
  const [isValidUpper, setIsValidUpper] = useState<boolean>(false);
  const [isValidNumber, setIsValidNumber] = useState<boolean>(false);
  const [isValidLength, setIsValidLength] = useState<boolean>(false);
  const [isFocusPassword, setIsFocusPasword] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        checkPassword,
      };
    },
    []
  );

  const checkPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const length = new RegExp("(?=.{8,})");

    if (value) {
      setIsFocusPasword(true);
    }

    if (!value) setIsFocusPasword(false);

    if (
      lower.test(value) &&
      upper.test(value) &&
      number.test(value) &&
      length.test(value)
    ) {
      setIsFocusPasword(false);
    }

    if (lower.test(value)) {
      setIsValidLower(true);
    } else {
      setIsValidLower(false);
    }

    if (upper.test(value)) {
      setIsValidUpper(true);
    } else {
      setIsValidUpper(false);
    }
    if (number.test(value)) {
      setIsValidNumber(true);
    } else {
      setIsValidNumber(false);
    }
    if (length.test(value)) {
      setIsValidLength(true);
    } else {
      setIsValidLength(false);
    }
  };
  return (
    <div
      className={`absolute top-32 ${
        isFocusPassword ? "" : "hidden"
      } rounded-md   bg-gray-500 p-4 text-white shadow-lg ${
        className ? className : ""
      }`}
    >
      <ul className="text-sm ">
        <li className="flex items-center justify-start space-x-2" id="lower">
          {isValidLower ? (
            <BsFillCheckCircleFill />
          ) : (
            <BsFillRecordCircleFill />
          )}
          <span>Al menos una letra minuscula</span>
        </li>
        <li className="flex items-center justify-center space-x-2" id="upper">
          {isValidUpper ? (
            <BsFillCheckCircleFill />
          ) : (
            <BsFillRecordCircleFill />
          )}
          <span>Al Menos una letra mayuscula</span>
        </li>
        <li className="flex items-center justify-start  space-x-2" id="number">
          {isValidNumber ? (
            <BsFillCheckCircleFill />
          ) : (
            <BsFillRecordCircleFill />
          )}
          <span> Al Menos un numero</span>
        </li>

        <li className="flex items-center justify-start space-x-2" id="length">
          {isValidLength ? (
            <BsFillCheckCircleFill />
          ) : (
            <BsFillRecordCircleFill />
          )}
          <span>Al Menos una 8 caracteres</span>
        </li>
      </ul>
    </div>
  );
});

export default CheckPassword;
