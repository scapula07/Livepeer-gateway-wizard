"use client";
import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/router";
import { gatewayApi } from "@/firebase/gateway";
import { useRecoilValue } from "recoil";
import { userStore } from "@/recoil";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import Modal from "../modal";

type GATEWAY = {
  id: string;
  creator: string;
  createdAt: string;
  title: string;
  cover: string;
};

export default function Projects() {
  const { replace } = useRouter();
  const user = useRecoilValue(userStore) as { id: string };
  const [gateways, setGateways] = useState<GATEWAY[]>([]);

  useEffect(() => {
    gatewayApi
      .getGateways(user?.id)
      .then((res: GATEWAY[]) => {
        setGateways(res);
      })
      .catch();
  }, [user?.id]);

  const createInstance = () => {
    replace("/launch-pad/");
  };
  return (
    <>
      <div className="w-full flex flex-col px-4">
        <h5 className="font-semibold text-xl text-slate-900">Your Gateways</h5>

        <div className="grid md:grid-cols-3 grid-cols-1 w-full py-4 gap-4">
          <div
            className={`bg-slate-100 w-full h-28 rounded-sm font-semibold flex flex-col items-center justify-center hover:bg-slate-200 cursor-pointer transition duration-300 ease-in-out`}
            onClick={createInstance}
          >
            <h5>Launch</h5>
            <h5 className="text-sm ">A New Gateway</h5>
          </div>
          {gateways?.map((item, index) => {
            return (
              <Link key={index} href={`/gateways/${item?.id}/dashboard`}>
                <div className="w-full bg-slate-400  py-4 px-4 h-28">
                  <div className=" ">
                    <h5 className="font-bold">{item?.title}</h5>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
