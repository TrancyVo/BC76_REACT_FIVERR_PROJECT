import React from "react";
import Icons from "../../../components/Icons";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import { Dropdown } from "antd";
import DropdownHeader from "../../../components/dropdown/DropdownHeader";
import {
  ButtonGhost,
  ButtonOutline,
} from "../../../components/button/ButtonCustom";
import { GlobalOutlined, SmileOutlined } from "@ant-design/icons";
import InputSearch from "../../../components/input/inputSearch/InputSearch";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { congViecService } from "../../../services/congViec.service";
import { useDebounce } from "use-debounce";
import { useMemo } from "react";
import "./headerTemplate.scss";
import DropdownInputSearch from "../../../components/dropdownInputSearch/DropdownInputSearch";

const HeaderTemplate = () => {
  // Chuyển hướng:
  const navigate = useNavigate();
  // Gọi state trong Redux store (tate đại diện cho reducer trong store trong file configStore.js)
  const { user } = useSelector((state) => {
    return state.userSlice;
  });
  // B1: Set state lưu trữ value trên inputSearch tìm kiếm
  const [keyword, setKeyword] = useState("");
  /* PROBLEM: kw dài -> callAPI nhiều, nhiều user tìm kiếm cùng lúc, trong 1s sẽ có rất nhiều request gửi lên server -> server quá tải ảnh hưởng đến performance của trang web)
   SOLUTION: user nhập xong kw, sau đó 1s -> call API 
   useDebounce() thay vì call API liền thì sẽ chờ dữ liệu được nhập xong ...giây mới đi call API
   Search: useDebounce npm => website: https://www.npmjs.com/package/use-debounce => Terminal: npm i use-debounce */
  // B3: Set useDebounce() để lấy data sau khi user nhập xong 1s -> call API
  const [value] = useDebounce(keyword, 1000);
  // B5: Tạo state lưu trữ data của API getCongViecTheoTen trả về
  const [listSearch, setListSearch] = useState([]);
  // B6: Tạo state lưu trữ data TRUE/FALSE quản lý trạng thái đóng/mở của thuộc tính open={} trong <Dropdown open={openDropdown} menu={{ items: itemListSearch }}>
  const [openDropdown, setOpenDropdown] = useState(false);

  // B2: Lấy data được nhập trên inputSearch set vào state keyword
  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value);
  };

  // B4: Dựa vào data keyword (lúc này là biến value) mà user nhập vào inputSearch sau 1s để tìm kiếm job => call API để trả về dữ liệu list các công việc theo keyword (VD: design, dev,...)
  // Lưu ý: mỗi lần dependency [keyword] thay đổi thì useEffect() chạy lại 1 lần (khác với useEffect không có dependency - did mount)
  useEffect(() => {
    if (value) {
      congViecService
        .getCongViecTheoTen(value)
        .then((res) => {
          console.log(res);
          // B5b: data API getCongViecTheoTen trả về thành công => update data vào state
          setListSearch(res.data.content);
          // B6: data API getCongViecTheoTen trả về thành công => <Dropdown open={true}></Dropdown>
          setOpenDropdown(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [value]);

  // Cứ mỗi lần setState ==> tất cả Component re-render ==> chạy mới lại toàn bộ các biến/funtion bên trong
  // useMemo(()=>{},[]) : quản lý các biến/funtion xem biến/funtion nào nên chạy mới khi Components re-render
  // useCallback() : quản lý các funtion xem funtion nào nên chạy mới khi Components re-render
  // B5c: Từ Mảng gốc data API getCongViecTheoTen trả về clone ra mảng phụ với chứa mỗi ptư 2 key => đặt mảng này vào <Dropdown open={openDropdown} menu={{ items: itemListSearch }}>
  // B7: Apply useMemo(()=>{},[]) vào itemListSearch => itemListSearch phụ thuộc vào listSearch thay đổi => khi listSearch thay đổi thì biến itemListSearch được re-render, còn lại không cần
  const itemListSearch = useMemo(() => {
    return listSearch.slice(0, 4).map((item, index) => {
      return {
        key: item.id,
        label: (
          <div className="flex items-center space-x-4">
            <img src={item.congViec.hinhAnh} className="w-10 h-10" alt="" />
            <div>
              <h4 className="text-md font-semibold">
                Job: {item.congViec.tenCongViec}
              </h4>
              <p className="mt-1">Rating: {item.congViec.danhGia}</p>
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
    <header className="py-4 border-b border-gray-200">
      <div className="container">
        <div className="header_content flex items-center justify-between">
          <div className="flex flex-1 space-x-5 items-center">
            {/* LOGO: Gọi Component Icons Chấm tới thuộc tính logo để lấy thẻ svg làm iconlogo, sau đó bọc Component trong thẻ <Link to={}></Link> để logo mang chức năng chuyển hướng */}
            <Link to={pathDefault.homePage}>
              <Icons.logo />
            </Link>

            {/* SEARCH INPUT  */}
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
            {/* <DropdownInputSearch /> */}
          </div>

          {/* HEADER ACTION  */}
          <div className="header_action space-x-3">
            <DropdownHeader buttonContent="Fiverr Pro" />
            <DropdownHeader buttonContent="Explore" />
            <ButtonGhost buttonContent="English" icon={<GlobalOutlined />} />
            <ButtonGhost buttonContent="Become a Seller" />
            {!user ? (
              <>
                <ButtonGhost buttonContent="Sign in" />
                <ButtonOutline
                  buttonContent="Join"
                  onClick={() => {
                    navigate(pathDefault.signIn);
                  }}
                />
              </>
            ) : (
              <p className=" inline-block">{user.name}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTemplate;

/*
  const [keyword, setKeyword] = useState("");
  const [value] = useDebounce(keyword, 1000);
  const [listSearch, setListSearch] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value);
  };
  useEffect(() => {
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
  }, [value]);

  const itemListSearch = listSearch.map((item, index) => {
    return {
      key: item.id,
      label: item.congViec.tenCongViec,
    };
  });
*/
