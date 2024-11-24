import React from "react";
import { useEffect } from "react";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { useState } from "react";
import { Button, Table } from "antd";
import { Tag } from "antd";
import { Avatar } from "antd";
import { Popconfirm } from "antd";
import { useContext } from "react";
import { NotificationContext } from "../../App";
import { Modal } from "antd";
import InputCustom from "../../components/input/inputCustom/InputCustom";
import { DatePicker } from "antd";
import SelectCustom from "../../components/select/selectCustom/SelectCustom";
import { skillsService } from "../../services/skills.service";
import FormAddUser from "./components/formAddUser";

const ManagerUser = () => {
  const handleNotification = useContext(NotificationContext);
  const [listNguoiDung, setListNguoiDung] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const layDanhSachNguoiDung = () => {
    nguoiDungService
      .layDanhSachNguoiDung()
      .then((res) => {
        console.log(res);
        setListNguoiDung(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    layDanhSachNguoiDung();
  }, []);

  // useEffect(() => {
  //   nguoiDungService
  //     .layDanhSachNguoiDung()
  //     .then((res) => {
  //       console.log(res);
  //       setListNguoiDung(res.data.content);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [listNguoiDung]);
  const columns = [
    {
      // title => Tiêu đề cột
      // dataIndex: "tênThuộcTínhTrongMảng" => trỏ tới thuộc tính nào để lấy dữ liệu
      // key => phân biệt giữa các cột
      title: "ID",
      dataIndex: "id",
      key: "1",
    },
    {
      title: "Họ Tên",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "3",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "4",
      render: (text, record, index) => {
        return text ? (
          <img src={text} className="w-10 h-10" alt="" />
        ) : (
          <Avatar size={40}>{record.name[0]}</Avatar>
        );
      },
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "5",
      render: (text, record, index) => {
        return text == "ADMIN" ? (
          <Tag color="magenta">{text}</Tag>
        ) : text == "USER" ? (
          <Tag color="blue">{text}</Tag>
        ) : text == "" ? (
          <Tag color="purple">CHƯA XÁC ĐỊNH</Tag>
        ) : (
          <Tag color="gold">{text}</Tag>
        );
      },
    },
    {
      title: "Hành động",
      key: "6",
      render: (text, record, index) => {
        return (
          <div className="space-x-3">
            {/* EDIT  */}
            <Button className="border-yellow-500 text-yellow-500">Sửa</Button>
            {/* DELETE  */}
            <Popconfirm
              title="Thực hiện xoá người dùng"
              description="Bạn có chắc muốn xoá người dùng này không?"
              onConfirm={() => {
                nguoiDungService
                  .xoaNguoiDung(record.id)
                  .then((res) => {
                    console.log(res);
                    layDanhSachNguoiDung();
                    handleNotification("success", res.data.message);
                  })
                  .catch((err) => {
                    console.log(err);
                    layDanhSachNguoiDung();
                    handleNotification("error", err.response.data.content);
                  });
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Xoá</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className="space-y-3">
      {/* tiêu đề */}
      <h1 className="font-bold text-3xl ">Danh sách người dùng</h1>

      {/* Nút: thêm người dùng  */}
      <Button
        variant="solid"
        className="bg-green-500 text-white hover:!bg-white hover:!border-green-500 hover:!text-green-500"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Thêm người dùng
      </Button>

      {/* Bảng danh sách người dùng  */}
      <Table dataSource={listNguoiDung} columns={columns} />

      {/* Bảng Modal chứa form thêm người dùng  */}
      <Modal
        onCancel={() => {
          setIsModalOpen(false);
        }}
        title="Thêm người dùng"
        open={isModalOpen}
        footer={null}
      >
        <FormAddUser />
      </Modal>
    </div>
  );
};

export default ManagerUser;
