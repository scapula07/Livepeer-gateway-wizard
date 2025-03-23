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
  const [isLoading, setLoading] = useState<boolean>(false);
  const [gateways, setGateways] = useState<GATEWAY[]>([]);
  const [gateway, setGateway] = useState<GATEWAY>();

  useEffect(() => {
    gatewayApi
      .getGateways(user?.id)
      .then((res: GATEWAY[]) => {
        setGateways(res);
      })
      .catch();
  }, [user?.id]);

  const createInstance = async () => {
    setLoading(true);
    try {
      const response = await gatewayApi.createInstance(user?.id);
      response?.status && setGateway(response.data);
      response?.status && setLoading(false);
      replace({
        pathname: `/launch-pad/`,
        query: { id: `${response?.data?.id}` },
      });
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-full flex flex-col">
        <h5 className="font-semibold text-xl text-slate-900">Your Gateways</h5>

        <div className="grid grid-cols-3 w-full py-4 gap-4">
          <div
            className={`bg-slate-100 w-full h-28 rounded-sm font-semibold flex flex-col items-center justify-center hover:bg-slate-200 
                     transition duration-300 ease-in-out ${
                       isLoading &&
                       "animate-pulse opacity-75 cursor-not-allowed"
                     }`}
            onClick={() => !isLoading && createInstance()}
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
