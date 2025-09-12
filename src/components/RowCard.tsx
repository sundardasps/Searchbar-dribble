import { rowDetails, statusStates } from "../data";
import moment from "moment";
import { highlightText } from "./HighlightText";
import { Icon } from "../assets/icons";
import { useState } from "react";
import type { RowCardProps, RowType } from "../types";

const findRowIcon = (type: RowType) => rowDetails[type]?.icon || null;

function RowCard({ data, searchQury }: RowCardProps) {
  const IconComponent = findRowIcon(data.type);
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    if (!data.link) return;
    navigator.clipboard
      .writeText(data.link)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(() => alert("Failed to copy link"));
  };

  return (
    <div className="flex items-center gap-2 py-2 group">
      {/* Avatar / Icon */}
      <div className="relative flex justify-center items-center w-8 h-8 bg-gray-100 rounded-md text-gray-500">
        {data.avatar ? (
          <>
            <img
              src={data.avatar}
              alt={data.title}
              className="w-8 h-8 rounded-md border border-gray-400 object-contain"
            />
            {data.status && (
              <div
                className="w-3 h-3 rounded-full absolute -bottom-[2px] -right-[2px] border-2 border-gray-100"
                style={{
                  backgroundColor:
                    statusStates[data.status]?.color || undefined,
                }}
              />
            )}
          </>
        ) : IconComponent ? (
          <IconComponent className="w-4 h-4" />
        ) : (
          <div className="w-8 h-8 rounded-md bg-gray-200" />
        )}
      </div>

      {/* Text Content */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-black tracking-tighter text-xs md:text-lg">
            {highlightText({ text: data.title, query: searchQury })}
          </h1>
          {data.type !== "people" && (data.count && data.count > 0 ) && (
            <div className="flex items-center gap-1 px-1 rounded bg-gray-200 text-[10px] md:text-xs text-gray-400 capitalize">
              <span>{data.count}</span>
              <span>{data.type}</span>
            </div>
          )}
        </div>

        <p className="flex items-center gap-1 text-gray-400 text-[8px] md:text-xs">
          {statusStates[data.status]?.text}
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          {data.type === "people" ? (
            <span>{moment(data.createdAt).fromNow()}</span>
          ) : (
            <span>
              {data.updatedAt
                ? `Edited ${moment(data.updatedAt).fromNow()}`
                : `Added ${moment(data.createdAt).fromNow()}`}
            </span>
          )}
        </p>
      </div>

      {/* Actions */}
      {data.type !== "people" && data.link && (
        <div className="flex items-center text-gray-400 text-[8px] md:text-xs opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-500">
          {copied ? (
            <Icon.mark
              className="w-4 h-4 mr-1 text-green-600 cursor-default opacity-100 scale-110 transition duration-500 ease-in-out"
              title="Copied!"
            />
          ) : (
            <Icon.link
              onClick={handleCopyClick}
              className="w-4 h-4 mr-1 cursor-pointer hover:text-black opacity-100 scale-100 transition duration-500 ease-in-out"
              title="Copy link to clipboard"
            />
          )}

          <div className="flex items-center cursor-pointer hover:text-black">
            <Icon.tab className="w-4 h-4 mr-1" />
            <span className="group-hover:underline-animate">New Tab</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default RowCard;
