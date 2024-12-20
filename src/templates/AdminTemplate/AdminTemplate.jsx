import React from "react";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Icons from "../../components/Icons";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { pathDefault } from "../../common/path";
import "./adminTemplate.scss";
const { Header, Sider, Content } = Layout;

const AdminTemplate = () => {
  const location = useLocation();
  // console.log(location);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="min-h-screen">
      {/* SIDEBAR BÊN TRÁI  */}
      <Sider
        width={250}
        className="bg-orange-300 sider-content"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical h-20 flex items-center justify-center">
          <Icons.logo />
        </div>
        <Menu
          //   theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              //   icon: <UserOutlined />,
              label: (
                <NavLink
                  className={({ isActive, isPending }) => {
                    return `px-3 rounded-md w-full inline-block ${
                      isActive ||
                      location.pathname == "/admin" ||
                      location.pathname == "/admin/"
                        ? "item-active"
                        : ""
                    }`;
                  }}
                  to={pathDefault.managerUser}
                >
                  <UserOutlined />
                  <span>Danh sách người dùng</span>
                </NavLink>
              ),
            },
            {
              key: "2",
              //   icon: <VideoCameraOutlined />,
              label: (
                <NavLink
                  className={({ isActive, isPending }) => {
                    return `px-3 rounded-md w-full inline-block ${
                      isActive ? "item-active" : ""
                    }`;
                  }}
                  to={pathDefault.managerJob}
                >
                  <VideoCameraOutlined />
                  <span>Danh sách công việc</span>
                </NavLink>
              ),
            },
            {
              key: "3",
              //   icon: <UploadOutlined />,
              label: (
                <NavLink
                  className={({ isActive, isPending }) => {
                    return `px-3 rounded-md w-full inline-block ${
                      isActive ? "item-active" : ""
                    }`;
                  }}
                  to={pathDefault.managerComment}
                >
                  <UploadOutlined />
                  <span>Danh sách bình luận</span>
                </NavLink>
              ),
            },
          ]}
        />
      </Sider>

      {/* LAYOUT BÊN PHẢI  */}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
