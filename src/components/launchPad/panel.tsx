import { Fragment } from "react";

export default function Panel({ next }: { next: Number }) {
  return (
    <div className="flex md:flex-col flex-row md:px-10 px-5 items-center md:items-start md:space-y-4">
      {[
        {
          label: "Step 1",
          desc: "Select stack",
          value: 1,
        },
        {
          label: "Step 2",
          desc: "Specify details and configure options",
          value: 2,
        },
        {
          label: "Step 3",
          desc: "Launch",
          value: 3,
        },
      ].map((tab, index) => {
        return (
          <Fragment key={index}>
            <div className="flex flex-col self-start space-y-1">
              <h5 className="text-xs text-slate-500">{tab?.label}</h5>
              <h5
                className={`
                      ${
                        next === tab?.value ? "text-black" : "text-slate-500"
                      } md:text-sm text-[13px] font-semibold`}
              >
                {tab?.desc}
              </h5>
            </div>
            {tab?.desc != "Launch" && (
              <hr className="md:w-3/5 w-1/5 md:rotate-0 rotate-90"></hr>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
