import React, { useState, useEffect, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useToasts } from "react-toast-notifications";
import Cookies from "js-cookie";

import { Product, User } from "../../Lib/Types";

import ProductsIcon from "../../Assets/IMG/ProductsIconDark.svg";
import OrdersIcon from "../../Assets/IMG/OrdersIconDark.svg";

import Logo from "../../Assets/IMG/Logo.png";

import "./styles.scss";
import { PerformRequest } from "../../Lib/PerformRequest";
import { Endpoints } from "../../Lib/Endpoints";
import { GetProductsResponse, LoginResponse } from "../../Lib/Responses";
import MegaLoader from "../../Misc/MegaLoader";
import { AppContext } from "../DashboardContainer";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";

export default function Products() {
  const navigate = useNavigate();
  const userContext = useContext(AppContext);
  const { addToast, removeAllToasts } = useToasts();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  // Product Search Params Begin
  const [page, setPage] = useState<string>("");
  // Product Search Params End
  const getProducts = async () => {
    const token = Cookies.get("token");
    setLoading(true);
    const r: GetProductsResponse = await PerformRequest({
      route: Endpoints.GetProducts,
      method: "POST",
      data: { token: token },
    });
    if (r.data && r.data.data) {
      setProducts(r.data.data);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const tableColumns: GridColDef<Product>[] = [
    {
      field: "name",
      headerName: "Name",
    },

    {
      field: "amount",
      headerName: "Amount",
    },
    {
      field: "active",
      headerName: "Status",
    },
  ];
  return (
    <div className="products-container flex-col width-100">
      {userContext ? (
        <div className="table">
          <DataGrid
            columns={tableColumns}
            rows={products}
            getRowId={(row) => row.id}
          />
        </div>
      ) : (
        <MegaLoader />
      )}
    </div>
  );
}
