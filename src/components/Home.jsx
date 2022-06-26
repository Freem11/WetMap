import React from "react";

export default function Home({ children }) {
  return (
    <h2>
      Welcome to the Scuba Dive App
      {children}
    </h2>
  );
}
