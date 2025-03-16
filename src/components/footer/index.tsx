import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="w-full flex flex-col items-center pt-5 pb-4 px-10 bg-[#344E41] text-white">
      <div className="w-full justify-between flex py-7">
        {[
          {
            label: "Quick Links",
            links: [
              {
                text: "About GWID",
              },
              {
                text: "About Livepeer.org",
              },
              {
                text: "Blog",
              },
              {
                text: "Livepeer Discord",
              },
            ],
          },
          {
            label: "Contact",
            links: [
              {
                text: "hello@gwid.io",
              },
            ],
          },
        ]?.map((item, index) => {
          return (
            <div className="flex flex-col space-y-10" key={index}>
              <h5 className="font-semibold">{item?.label}</h5>
              <div className="flex flex-col">
                {item?.links?.map((link, index) => {
                  return (
                    <h5 key={index} className="text-white text-sm">
                      {link?.text}
                    </h5>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full flex border-t justify-between py-6">
        <div></div>
        <div className="flex items-center space-x-3">
          <FaGithub className="text-2xl" />
          <FaLinkedin className="text-2xl" />
        </div>
      </div>
    </div>
  );
}
