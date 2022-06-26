import React, { useState } from "react";

const Searchbar = ({ setSearchItem }) => {
  const [params, setParams] = useState("");
  const search = (e) => {
    e.preventDefault();
    console.log(params);
    setSearchItem(params);
  };
  return (
    <div className="search--bar">
      <form onSubmit={search}>
        <input
          type="text"
          id="header-search"
          placeholder="Search animals"
          value={params}
          onChange={() => setParams(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Searchbar;
