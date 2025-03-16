import React from "react";
import { TbAlertCircle } from "react-icons/tb";

type Props = {
  error: string;
};

const ErrorAlert = ({ error }: Props) => {
  return (
    <div className="border border-red-500 text-red-500 rounded-lg w-full py-2 px-3">
      <div className="flex items-start space-x-2">
        <TbAlertCircle className="mt-1.5" />
        <div className="flex flex-col">
          <h6 className="font-bold text-lg">Error</h6>
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
