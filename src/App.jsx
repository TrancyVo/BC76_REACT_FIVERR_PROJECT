import { useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { createContext } from "react";
import { Suspense } from "react";
// import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
// import SignIn from "./pages/SignIn/SignIn";
// import SignUp from "./pages/signUp/SignUp";
// import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
// import ManagerUser from "./pages/managerUser/ManagerUser";
// import ManagerJob from "./pages/managerJob/ManagerJob";
// import ManagerComment from "./pages/managerComment/ManagerComment";

// REACT LAZY: Component nào hiển thị -> Component đó được xử lý & tải lên (tránh việc lần đầu khi truy cập vào trang tất cả các Component đều được tải xuống hết)
//  B1: Xoá lệnh import HomeTemplate from "./templates/HomeTemplate/HomeTemplate"
//  B2: Tạo biến HomeTemplate gọi tới React.lazy() và truyền vào PT lazy 1 function trả về lệnh import Component HomeTemplate
//  (Lúc này biến HomeTemplate đóng vai trò như Component HomeTemplate nhưng khi Componet HomeTemplate được hiển thị cho user thì chỉ mỗi Componet HomeTemplate này được tải lên)

// Component <Suspense></Suspense>: Bọc lại toàn bộ Component nào đang sử dụng React.lazy() => hiển thị giao diện web LOADING thay thế cho 1 Component nào đó để đợi trước khi Component đó được tải về

const HomeTemplate = React.lazy(() =>
  import("./templates/HomeTemplate/HomeTemplate")
);
const SignIn = React.lazy(() => import("./pages/signIn/SignIn"));
const SignUp = React.lazy(() => import("./pages/signUp/SignUp"));
const AdminTemplate = React.lazy(() =>
  import("./templates/AdminTemplate/AdminTemplate")
);
const ManagerUser = React.lazy(() => import("./pages/managerUser/ManagerUser"));
const ManagerJob = React.lazy(() => import("./pages/managerJob/ManagerJob"));
const ManagerComment = React.lazy(() =>
  import("./pages/managerComment/ManagerComment")
);
const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: (
      <Suspense fallback={<div>Vui lòng chờ trong giây lát</div>}>
        <HomeTemplate />
      </Suspense>
    ),
  },
  {
    path: pathDefault.signIn,
    element: (
      <Suspense fallback={<div>Vui lòng chờ trong giây lát</div>}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    path: pathDefault.signUp,
    element: (
      <Suspense fallback={<div>Vui lòng chờ trong giây lát</div>}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: pathDefault.admin,
    element: (
      <Suspense fallback={<div>Vui lòng chờ trong giây lát</div>}>
        <AdminTemplate />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Vui lòng chờ trong giây lát</div>}>
            <ManagerUser />
          </Suspense>
        ),
      },
      {
        path: "manager-user",
        element: (
          <Suspense fallback={<div>Vui lòng chờ trong giây lát</div>}>
            <ManagerUser />
          </Suspense>
        ),
      },
      {
        path: "manager-job",
        element: <ManagerJob />,
      },
      {
        path: "manager-comment",
        element: (
          <Suspense fallback={<div>Vui lòng chờ trong giây lát</div>}>
            <ManagerComment />
          </Suspense>
        ),
      },
    ],
  },
];
//Tạo Context chứa thẻ thông báo > bọc biến này lên toàn bộ dự án <NotificationContext.Provider value={}> {routes} </NotificationContext.Provider>
export const NotificationContext = createContext();

function App() {
  //Setup: React-Router-Dom
  const routes = useRoutes(arrRoutes);
  // Setup: hàm toast
  const handleNotification = (type, content, timeClose = 3000) => {
    toast[type](content, {
      position: "top-right",
      autoClose: timeClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  //toast.error || toast.success || toast.warning || toast.info

  return (
    <>
      <NotificationContext.Provider value={handleNotification}>
        {routes}
        <ToastContainer />
      </NotificationContext.Provider>
    </>
  );
}

export default App;

/* KHO CHỨA:
redux-toolkit: tạo ra kho chứa(biến, hàm,...) bên ngoài Component, phạm vi sử dụng trên toàn ứng dụng
Hook useContext(): tạo ra kho chứa(biến, hàm,...) cho một số Component cần sử dụng chung, useContext() sẽ bọc nó lại

Quy trình 
B1: Tạo kho chứa bằng PT createContext() ngoài component App.jsx + export
export const NotificationContext = createContext();

B2: Kho chứa bọc nội dung Component App.jsx - .Provider value={}
<NotificationContext.Provider value={}>
   {routes}
</NotificationContext.Provider>

B3: setup hàm toast trong App
//toast.error || toast.success || toast.warning || toast.info
const handleNotification = (type, content) => {
    toast[type](content, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  B4: truyền biến chứa hàm toast thông báo vào kho chứa context thông qua value={}
  và gắn thẻ Component < <ToastContainer /> vào trong phạm vi của <NotificationContex.Providert></NotificationContex.Providert>
    return (
    <>
      <NotificationContext.Provider value={handleNotification}>
        {routes}
        <ToastContainer />
      </NotificationContext.Provider>
    </>
  );

  B5: bên component SignIn.jsx > Trong Hàm SignIn > tạo biến gọi hook useContext() truyền Context vừa tạo vào
  const SignIn = () => {
  const value = useContext(NotificationContext);
  console.log(value);
*/
/* ĐÓNG GÓI DỰ ÁN:
- Control C
- npm run build => bắt đầu quá trình build dự án => xuất hiện thư mục dist (thư mục này ko cần đẩy lên github vì sẽ được vercel build lại)
- git add . | git commit -m "" | git push -u origin master
- Vercel => Tạo dự án mới => Import dự án => Giữ nguyên tất cả trừ Project Name (nếu muốn thay đổi tên domain)
- Lưu ý: Trong lúc chạy install Command để cài đặt node_module để build dự án => Nếu bị lỗi: bấm nút xanh để xoá + ghi đè lên:  npm i --force 
- Deploy
 */
