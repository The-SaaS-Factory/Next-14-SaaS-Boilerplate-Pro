"use client";
/* eslint-disable no-empty-pattern */

import React from "react";
import { useFormStatus } from "react-dom";
interface BtnParams {
  btn: {
    name: string;
    type?: string;
    icon: any;
    fn: () => void;
  };
}

const ButtonFunction = ({ btn }: BtnParams) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="button"
      onClick={() => btn.fn()}
      className={`${
        btn.type === "primary" ? "btn-main" : "btn-main-secundary"
      }`}
    >
      {" "}
      {btn.icon &&
        React.createElement(btn.icon, {
          className: "h-5 w-5  ",
          "aria-hidden": "true",
        })}
      <span>{btn.name}</span>
      {pending && <span className="animate-pulse">...</span>}
    </button>
  );
};

export default ButtonFunction;
