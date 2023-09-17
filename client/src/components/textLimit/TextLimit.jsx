import React from "react";

export const TextLimit = ({ text, limit }) => {
  const textLimited =
    text.length > limit ? `${text.substring(0, limit)}...` : text;
  return <p>{textLimited}</p>;
};