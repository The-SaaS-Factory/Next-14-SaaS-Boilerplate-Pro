"use client";
import React from "react";
import ButtonFunction from "../componenets/ButtonFunction";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "../button";
type Btn = {
  name: string;
  href?: string;
  type?: "primary" | "secundary";
  icon?: React.ElementType | null;
  fn?: any;
};

type BreadcrumbItem = {
  name: string;
  href: string;
};

type PageNameProps = {
  name: string;
  btn1?: Btn;
  breadcrumbs?: BreadcrumbItem[];
  btn2?: Btn;
  isSubPage?: boolean;
  description?: string;
  children?: React.ReactNode;
};

const PageName = ({
  name,
  btn1,
  btn2,
  description,
  children,
  breadcrumbs,
}: PageNameProps) => {
  return (
    <>
      <div className="z-50 pb-5 sm:flex sm:items-center sm:justify-between">
        <div className="flex w-full flex-col space-y-1">
          <nav className="-ml-3 sm:flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-3">
              {breadcrumbs?.map((item, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    {index > 0 && (
                      <ChevronRightIcon
                        className="text-primary h-5 w-5 flex-shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <Link
                      href={item.href}
                      className="text-primary ml-4 truncate text-sm lg:hidden"
                    >
                      {item.name.length > 14
                        ? item.name.substring(0, 14) + "..."
                        : item.name}
                    </Link>
                    <Link
                      href={item.href}
                      className="text-primary ml-4 hidden truncate text-sm lg:flex"
                    >
                      {item.name}
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
          <h3 className="text-subtitle mt-8">{name}</h3>
          <p>{description}</p>
        </div>
        <div className="mt-3 flex w-full items-end justify-end space-x-3 sm:ml-4 sm:mt-0">
          {children ? (
            children
          ) : (
            <div>
              {btn1 &&
                (btn1.fn ? (
                  <btn1.fn />
                ) : (
                  <Link href={btn1.href as string}>
                    {" "}
                    <Button>
                      {btn1.icon &&
                        React.createElement(btn1.icon, {
                          className: "h-5 w-5 text-primary",
                          "aria-hidden": "true",
                        })}
                      <span>{btn1.name}</span>
                    </Button>
                  </Link>
                ))}
              {btn2 &&
                (btn2.fn ? (
                  <ButtonFunction
                    btn={{
                      name: btn2.name,
                      icon: btn2.icon,
                      type: btn2.type,
                      fn: btn2.fn,
                    }}
                  />
                ) : (
                  <Link href={btn2.href as string}>
                    <Button>
                      {" "}
                      {btn2.icon &&
                        React.createElement(btn2.icon, {
                          className: "h-5 w-5 text-primary",
                          "aria-hidden": "true",
                        })}
                      <span>{btn2.name}</span>
                    </Button>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>

      {/*     
      <div className="-mt-3">
        <div className="flex justify-between">
        
          <div className="flex space-x-3 items-center">
            {btn1 &&
              (btn1.fn ? (
                <ButtonFunction
                  btn={{
                    name: btn1.name,
                    icon: btn1.icon,
                    fn: btn1.fn,
                  }}
                />
              ) : (
                <Link href={btn1.href as string} className="btn-icon ">
                  {" "}
                  {btn1.icon &&
                    React.createElement(btn1.icon, {
                      className: "h-5 w-5 text-primary",
                      "aria-hidden": "true",
                    })}
                  <span>{btn1.name}</span>
                </Link>
              ))}

            {btn2 && btn2}
          </div>
        </div>
        <hr className="mb-1" />
      </div> */}
    </>
  );
};

export default PageName;
