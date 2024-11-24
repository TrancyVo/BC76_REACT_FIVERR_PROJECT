import React from "react";
import HeaderTemplate from "./components/HeaderTemplate";
import FooterTemplate from "./components/FooterTemplate";
import { Outlet } from "react-router-dom";

const HomeTemplate = () => {
  return (
    //Do phan nay cua em nay viet la "return ;" co' cham' phay nen no' ket' thuc' ham` nay luon nen khong hien header outlet footer
    <>
      <HeaderTemplate />
      <Outlet />
      <FooterTemplate />
    </>
  );
};

export default HomeTemplate;
