import React from "react";
import "./inputSearch.scss";
import { Input } from "antd";

const InputSearch = ({
  placeholder,
  handleChangeKeyword,
  value,
  handelClickInputSearch,
}) => {
  return (
    <Input.Search
      className="input_search"
      placeholder={placeholder}
      onChange={handleChangeKeyword}
      value={value}
      onClick={handelClickInputSearch}
    />
  );
};

export default InputSearch;
