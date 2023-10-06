import React, { useState, useEffect, useContext, useRef } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useToasts } from "react-toast-notifications";
import Cookies from "js-cookie";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef, GridColTypeDef } from "@mui/x-data-grid/models";
import { Button, Modal, Grid, TextField } from "@mui/material";

import { Product, User } from "../../Lib/Types";

import "./styles.scss";
import { PerformRequest } from "../../Lib/PerformRequest";
import { Endpoints } from "../../Lib/Endpoints";
import { GetProductsResponse, LoginResponse } from "../../Lib/Responses";
import MegaLoader from "../../Misc/MegaLoader";
import { AppContext } from "../DashboardContainer";
import ProgressCircle from "../../Misc/ProgressCircle";
import { getFinancialValueFromNumeric } from "../../Lib/Methods";

import DefaultProductImage from "../../Assets/IMG/DefaultProductImage.jpg";

import Logo from "../../Assets/IMG/Logo.png";

interface ProductFormProps {
  name?: string;
  amount?: number;
  weight?: number;
  quantity?: number;
  main_photo?: string;
}
export default function Products() {
  const navigate = useNavigate();
  const userContext = useContext(AppContext);
  const { addToast, removeAllToasts } = useToasts();

  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<User | null>(null);

  const [tempProductImage, setTempProductImage] = useState<File | null>(null);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isProductEdit, setProductEdit] = useState<boolean>(false);
  const [isProductImageUploading, setProductImageUploading] =
    useState<boolean>(false);
  const [isProductModalVisible, setProductModalVisible] =
    useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const [productForm, setProductForm] = useState<ProductFormProps>({});

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
              const p = params.row;
              setCurrentProduct(p);
              setProductModalVisible(true);
              setProductForm({
                name: p.name,
                amount: parseInt(
                  p.amount && p.amount.length > 0 ? p.amount : "0"
                ),
                quantity: parseInt(
                  p.quantity && p.quantity.length > 0 ? p.quantity : "0"
                ),
                main_photo: p.main_photo,
              });
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
      renderCell: (params) => {
        return (
          <span className="text-blue-default">
            ₦{getFinancialValueFromNumeric(params.row.amount)}
          </span>
        );
      },
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

  const getTempImage = () => {
    if (currentProduct) {
      if (tempProductImage) {
        return URL.createObjectURL(tempProductImage);
      } else {
        const { main_photo } = currentProduct;
        if (main_photo && main_photo.length > 0) {
          return main_photo;
        }
      }
    } else {
      return DefaultProductImage;
    }
  };
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
                {currentProduct ? (
                  <div className="product-modal-container">
                    <div className="product-modal flex-col">
                      <>
                        <div className="flex-row width-100 align-center justify-between">
                          <button
                            className="flex-row text-blue-default action pointer px-15"
                            onClick={() => {
                              setCurrentProduct(null);
                              setProductModalVisible(false);
                            }}
                          >
                            Close
                          </button>
                          <button
                            className={`flex-row align-center pointer action px-15 ${
                              isProductEdit
                                ? "text-red-primary"
                                : "text-blue-default"
                            }`}
                            onClick={() => {
                              setProductEdit(!isProductEdit);
                            }}
                          >
                            {isProductEdit ? (
                              <>
                                Cancel &nbsp;{" "}
                                <i className="far fa-times px-13" />
                              </>
                            ) : (
                              <>
                                Edit &nbsp;{" "}
                                <i className="far fa-pencil px-13" />
                              </>
                            )}
                          </button>
                        </div>
                        {!isProductEdit ? (
                          <>
                            <img
                              src={currentProduct.main_photo}
                              alt=""
                              className="image"
                            />
                            <span className="px-16 fw-500 text-dark name">
                              {currentProduct.name}
                            </span>
                            <span className="px-20 fw-600 text-dark amount">
                              ₦
                              {getFinancialValueFromNumeric(
                                currentProduct.amount
                              )}
                            </span>
                            <span className="px-14 text-dark-secondary details width-100">
                              {currentProduct.details}
                            </span>
                            <br />
                            <Grid
                              container
                              spacing={2}
                              justifyContent="space-between"
                            >
                              <Grid item>
                                <div className="item flex-col">
                                  <span className="px-16 fw-600 text-dark-secondary">
                                    {currentProduct.weight} kg
                                  </span>
                                  <span className="text-gray px-12">
                                    Weight
                                  </span>
                                </div>
                              </Grid>
                              <Grid item>
                                <div className="item flex-col">
                                  <span className="px-16 fw-600 text-dark-secondary">
                                    {currentProduct.quantity}
                                  </span>
                                  <span className="text-gray px-12">
                                    Quantity
                                  </span>
                                </div>
                              </Grid>
                              <Grid item>
                                <div className="item flex-col">
                                  <span className="px-16 fw-600 text-dark-secondary">
                                    {currentProduct.category_name}
                                  </span>
                                  <span className="text-gray px-12">
                                    Category
                                  </span>
                                </div>
                              </Grid>
                            </Grid>
                          </>
                        ) : (
                          <>
                            <input
                              type="file"
                              name=""
                              id=""
                              className="display-none"
                              ref={fileUploadRef}
                              onChange={(e) => {
                                const files = e.target.files;
                                if (files && files[0]) {
                                  setTempProductImage(files[0]);
                                }
                              }}
                            />
                            <div className="flex-row align-center width-100 edit-image-container">
                              <img
                                onClick={() => {
                                  fileUploadRef.current?.click();
                                }}
                                src={getTempImage()}
                                alt=""
                              />
                              &nbsp; &nbsp; &nbsp;
                              <Button
                                variant="contained"
                                color="primary"
                                disabled={
                                  isLoading ||
                                  isProductImageUploading ||
                                  !tempProductImage
                                }
                              >
                                Upload Image
                              </Button>
                            </div>
                            <TextField
                              label="Product Name"
                              id="outlined-size-small"
                              defaultValue="Small"
                              size="small"
                              value={productForm.name}
                              onChange={(e) => {
                                setProductForm({
                                  ...productForm,
                                  name: e.target.value,
                                });
                              }}
                            />
                          </>
                        )}
                      </>
                    </div>
                  </div>
                ) : (
                  <ProgressCircle />
                )}
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
