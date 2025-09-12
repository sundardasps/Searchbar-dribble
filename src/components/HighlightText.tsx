import React from "react";

interface FuncTypes {
  text: string;
  query: string;
}

export const highlightText = ({ text, query }: FuncTypes): React.ReactNode => {
  if (!query) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  const matchIndex = lowerText.indexOf(lowerQuery);

  if (matchIndex === -1) return text;

  const before = text.slice(0, matchIndex);
  const match = text.slice(matchIndex, matchIndex + query.length);
  const after = text.slice(matchIndex + query.length);

  return (
    <>
      {before}
      <mark className="bg-orange-100 text-black  px-0.5 ">{match}</mark>
      {after}
    </>
  );
};
