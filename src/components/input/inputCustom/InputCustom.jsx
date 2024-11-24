import { Input } from "antd";
import React from "react";

const InputCustom = ({
  labelContent,
  placeholder,
  type = "text",
  name,
  id,
  handleChange,
  value,
  handleBlur,
  touched,
  errors,
}) => {
  return (
    <div>
      <label className="font-bold mb-1 inline-block" htmlFor={id}>
        {labelContent}
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={handleChange}
        value={value}
        onBlur={handleBlur}
      />
      {touched && errors ? <p className="text-red-500 mt-1">{errors}</p> : null}
    </div>
  );
};

export default InputCustom;
