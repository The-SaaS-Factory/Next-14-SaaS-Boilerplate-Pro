"use client";
import { registerNewUser } from "@/actions/auth/register-new-user";
import { constants } from "@/lib/constants";
import {
  ArrowRightEndOnRectangleIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChangeEvent } from "react";
import { toast } from "sonner";

type LoginInput = {
  email: string;
  password: string;
};
type RegisterInput = {
  name: string;
  password: string;
  email: string;
  businessName: string;
};

import { classNames } from "@/utils/facades/frontendFacades/strFacade";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const tabs = [
  {
    name: "Existing account",
    action: "LOGIN",
    icon: ArrowRightEndOnRectangleIcon,
    current: true,
  },
  {
    name: "Create account",
    action: "REGISTER",
    icon: UserPlusIcon,
    current: false,
  },
];

export default function LoginPage() {
  const [action, setAction] = useState("LOGIN");

  const [isLoading, setLoading] = useState(false);
  const navigate = useRouter();
  const [waitingMessage, setWaitingMessage] = useState<null | string>(null);

  const [inputs, setInputs] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [inputsInSignUp, setInputsInSignUp] = useState<RegisterInput>({
    name: "",
    password: "",
    email: "",
    businessName: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    if (action === "LOGIN") {
      setInputs((values) => ({ ...values, [name]: value }));
    } else {
      setInputsInSignUp((values) => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    if (action === "LOGIN") {
      const result = await signIn("credentials", {
        email: inputs.email,
        password: inputs.password,
        redirect: false,
      });

      setLoading(false);
      if (result.error) {
        console.log(result.error);

        toast.error("Invalid credentials");
        return;
      }
      let lastUrl;
      if (window) {
        lastUrl = window.localStorage.getItem("lastUrl");
        if (lastUrl === "undefined") {
          lastUrl = null;
        }
      } else {
        lastUrl = null;
      }

      track("login_user");

      navigate.push(lastUrl ? lastUrl : "/home");
    } else {
      const payload = {
        name: inputsInSignUp.name,
        password: inputsInSignUp.password,
        email: inputsInSignUp.email,
        businessName: inputsInSignUp.businessName,
      };

      await registerNewUser(payload)
        .then(async () => {
          const result = await signIn("credentials", {
            email: inputsInSignUp.email,
            password: inputsInSignUp.password,
            redirect: false,
          });

          toast.success("Registro completo");

          track("register_new_user");

          setLoading(false);
          if (result.error) {
            toast.error(
              "Credenciais inválidas ou registro pendente de aprovação",
            );
            return;
          }

          window.location.replace("/home");
        })
        .catch((e) => {
          toast.error(e.message);
        });

      setLoading(false);
    }
  };
  return (
    <>
      <div className=" flex gradient flex-col space-y-3 items-center justify-center min-h-screen g-main px-4 lg:px-8">
        <Link href="/" className="-mt-7 mb-4 lg:mt-0">
          <Image
            src={constants.logoUrl}
            width={80}
            height={80}
            alt={constants.appName}
          />
        </Link>
        <div className="w-full mt-7 z-10 max-w-md px-3 lg:px-8 py-8 bg-white rounded-lg shadow-lg lg:w-1/3">
          <div className="">
            <div className="sm:block border-b border-gray-200">
              <nav
                aria-label="Tabs"
                className="flex space-x-8 mx-auto justify-center"
              >
                {tabs.map((tab, index) => (
                  <button
                    key={tab.name}
                    onClick={() => setAction(tab.action)}
                    className={classNames(
                      tab.action === action
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent  text-primary hover:border-gray-300 hover:text-gray-700",
                      "group relative inline-flex items-center border-b-2 px-4 py-2 text-sm  font-medium",
                    )}
                  >
                    <tab.icon
                      aria-hidden="true"
                      className={classNames(
                        tab.action === action
                          ? "text-indigo-500"
                          : "text-gray-400 group-hover: text",
                        "h-5 w-5 mr-2 hidden lg:flex ",
                      )}
                    />
                    {tab.name}
                    {index === 1 && (
                      <Badge className="-mt-6 -mr-3 bg-green-700 animate-pulse absolute right-2 top-1">
                        {" "}
                        Free Plan{" "}
                      </Badge>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {waitingMessage && (
              <div className="flex items-center justify-between bg-yellow-400 text-black px-4 py-2 rounded-md">
                <p className="text-sm font-semibold">{waitingMessage}</p>
                <button onClick={() => setWaitingMessage(null)}>
                  <XMarkIcon className="w-5 h-5 text-white" />
                </button>
              </div>
            )}

            <div>
              {action === "LOGIN" ? (
                <>
                  <h2 className="text-2xl font-bold text-primary mt-6 text-center">
                    Login to {constants.appName}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="text"
                        required
                        className="input-text mt-1"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="input-text mt-1"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <Button type="submit" className="w-full ">
                        {isLoading ? "Accessing..." : "Login"}
                      </Button>
                    </div>
                  </form>

                  <hr className="my-7" />
                  <div className=" flex   justify-center my-3">
                    <button
                      onClick={() => signIn("google")}
                      className="flex gap-0.5 bg-neutral-100 text-neutral-800 text-sm font-bold rounded-xl px-4 py-3 hover:text-white hover:bg-[#4285F4] transition-all"
                    >
                      <svg
                        className="w-5 h-5 mr-2 fill-current"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Google</title>
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                      </svg>
                      Sign-in with Google
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-primary mt-6">
                    Create a new account
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mt-1 text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="input-text mt-1"
                        onChange={handleChange}
                      />
                    </div>{" "}
                    <div>
                      <label
                        htmlFor="name"
                        className="block mt-1 text-sm font-medium text-gray-700"
                      >
                        {constants.tanantModelName} name
                      </label>
                      <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        required
                        className="input-text mt-1"
                        onChange={handleChange}
                      />
                    </div>{" "}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm   font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="input-text  "
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="input-text mt-1"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Button type="submit" className="w-full ">
                        {isLoading ? "Sending..." : "Register"}
                      </Button>
                    </div>
                  </form>
                  <hr className="my-7" />
                  <div className="flex  justify-center  my-3">
                    <button
                      onClick={() => signIn("google")}
                      className="flex gap-0.5 bg-neutral-100 text-neutral-800 text-sm font-bold rounded-xl px-4 py-3 hover:text-white hover:bg-[#4285F4] transition-all"
                    >
                      <svg
                        className="w-5 h-5 mr-2 fill-current"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Google</title>
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                      </svg>
                      Sign-up with Google
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
