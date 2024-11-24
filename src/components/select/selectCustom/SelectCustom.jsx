import { Select } from "antd";
import React from "react";

const SelectCustom = ({ labelContent, options, mode, handleChange }) => {
  return (
    <div>
      <label className="font-bold mb-1 block" htmlFor="">
        {labelContent}
      </label>
      <Select
        mode={mode && mode}
        className="w-full"
        options={options}
        onChange={handleChange}
      />
    </div>
  );
};

export default SelectCustom;
