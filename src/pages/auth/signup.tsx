import React, { FormEvent, useState } from "react";
import Header from "@/components/landingpage/header";
import { authApi } from "@/firebase/auth";
import { useRouter } from "next/router";
import { getFirebaseErrorMessage } from "@/lib/utils/firebase-error-handler";
import ErrorAlert from "@/components/ui/error-alert";

export default function Signup() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [cred, setCred] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

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
        const response = await authApi.register(cred?.email, cred?.password);
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(response));
        response && setLoading(false);
        replace("/gateways");
      } catch (error: any) {
        setLoading(false);
        setError(getFirebaseErrorMessage(error));
      }
    }
  };

  return (
    <div className="w-full h-full font-mono  bg-[#A3B18A]">
      <Header />
      <div className="w-full flex h-screen md:py-20 py-5 md:px-0 px-5">
        <div className="flex flex-col items-center pt-5 md:pt-0 w-full md:space-y-5 space-y-3">
          <h5 className="text-3xl font-semibold">Register</h5>

          <form
            onSubmit={submit}
            className="md:w-1/2 w-full shadow-lg py-10 md:px-8 px-5 space-y-8 bg-white"
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

            <div className="w-full flex items-start space-x-2">
              <input className="outline-green-400 mt-1" type={"checkbox"} />
              <h5 className="font-semibold text-gray-600 md:text-base text-sm">
                I want to receive updates about products and promotions.
              </h5>
            </div>

            <div className="">
              <button
                type="submit"
                className={`bg-green-500 px-4 text-sm rounded-sm font-semibold py-2 transition duration-300 ease-in-out ${
                  isLoading ? "animate-pulse opacity-75 cursor-not-allowed" : ""
                }`}
                onClick={submit}
                disabled={isLoading}
              >
                Register
              </button>
            </div>

            <h5 className="font-semibold text-sm  text-blue-500">
              Already have an account?{" "}
              <span
                className="text-green-600 cursor-pointer hover:text-black"
                onClick={() => replace("/auth/login")}
              >
                Login
              </span>
            </h5>
          </form>
        </div>
      </div>
    </div>
  );
}
