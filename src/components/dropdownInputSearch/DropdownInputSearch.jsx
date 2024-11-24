import { Dropdown } from "antd";
import React from "react";
import { useState } from "react";
import InputSearch from "../input/inputSearch/InputSearch";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";
import { congViecService } from "../../services/congViec.service";
import { useMemo } from "react";
import "./../../templates/HomeTemplate/components/headerTemplate.scss";

const DropdownInputSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [value] = useDebounce(keyword, 1000);
  const [listSearch, setListSearch] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value);
  };
  useEffect(() => {
    if (value) {
      congViecService
        .getCongViecTheoTen(value)
        .then((res) => {
          console.log(res);
          setListSearch(res.data.content);
          setOpenDropdown(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [value]);

  const itemListSearch = useMemo(() => {
    return listSearch.slice(0, 4).map((item, index) => {
      return {
        key: item.id,
        label: (
          <div className="flex items-center space-x-4">
            <img src={item.congViec.hinhAnh} className="w-10 h-10" alt="" />
            <div>
              <h4>{item.congViec.tenCongViec}</h4>
              <p>Rating: {item.congViec.danhGia}</p>
            </div>
          </div>
        ),
      };
    });
  }, [listSearch]);
  const handelClickInputSearch = () => {
    setOpenDropdown(true);
  };

  return (
    <Dropdown
      open={openDropdown}
      menu={{
        items: itemListSearch,
        onMouseLeave: () => {
          setOpenDropdown(false);
        },
      }}
      overlayClassName="dropdown-suggest"
    >
      <div className="w-full">
        <InputSearch
          placeholder={"What service are you looking for today?"}
          handleChangeKeyword={handleChangeKeyword}
          value={keyword}
          handelClickInputSearch={handelClickInputSearch}
        />
      </div>
    </Dropdown>
  );
};

export default DropdownInputSearch;
