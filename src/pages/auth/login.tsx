import React, { FormEvent, useEffect, useState } from "react";
import Header from "@/components/landingpage/header";
import { authApi } from "@/firebase/auth";
import { useRouter } from "next/router";
import { getFirebaseErrorMessage } from "@/lib/utils/firebase-error-handler";
import ErrorAlert from "@/components/ui/error-alert";
import { useUser } from "@/hooks/useUser";
import { AuthResponse } from "@/lib/types/auth.type";

export default function Signup() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [cred, setCred] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const { addUser } = useUser();

  const { replace } = useRouter();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!cred?.email || !cred?.password) {
      setError("Please fill all fields");
      return;
    } else {
      setLoading(true);
      setError("");
      try {
        const response = await authApi.login(cred?.email, cred?.password);
        addUser(response as AuthResponse);
        if (rememberMe) {
          localStorage.setItem("gwid-email", cred.email);
        } else {
          localStorage.removeItem("gwid-email");
        }
        response && setLoading(false);
        replace("/gateways");
      } catch (error: any) {
        setLoading(false);
        setError(getFirebaseErrorMessage(error));
      }
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("gwid-email");
    if (savedEmail) {
      setCred((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="w-full h-full font-mono  bg-[#A3B18A]">
      <Header />
      <div className="w-full flex h-screen justify-center py-20 items-center">
        <div className="flex flex-col items-center w-full space-y-5">
          <h5 className="text-3xl font-semibold">Login</h5>

          <form
            onSubmit={submit}
            className="w-1/2 shadow-lg py-10 px-8 space-y-8 bg-white"
          >
            {error && <ErrorAlert error={error} />}

            {[
              {
                label: "Email address",
                text: "",
                val: cred?.email,
                placeholder: "...@gmail.com",
                addCred: (input: string) => setCred({ ...cred, email: input }),
              },
              {
                label: "Password",
                text: "",
                val: cred?.password,
                placeholder: "",
                addCred: (input: string) =>
                  setCred({ ...cred, password: input }),
              },
            ].map((item, index) => {
              return (
                <div className="flex flex-col space-y-3" key={index}>
                  <label>
                    {item?.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="border-b w-full outline-green-300 py-3 px-3"
                    type={item?.label === "Password" ? "password" : "text"}
                    value={item?.val}
                    placeholder={item?.placeholder}
                    onChange={(e) => item?.addCred(e.target.value)}
                  />
                </div>
              );
            })}

            <div className="w-full flex space-x-2">
              <button
                type="submit"
                className={`bg-green-500 px-4 text-sm rounded-sm font-semibold py-2 transition duration-300 ease-in-out ${
                  isLoading ? "animate-pulse opacity-75 cursor-not-allowed" : ""
                }`}
                onClick={submit}
                disabled={isLoading}
              >
                Login
              </button>

              <div className="w-full flex items-center space-x-2">
                <input
                  className="outline-green-400 "
                  type={"checkbox"}
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe((prev) => !prev)}
                />
                <label
                  htmlFor="rememberMe"
                  className="font-semibold text-gray-600"
                >
                  {" "}
                  Remember me
                </label>
              </div>
            </div>

            <h5 className="font-semibold text-sm  text-blue-500">
              Lost your password?
            </h5>

            <h5 className="font-semibold text-sm  text-blue-500">
              Don't have an account?{" "}
              <span
                className="text-green-600 cursor-pointer hover:text-black"
                onClick={() => replace("/auth/signup")}
              >
                {" "}
                Sign up
              </span>
            </h5>
          </form>
        </div>
      </div>
    </div>
  );
}
