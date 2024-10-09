"use client";
/* eslint-disable no-empty-pattern */

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../button";
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
    <Button type="button" onClick={() => btn.fn()}>
      {" "}
      {btn.icon &&
        React.createElement(btn.icon, {
          className: "h-5 w-5  ",
          "aria-hidden": "true",
        })}
      <span>{btn.name}</span>
      {pending && <span className="animate-pulse">...</span>}
    </Button>
  );
};

export default ButtonFunction;
