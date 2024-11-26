// custome hook: lấy thông tin về kích thước của viewport
// Note: Tạo hook tự custom khi đặt tên luôn bắt đầu bằng use... để nhận biết đây là custơm Hook chứ không phải Component sẽ hiển thị lên giao diện
// window.innerWidth: chiều dài màn hình trình duyệt đang hiển thị
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const useViewPort = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => {
      return setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return window.removeEventListener("resize", handleWindowResize);
  }, []);
  return { width };
};

export default useViewPort;
