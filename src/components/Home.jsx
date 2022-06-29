import React from "react";

export default function Home({ children }) {
  return (
    <h2 style={{fontFamily: "fantasy"}}>
      DiveGo
      {children}
    </h2>
  );
}
