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
  username: string;
  email: string;
  businessName: string;
  businessAddress: string;
  bussinessPhone: string;
};

import { classNames } from "@/utils/facades/serverFacades/strFacade";
import { track } from "@vercel/analytics";

const tabs = [
  {
    name: "Cuenta existente",
    action: "LOGIN",
    icon: ArrowRightEndOnRectangleIcon,
    current: true,
  },
  {
    name: "Crear cuenta",
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
    username: "",
    businessName: "",
    businessAddress: "",
    bussinessPhone: "",
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

        toast.error(
          "Credenciales no válidas o registro pendiente de aprobación"
        );
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
              "Credenciais inválidas ou registro pendente de aprovação"
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
      <div className="flex items-center justify-center min-h-screen g-main px-8">
        <div className="w-full z-10 max-w-md px-8 py-8 bg-white rounded-lg shadow-lg lg:w-1/3">
          <div className="">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                defaultValue={tabs.find((tab) => tab.current).name}
                className="block w-full p-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>

            <div className="hidden sm:block border-b border-gray-200">
              <nav aria-label="Tabs" className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setAction(tab.action)}
                    className={classNames(
                      tab.action === action
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "group inline-flex items-center border-b-2 px-4 py-2 text-sm font-medium"
                    )}
                  >
                    <tab.icon
                      aria-hidden="true"
                      className={classNames(
                        tab.action === action
                          ? "text-indigo-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "h-5 w-5 mr-2"
                      )}
                    />
                    {tab.name}
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
                  <h2 className="text-2xl font-bold text-gray-900 mt-6 text-center">
                    Accede a {constants.appName}
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
                        Contraseña
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
                      <button type="submit" className="w-full btn-main">
                        {isLoading ? "Acessando..." : "Entrar"}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mt-6">
                    Crea una nueva cuenta
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mt-1 text-sm font-medium text-gray-700"
                      >
                        Nombre
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
                        Contraseña
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
                      <button type="submit" className="w-full btn-main">
                        {isLoading ? "Enviando..." : "Registrarme"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
