import { useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import ManagerUser from "./pages/managerUser/ManagerUser";
import ManagerJob from "./pages/managerJob/ManagerJob";
import ManagerComment from "./pages/managerComment/ManagerComment";

const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: <HomeTemplate />,
  },
  {
    path: pathDefault.signIn,
    element: <SignIn />,
  },
  {
    path: pathDefault.signUp,
    element: <SignUp />,
  },
  {
    path: pathDefault.admin,
    element: <AdminTemplate />,
    children: [
      {
        index: true,
        element: <ManagerUser />,
      },
      {
        path: "manager-user",
        element: <ManagerUser />,
      },
      {
        path: "manager-job",
        element: <ManagerJob />,
      },
      {
        path: "manager-comment",
        element: <ManagerComment />,
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
