import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/configStore.js";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

/* KHỞI TẠO DỰ ÁN REACT
B1: Tạo thư mục project -> Khởi tạo dự án React:
Terminal: npm create vite@latest
[OK to proceed: y | Project name: project name or ./ | Select Framework: React | Select Variant: JavaScript]
Terminal: npm i | npm instal (Cài thư mục node_modules chứa các toàn bộ thư viện trong dự án)
Terminal: npm run dev (Chạy website dự án: Control/Command + Click vào link local http://localhost:5173/)
B2: Folder src -> File main.jsx : Xoá cặp thẻ jsx <StrictMode> </StrictMode> và lệnh import { StrictMode } from "react"; 
B3: Folder src -> File index.css : Xoá hết code css có sẵn 
B4: Folder src -> File App.jsx : 
- Trong lệnh return: Xoá hết code trong cặp dấu React Fragment <>...</>, Hook useSate và các lệnh import
- Trong lệnh return: Thay vào đó là cặp thẻ <div></div>;
B5: Folder src -> File App.css : xoá File App.css 
B6: Folder src -> Folder assets -> File react.svg : Xoá File react.svg
B7: Folder public -> File vite.svg: Xoá File vite.svg 
B8: File README.md -> Xoá code có sẵn và ghi chú
Đây là template Reactjs sử dụng Vite. Phiên bản Node đang sử dụng: v20.17.0 (Terminal: node -v)
Một số thư viện cài đặt trong dự án:
- Thư viện axios
- Thư viện sass
- Thư viện tailwind
- Thư viện antd
- Thư viện react-router-dom
- Thư viện redux-toolkit
- Thư viện formik & yup */

/* CÀI ĐẶT THƯ VIỆN CHO DỰ ÁN: (FONT AWSOME, AXIOS, SASS, TAILWIND CSS, REACT ROUTER DOM, REDUX TOOLKIT, ANT DESIGN, FORMIK, YUP)
[FONT AWSOME]
File index.html -> thẻ <head/> : fa6-cdn

[AXIOS, SASS, ANTD, REACT ROUTER DOM, FORMIK, YUP]
Terminal: npm i axios sass react-router-dom antd formik yup
(AXIOS: npm i axios | SASS: npm i sass | REACT ROUTER DOM: npm i react-router-dom | ANT DESIGN: npm i antd | FORMIK: npm i formik | YUP: npm i yup)

[REDUX TOOLKIT, REACT REDUX]
Terminal: npm i @reduxjs/toolkit react-redux

[TAILWIND CSS]
Truy cập website https://tailwindcss.com -> Get started -> Framework Guides -> Vite
B1: Tạo dự án reactjs (đã tạo dự án)
B2: Chạy 02 câu lệnh trong Terminal để Cài đặt file tailwind.config.js
Terminal: 
npm install -D tailwindcss postcss autoprefixer  
npx tailwindcss init -p  
B3: File tailwind.config.js: xoá code có sẵn -> copy code từ web dán vào file
B4: File index.css: Copy & Paste 03 tailwind directive vào
@tailwind base;
@tailwind components;
@tailwind utilities;
B5: Ngưng và khởi động lại dự án
Terminal: 
Control C (^C) => npm run dev

[XOÁ THƯ VIỆN RA KHỎI DỰ ÁN]
Terminal: npm uninstall tênthưviện | npm uninstall redux-toolkit
*/

/* TẠO THƯ MỤC
Folder src, tạo những Folder con sau:
- Folder components
- Folder pages
- Folder templates
- Folder services
- Folder utils
- Folder common
- Folder redux (store)
- Folder hooks
*/

/* TẠO FILE TRONG MỖI THƯ MỤC
[Thư mục REDUX]
Folder redux -> Tạo File configStore.js 
File configStore.js :
   import { configureStore } from "@reduxjs/toolkit";
   export const store = configureStore[{reducer: },];
File main.jsx : 
- Gọi tới cặp thẻ <Provider></Provider> bọc Component <App/> & lệnh import Provider đến từ react-redux
- Trong thẻ <Provider> gọi tới thuộc tính store={store} truyền biến store vào 
import { Provider } from "react-redux";
import { store } from "./redux/configStore.js";
   <Provider store={store}>
    <App />
  </Provider>

[REACT-ROUTER-DOM]
B1: File main.jsx -> Bọc Component <App/> bằng cặp thẻ <BrowserRouter></BrowserRouter> & lệnh import
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/configStore.js";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

B2: File App.jsx -> Tạo biến routes gán hook useRoutes() và lệnh import -> sau lệnh return là biến routes để hiển thị 
import { useRoutes } from "react-router-dom";
function App() {
  const routes = useRoutes();
  return routes;
}
export default App;

[Thư mục UTILS]
Folder utils -> Tạo File utils.js

[Thư mục TEMPLATES]
Folder templates -> Tạo File HomeTemplate.jsx : lệnh 'rafce' để tạo Component

[Thư mục SERVICE: Thư mục quản lý các API sử dụng trong dự án]
Folder services -> Tạo File configAPI.js : cấu hình lại API -> export Biến http gán thư viện axios - gán PT .create({})
import axios from "axios";
export const http = axios.create({
baseURL: "",
timeout: 30000,
});

[Thư mục PAGES]
Folder pages -> Tạo File HomePage.jsx : rafce

[Thư mục HOOKS]
Folder hooks -> Tạo File index.js

[Thư mục COMPONENTS]
Folder components -> Tạo File index.js

[Thư mục COMMON]
Folder common -> Tạo File path.js và File constant.js

[Thư mục ASSETS]
Folder assets -> Tạo File readme.md: Đây là file nội dung

[Thư mục PUBLIC]
Folder public -> Tạo File readme.md: Đây là file media
 */

/* PUSH DỰ ÁN LÊN GITHUB
Tạo Repository trên Github
Terminal:
git init -> git remote add origin <linkRepoGitHub> -> git add . -> git commit -m "Setup dự án Reactjs" -> git push -u origin master
 */

/* SETUP TRANG WEB
B1: Folder template -> Tạo Folder HomeTemplate & Move File HomeTemplate.jsx vào trong Folder HomeTemplate
B2: Folder HomeTemplate -> Chứa File HomeTemplate.jsx & Tạo thêm Folder components -> Chứa 02 files Component : HeaderTemplate.jsx và FooterTemplate.jsx : rafce
B3: Trong File HomeTemplate.jsx : Thêm Component Header và Footer vào trong cặp dấu FRAGMENT <></>, ở giữa là Component <Outlet/> từ react-router-dom
B4: Component <Outlet/> : giúp cho nội dung từ những trang web khác có thể hiển thị trên Template này với cấu trúc Header và Footer như nhau
import React from "react";
import HeaderTemplate from "./components/HeaderTemplate";
import FooterTemplate from "./components/FooterTemplate";
import { Outlet } from "react-router-dom";
const HomeTemplate = () => {
  return
  <>
    <HeaderTemplate />
    <Outlet />
    <FooterTemplate />
  </>;
};
export default HomeTemplate;
 */
/* SET ROUTE
B1: Folder common -> File path.js :
export const pathDefault = {
  homePage: "/",
};
B2: File App.jsx -> Truyền arrRoutes vào hook useRoutes() : const routes = useRoutes (arrRoutes)
import { useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: <HomeTemplate />,
  },
];
function App() {
  const routes = useRoutes(arrRoutes);

  return routes;
}
export default App;

B3: Edit title và icon logo của website trong file index.html
 */

/* TẠO FILE QUẢN LÝ CÁC ICON SVG TRONG DỰ ÁN
Folder src -> Folder components -> Tạo File Icons.jsx : rafce -> const Icons = { logo: ()=>{ return -copy thẻ svg của icon và chuyển từ HTML sang JSX- }, facebook: () => {return(...)}, ....}
import React from "react";
const Icons = {
  logo: () => {
    return (
      <svg
        width={89}
        height={27}
        viewBox="0 0 89 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="#404145">
          <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z" />
        </g>
        <g fill="#1dbf73">
          <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z" />
        </g>
      </svg>
    );
  },
};
export default Icons;
 */

/* HEADER
Trong File HeaderTemplate.jsx: code cấu trúc và nội dung trình bày của header
import React from "react";
const HeaderTemplate = () => {
  return (
    <header>
      <div className="container">
        <div className="header_content">
         ....
        </div>
      </div>
    </header>
  );
};
export default HeaderTemplate;
*/

/* Quy trình tạo 1 trang
B1: Tạo Component webpage -> Trong Folder pages -> Tạo Folder signIn -> Trong Folder signIn Tạo File SignIn.jsx : rafce 
import React from "react";
const SignIn = () => {
  return (
    <div className="h-screen grid grid-cols-3">
      <div className="signIn_animation h-full col-span-2 bg-red-500"></div>
      <div className="signIn_form h-full bg-blue-500"></div>
    </div>
  );
};
export default SignIn;

B2: Khai báo định tuyến (path) cho webpage ở File path.js (Trong Folder common)
export const pathDefault = {
  homePage: "/",
  signIn: "/sign-in",
};

B3: Khai báo webpage trong arrRoutes ở File App.jsx 
const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: <HomeTemplate />,
  },
  {
    path: pathDefault.signIn,
    element: <SignIn />,
  },
];

B3: Tạo SK onClick mang chức năng chuyển hướng sang webpage đó cho NÚT BUTTON nằm ở File Component HeaderTemplate.jsx
File Component HeaderTemplate.jsx:
 - Tạo biến navigate gọi Hook useNavigate()
 - Ở Component <ButtonOutline/> truyền Props onClick={()=>{ navigate(pathDefault.signIn) }} nhận vào 1 callbackFunction chứa biến navigate định tuyến tới path sign-in
const navigate = useNavigate();
 <ButtonOutline
    buttonContent="Join"
    onClick={() => { navigate(pathDefault.signIn); }} />
  
Folder components -> Folder button -> File ButtonCustom.jsx -> Component <ButtonOutline/>:
 - Nhận props onClick
 - Tạo SK onClick nhận vào props onClick chứa setup navigate định tuyến trên
 export const ButtonOutline = ({ buttonContent, onClick }) => {
  return (
    <button
      onClick={onClick}
      className=" py-1 px-4 font-semibold text-green-500 border border-green-500 rounded-md duration-300 hover:bg-green-500 hover:text-white "
    >
      {buttonContent}
    </button>
  );
};
*/
