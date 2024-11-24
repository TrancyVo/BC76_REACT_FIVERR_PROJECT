import React from "react";
import InputCustom from "../../../components/input/inputCustom/InputCustom";
import { Button, DatePicker } from "antd";
import SelectCustom from "../../../components/select/selectCustom/SelectCustom";
import { useEffect } from "react";
import { skillsService } from "../../../services/skills.service";
import { useState } from "react";
import { useFormik } from "formik";
import { nguoiDungService } from "../../../services/nguoiDung.service";
import { useContext } from "react";

const FormAddUser = ({}) => {
  const [listSkills, setListSkills] = useState([]);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "",
      skill: [],
      certification: [],
    },
    onSubmit: (values) => {
      console.log(values);
      nguoiDungService
        .themNguoiDung(values)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    skillsService
      .layDanhSachSkills()
      .then((res) => {
        // console.log(res);
        setListSkills(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit} action="" className=" space-y-3">
      <InputCustom
        labelContent="Họ tên"
        placeholder="Vui lòng nhập họ tên"
        id="name"
        name="name"
        handleChange={handleChange}
        value={values.name}
        handleBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
      />
      <InputCustom
        labelContent="Email"
        placeholder="Vui lòng nhập email"
        id="email"
        name="email"
        handleChange={handleChange}
        value={values.email}
        handleBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
      />

      <InputCustom
        labelContent="Password"
        placeholder="Vui lòng nhập mật khẩu"
        type={"password"}
        id={"password"}
        name={"password"}
        handleChange={handleChange}
        value={values.password}
        handleBlur={handleBlur}
        error={errors.password}
        touched={touched.password}
      />
      <div className="grid grid-cols-2 gap-5">
        <InputCustom
          labelContent="Số điện thoại"
          placeholder="Vui lòng nhập số điện thoại"
          id={"phone"}
          name={"phone"}
          handleChange={handleChange}
          value={values.phone}
          handleBlur={handleBlur}
          error={errors.phone}
          touched={touched.phone}
        />
        <SelectCustom
          labelContent="Chức vụ"
          options={[
            {
              label: "Admin",
              value: "ADMIN",
            },
            {
              label: "User",
              value: "USER",
            },
          ]}
          handleChange={(value, option) => {
            setFieldValue("role", value);
          }}
        />
      </div>

      {/* NGÀY SINH & GIỚI TÍNH  */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="font-bold mb-1 block" htmlFor="">
            Ngày sinh
          </label>
          <DatePicker
            className="w-full"
            onChange={(date, dateString) => {
              setFieldValue("birthday", dateString);
            }}
            format="DD-MM-YYYY"
          />
        </div>
        <div>
          <SelectCustom
            options={[
              {
                label: "Nam",
                value: true,
              },
              {
                label: "Nữ",
                value: false,
              },
            ]}
            labelContent="Giới tính"
            handleChange={(value, option) => {
              setFieldValue("gender", value);
            }}
          />
        </div>
      </div>
      {/* SKILLS & CHỨNG CHỈ  */}
      <div className="grid grid-cols-2 gap-5">
        <SelectCustom
          mode="tags"
          labelContent="Kỹ năng"
          options={listSkills.map((item) => {
            return {
              label: item.tenSkill,
              value: item.id.toString(),
            };
          })}
          handleChange={(value, option) => {
            setFieldValue("skill", value);
          }}
        />
        <SelectCustom
          mode="tags"
          labelContent="Chứng chỉ"
          handleChange={(value, option) => {
            setFieldValue("certification", value);
          }}
        />
      </div>
      <div className="text-right">
        <Button
          htmlType="submit"
          variant="solid"
          className="text-white bg-black "
        >
          Xác nhận
        </Button>
      </div>
    </form>
  );
};

export default FormAddUser;

/* SK onChange:
- Input: onChange={handleChange} value = {values.name}
SK onChange gọi tới hàm handleChange đến từ Formik : hàm handleChange đến từ Formik sẽ đi lấy giá trị từ input lưu xuống Object values (formik.values) trong formik để quản lý
Thuộc tính value = {values.name} sẽ xác định giá trị hiện tại của input để hiển thị lại lên input (thông qua việc đi lấy đó từ values của formik)
- Select: onChange={(value, option)=>{setFieldValue("nameCủaInput/Select", value)}} 
Đối với thẻ Select hoặc thẻ khác ko phải Input cần lấy giá trị, sự kiện onChange gọi tới hàm setFieldValue đến từ Formik giúp lấy value từ Select đó lưu xuống Object values (formik.values) trong formik để quản lý */

/*  TWO-WAY BINDING:
value & SK onChange tạo nên sự liên kết hai chiều:
Người dùng nhập vào input → Gọi onChange → Cập nhật Formik.values.
Formik.values thay đổi → value phản ánh sự thay đổi trong giao diện. */
