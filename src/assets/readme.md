Đây là hướng dẫn thao tác khởi tạo và setup dự án Reactjs
/\* KHỞI TẠO DỰ ÁN REACT
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
- Thư viện formik & yup \*/

/\* CÀI ĐẶT THƯ VIỆN CHO DỰ ÁN: (FONT AWSOME, AXIOS, SASS, TAILWIND CSS, REACT ROUTER DOM, REDUX TOOLKIT, ANT DESIGN, FORMIK, YUP)
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
\*/

/\* TẠO THƯ MỤC
Folder src, tạo những Folder con sau:

- Folder components
- Folder pages
- Folder templates
- Folder services
- Folder utils
- Folder common
- Folder redux (store)
- Folder hooks
  \*/

/\* TẠO FILE TRONG MỖI THƯ MỤC
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

[File App.jsx setup REACT-ROUTER-DOM]
File App.jsx : Tạo biến routes gán hook useRoutes() và lệnh import -> sau lệnh return là biến routes để hiển thị
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

\*/
