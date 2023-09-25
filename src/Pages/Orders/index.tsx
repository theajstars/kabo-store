import React, { useState, useEffect, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useToasts } from "react-toast-notifications";
import Cookies from "js-cookie";

import { Order, Product, User } from "../../Lib/Types";

import ProductsIcon from "../../Assets/IMG/ProductsIconDark.svg";
import OrdersIcon from "../../Assets/IMG/OrdersIconDark.svg";

import Logo from "../../Assets/IMG/Logo.png";

import "./styles.scss";
import { PerformRequest } from "../../Lib/PerformRequest";
import { Endpoints } from "../../Lib/Endpoints";
import { GetOrdersResponse, LoginResponse } from "../../Lib/Responses";
import MegaLoader from "../../Misc/MegaLoader";
import { AppContext } from "../DashboardContainer";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef, GridColTypeDef } from "@mui/x-data-grid/models";
import { Button } from "@mui/material";
import ProgressCircle from "../../Misc/ProgressCircle";

export default function Orders() {
  const navigate = useNavigate();
  const userContext = useContext(AppContext);
  const { addToast, removeAllToasts } = useToasts();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);

  // Order Search Params Begin
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
  // Order Search Params End
  const getOrders = async () => {
    const token = Cookies.get("token");
    setLoading(true);
    const r: GetOrdersResponse = await PerformRequest({
      route: Endpoints.GetOrders,
      method: "POST",
      data: {
        token: token,
        account: "panel",
        page: paginationModel.page,
        limit: paginationModel.pageSize,
      },
    }).catch(() => {
      setLoading(false);
    });
    console.log(r);
    setLoading(false);
    if (r.data && r.data.data) {
      setOrders(r.data.data);
      setRowCount(r.data.counts);
    }
  };
  useEffect(() => {
    getOrders();
  }, [paginationModel]);

  const tableColProps: GridColTypeDef = {
    flex: 1,
  };
  const tableColumns: GridColDef<Order>[] = [
    {
      field: "name",
      headerName: "Store Name",
      // ...tableColProps,
      width: 150,
      renderCell: (param) => {
        return <span>{param.row.store[0]?.name ?? ""}</span>;
      },
    },

    {
      field: "order_timestamp",
      headerName: "Order Time",
      ...tableColProps,
    },
    {
      field: "payment_timestamp",
      headerName: "Payment Time",
      ...tableColProps,
    },
    {
      field: "order_status",
      headerName: "Order Status",
      ...tableColProps,
      renderCell: (params) => {
        return (
          <span
            className={
              ["Successful", "Delivered"].includes(params.row.order_status)
                ? "text-green-primary"
                : ["Delivery", "Request"].includes(params.row.order_status)
                ? "text-blue-default"
                : "text-red-primary"
            }
          >
            {params.row.order_status}
          </span>
        );
      },
    },
    {
      field: "payment_status",
      headerName: "Payment Status",
      ...tableColProps,
      renderCell: (params) => {
        return (
          <span
            className={
              params.row.payment_status === "Successful"
                ? "text-green-primary"
                : params.row.payment_status === "Pending"
                ? "text-orange-primary"
                : "text-red-primary"
            }
          >
            {params.row.payment_status}
          </span>
        );
      },
    },
  ];
  return (
    <div className="orders-container flex-col width-100">
      {userContext?.user ? (
        <>
          <div className="top width-100 flex-col">
            <div className="flex-row width-100 align-center justify-between">
              <span className="text-dark fw-500 px-20">Orders</span>
            </div>
          </div>
          {isLoading ? (
            <ProgressCircle />
          ) : (
            <DataGrid
              loading={isLoading}
              className="table"
              columns={tableColumns}
              rows={orders}
              getRowId={(row) => row.reference_code}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5, 10, 25]}
              rowCount={rowCount}
            />
          )}
        </>
      ) : (
        <MegaLoader />
      )}
    </div>
  );
}
