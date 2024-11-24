import React from "react";
import Icons from "../../components/Icons";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { ButtonOutline } from "../../components/button/ButtonCustom";
import Lottie from "react-lottie";
import * as loginAnimation from "./../../assets/animation/loginAnimation.json";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authService } from "../../services/auth.service";
import { useContext } from "react";
import { NotificationContext } from "../../App";
import { useDispatch } from "react-redux";
import { handelUpdateUser } from "../../redux/userSlice";

const SignIn = () => {
  // Kho chứa Context chứa hàm toast thông báo cần gọi tới trong kho: useContext()
  const handleNotification = useContext(NotificationContext);
  // QL Chuyển hướng trang: useNavigate()
  const navigate = useNavigate();
  // Kho chứa redux store chứa slice cần gọi tới: useDispatch()
  const dispatch = useDispatch();

  const { handleSubmit, handleChange, values, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        console.log(values);
        authService
          .signIn(values)
          .then((res) => {
            console.log(res);
            //Đăng nhập thành công :
            //1) Lưu dữ liệu xuống localStorge
            localStorage.setItem("userInfo", JSON.stringify(res.data.content));
            //2) Lưu dữ liệu thay đổi cho redux
            dispatch(handelUpdateUser(res.data.content.user));
            //3) Hiện thông báo đăng nhập thành công 1.5s
            handleNotification("success", "Đăng nhập thành công", 1500);
            //4) Chuyển user về trang chủ 1.5s
            setTimeout(() => {
              navigate(pathDefault.homePage);
            }, 1500);
          })
          .catch((err) => {
            console.log(err);
            //Đăng nhập không thành công > báo lỗi
            handleNotification("error", err.response.data.content);
          });
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .required("Vui lòng không bỏ trống")
          .email("Vui lòng nhập đúng định dạng email"),
        password: Yup.string()
          .required("Vui lòng không bỏ trống")
          .min(6, "Vui lòng nhập mật khẩu từ 6 - 12 ký tự")
          .max(12, "Vui lòng nhập mật khẩu từ 6 - 12 ký tự")
          .matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/,
            "Vui lòng nhập mật khẩu có ít nhất 01 chữ cái Hoa, 01 chữ số và 01 ký tự đặc biệt"
          ),
      }),
    });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: JSON.parse(JSON.stringify(loginAnimation)),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="h-screen grid grid-cols-3 py-10 ">
      {/* animation  */}
      <div className="signIn_animation h-full col-span-2 flex items-center ">
        <Lottie options={defaultOptions} height={700} width={700} />
      </div>

      <div className="signIn_form h-full px-10 flex flex-col justify-between">
        {/* logo & nút back home  */}
        <div className="flex justify-between items-center">
          <Icons.logo />
          <Link to={pathDefault.homePage}>
            <span className="mr-3">{<ArrowLeftOutlined />}</span>
            Back to Homepage
          </Link>
        </div>
        {/* form đăng nhập  */}
        <div>
          <h1 className="text-4xl font-bold text-center mb-2">
            Trang đăng nhập
          </h1>
          <p className="text-gray-400 text-center mb-4">
            Nhập email để bắt đầu truy cập
          </p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">Email</label>
              <Input
                placeholder="Vui lòng nhập email"
                name="email"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
              />
              {/* thẻ span thông báo  */}
              {touched.email && errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div>
              <label htmlFor="">Nhập khẩu</label>
              <Input
                placeholder="Vui lòng nhập mật khẩu"
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
              />
              {/* thẻ span thông báo  */}
              {touched.password && errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>
            <div>
              <ButtonOutline
                buttonContent="Đăng nhập"
                className="w-full py-2"
                type="submit"
              />
            </div>
          </form>
        </div>
        {/* Link đăng kí  */}
        <div className="text-center">
          <span>
            Chưa có tài khoản?{" "}
            <Link
              to={pathDefault.signUp}
              className="font-medium hover:underline duration-200"
            >
              Đăng kí tại đây
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

/* Trang ĐĂNG NHẬP
Bố cục: Animation 2/3 + Form 1/3
1) ANIMATION
** LOTTIE FLIES **
Animation: website lottiesfiles.com -> Đăng nhập tài khoản -> Search: login (lọc animation free & popular)
B1: Click vào animation -> Download -> Lottie JSON - Download: để tải về file JSON chứa những phần toạ độ vector dùng để xử lý mà animation đang cần
Note: Tải file về và lưu trong Folder src > Folder assets > animation , rename "loginAnimation.json")
** REACT LOTTIE **
File JSON này khi đưa lên web cần phải kết hợp 1 thư viện để animation xuất hiện -> GG search: react-lottie > Chọn Website https://www.npmjs.com/package/react-lottie
B2: Cài đặt thư viện react-lottie vào dự án
- Terminal: npm i react-lottie
B3: Copy biến defaultOptions và thẻ Lottie setup Component Signin
import Lottie from "react-lottie";
import * as loginAnimation from "./../../assets/animation/loginAnimation.json";
const SignIn = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: JSON.parse(JSON.stringify(loginAnimation)),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="h-screen grid grid-cols-3 py-10 ">
      <div className="signIn_animation h-full col-span-2 flex items-center ">
        <Lottie options={defaultOptions} height={700} width={700} />
      </div>

2) FORM
** FORMIK & YUP **
B3: Gọi hook useFormik() -> Dùng Destructuring bóc tách các PT cần dùng trong form -> Setup thẻ form | setup nút submit trong form | setup input
const {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
  initialValues:{
    // Tên của key sẽ phụ thuộc vào tên key trên API
    email: "",
    password: "",
  } 
  onSubmit: (values) =>{
    console.log(values)
    }
})
return(
...
//input email
  <Input
    placeholder="Vui lòng nhập email" 
    name="email"
    onChange={handleChange}
    value={values.email}
    onBlur={handleBlur}
    />
  {touched.email && errors.email && <span>{errors.email}</span>}
  /{touched.email}
)



** API **
B3: Folder service > File config.js : cấu hình API
import axios from "axios"
export const http = axios.create({
   baseURL: "https://fiverrnew.cybersoft.edu.vn/api",
   timeout: 30000,
   tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3NiIsIkhldEhhblN0cmluZyI6IjIyLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTI4MDAwMDAwMCIsIm5iZiI6MTcxNzA4ODQwMCwiZXhwIjoxNzQ1NDI3NjAwfQ.a2GNW-Uz9iEgJEYu556bmpJxt1RW5ypggQazVphPdc4",
});
B4: Folder service > File auth.service.js :
import { http } from "./config";
export const authService = {
  signIn: (data) => {
    return http.post("/auth/signin", data);
  },
};
*/

/* THÔNG BÁO LỖI KHI ĐĂNG NHẬP SAI EMAIL-PASSWORD - REACT TOASTIFY
Search: react toastify -> website: https://www.npmjs.com/package/react-toastify
Cài đặt: 
- Termial: npm i react-toastify
- Cài thẻ <ToastContainer /> vào dự án 

redux-toolkit: tạo ra kho chứa(biến, hàm,...) bên ngoài Component, phạm vi sử dụng trên toàn ứng dụng
Hook useContext(): tạo ra kho chứa(biến, hàm,...) cho một số Component cần sử dụng chung, useContext() sẽ bọc nó lại


*/
