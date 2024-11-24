import React from "react";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";

const DropdownHeader = ({ buttonContent = "Fiverr Pro" }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown
      //menu={{items: [key: ""]}} => thuộc tính menu nhận vào thuộc tính con items là 1 Mảng [] chứa nội dung của dropdown
      //trigger={["click" | "hover" | "contextMenu"]} => thuộc tính trigger xác định hành vi của người dùng khi muốn mở Dropdown
      // Thuộc tính open: xác định khi nào đóng và mở Dropdown
      menu={{ items: [{ label: "Item 1" }] }}
      trigger={["click"]}
      open={open}
    >
      <button
        //Tạo SK onClick cho thẻ Button: khi user click vào state open sẽ đảo giá trị => xác định việc đóng mở Dropdown thông qua thao tác click
        onClick={() => {
          setOpen(!open);
        }}
        className="text-base font-semibold capitalize py-2 px-4 hover:bg-[#F5F5F5] duration-300 rounded-lg"
      >
        {buttonContent}
        <span className="ml-2">
          <DownOutlined
            className={`${
              open ? "rotate-180" : "rotate-0"
            } duration-300 text-xs text-[#7A7B82]`}
          />
        </span>
      </button>
    </Dropdown>
  );
};

export default DropdownHeader;
