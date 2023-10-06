import React, { useState, useEffect, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useToasts } from "react-toast-notifications";
import Cookies from "js-cookie";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef, GridColTypeDef } from "@mui/x-data-grid/models";
import { Button, Modal, Grid } from "@mui/material";

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
import ProgressCircle from "../../Misc/ProgressCircle";
import { getFinancialValueFromNumeric } from "../../Lib/Methods";

export default function Products() {
  const navigate = useNavigate();
  const userContext = useContext(AppContext);
  const { addToast, removeAllToasts } = useToasts();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isProductModalVisible, setProductModalVisible] =
    useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Product Search Params Begin
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
  // Product Search Params End
  const getProducts = async () => {
    const token = Cookies.get("token");
    setLoading(true);
    const r: GetProductsResponse = await PerformRequest({
      route: Endpoints.GetProducts,
      method: "POST",
      data: {
        token: token,
        store_id: Cookies.get("user_store_id"),
        page: paginationModel.page,
        limit: paginationModel.pageSize,
      },
    }).catch(() => {
      setLoading(false);
    });
    setLoading(false);
    if (r.data && r.data.data) {
      setProducts(r.data.data);
      setRowCount(r.data.counts);
    }
  };
  useEffect(() => {
    getProducts();
  }, [paginationModel]);

  const tableColProps: GridColTypeDef = {
    flex: 1,
  };
  const tableColumns: GridColDef<Product>[] = [
    {
      field: "name",
      headerName: "Name",
      // ...tableColProps,
      width: 220,
      renderCell: (params) => {
        return (
          <span
            className="pointer"
            onClick={() => {
              setCurrentProduct(params.row);
              setProductModalVisible(true);
            }}
          >
            {params.row.name}
          </span>
        );
      },
    },

    {
      field: "amount",
      headerName: "Amount",
      ...tableColProps,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      ...tableColProps,
    },
    {
      field: "category_name",
      headerName: "Categrory",
      ...tableColProps,
    },
    {
      field: "store_name",
      headerName: "Store",
      ...tableColProps,
    },
    {
      field: "active",
      headerName: "Status",
      ...tableColProps,
      renderCell: (params) => {
        return (
          <span
            className={
              params.row.active === "Yes"
                ? "text-green-primary"
                : "text-red-primary"
            }
          >
            {params.row.active === "Yes" ? "Active" : "Inactive"}
          </span>
        );
      },
    },
  ];
  return (
    <div className="products-container flex-col width-100">
      {userContext?.user ? (
        <>
          <div className="top width-100 flex-col">
            <div className="flex-row width-100 align-center justify-between">
              <span className="text-dark fw-500 px-20">Products</span>
              <Button
                href="/dashboard/new-product"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/dashboard/new-product");
                }}
                sx={{ height: "35px", fontSize: "12px" }}
                variant="contained"
                type="button"
              >
                Add New
              </Button>
            </div>
          </div>
          {isLoading ? (
            <ProgressCircle />
          ) : (
            <>
              <DataGrid
                loading={isLoading}
                className="table"
                columns={tableColumns}
                rows={products}
                getRowId={(row) => row.id}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 25]}
                rowCount={rowCount}
              />
              <Modal
                open={isProductModalVisible}
                onClose={() => {
                  setCurrentProduct(null);
                  setProductModalVisible(false);
                }}
              >
                <div className="product-modal flex-col">
                  {currentProduct && (
                    <>
                      <div className="flex-row width-100 align-center justify-between">
                        <span className="text-blue-default pointer px-15">
                          Close
                        </span>
                        <span className="flex-row align-center text-blue-default pointer px-15">
                          Edit &nbsp; <i className="far fa-pencil px-13" />
                        </span>
                      </div>
                      <img
                        src={currentProduct.main_photo}
                        alt=""
                        className="image"
                      />
                      <span className="px-16 fw-500 text-dark">
                        {currentProduct.name}
                      </span>
                      <span className="px-20 fw-600 text-dark">
                        ₦{getFinancialValueFromNumeric(currentProduct.amount)}
                      </span>
                      <span className="px-14 text-dark-secondary">
                        {currentProduct.details}
                      </span>
                      <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                      ></Grid>
                    </>
                  )}
                </div>
              </Modal>
            </>
          )}
        </>
      ) : (
        <MegaLoader />
      )}
    </div>
  );
}
