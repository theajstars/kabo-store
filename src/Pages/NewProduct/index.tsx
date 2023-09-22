import React, { useState, useEffect, useContext, useRef } from "react";

import { useNavigate, Link } from "react-router-dom";

import { Button, Box, TextField, MenuItem } from "@mui/material";
import { useToasts } from "react-toast-notifications";
import Cookies from "js-cookie";

import Logo from "../../Assets/IMG/Logo.png";

import "./styles.scss";
import { PerformRequest, UploadFile } from "../../Lib/PerformRequest";
import { Endpoints } from "../../Lib/Endpoints";
import { Product, Store, Category, SubCategory } from "../../Lib/Types";
import {
  GetCategoriesResponse,
  GetStoreListResponse,
  GetSubCategoriesResponse,
} from "../../Lib/Responses";
import MegaLoader from "../../Misc/MegaLoader";
import { AppContext } from "../DashboardContainer";
import ProgressCircle from "../../Misc/ProgressCircle";

interface NewProductProps {
  name: string;
  amount?: number;
  quantity?: number;
  weight?: number;
  store?: string;
  category?: string;
  subCategory?: string;
  details?: string;
  main_photo?: string;
}
export default function NewProduct() {
  const navigate = useNavigate();
  const productImageRef = useRef<HTMLInputElement>(null);
  const userContext = useContext(AppContext);
  const { addToast, removeAllToasts } = useToasts();
  const [isLoading, setLoading] = useState<boolean>(false);

  const [storeList, setStoreList] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const [product, setProduct] = useState<NewProductProps>({
    name: "",
    store: "",
    category: "",
    subCategory: "",
    main_photo: "",
  });
  const [productFile, setProductFile] = useState<File>();
  const [isImageUploading, setImageUploading] = useState<boolean>(false);
  const token = Cookies.get("token");
  const getStoreList = async () => {
    const r: GetStoreListResponse = await PerformRequest({
      route: Endpoints.GetStoreList,
      method: "POST",
      data: { token },
    });
    if (r.data && r.data.data) {
      setStoreList(r.data.data);
    }
  };
  const getCategories = async () => {
    const r: GetCategoriesResponse = await PerformRequest({
      route: Endpoints.GetProductCategory,
      method: "POST",
      data: { token },
    });
    if (r.data && r.data.data) {
      setCategories(r.data.data);
    }
  };
  const getSubCategories = async (categoryID: string) => {
    const r: GetSubCategoriesResponse = await PerformRequest({
      route: Endpoints.GetSubCategory,
      method: "POST",
      data: { token, category_id: categoryID, sub_category_id: "" },
    });
    if (r.data && r.data.data) {
      setSubCategories(r.data.data);
    }
  };
  useEffect(() => {
    getStoreList();
    getCategories();
  }, []);

  return (
    <div className="new-product-container flex-col width-100">
      <input
        type="file"
        ref={productImageRef}
        onChange={(e) => {
          const FileList = e.target.files ?? [];
          const file = FileList[0];
          if (file) {
            setProductFile(file);
            setImageUploading(true);
            UploadFile(file).catch(() => {
              setImageUploading(false);
            });
            setImageUploading(false);
          }
        }}
        className="display-none"
      />
      {userContext ? (
        <>
          <div className="top width-100 flex-col">
            <div className="flex-row width-100 align-center justify-between">
              <span className="text-dark fw-500 px-20">New Product</span>
              <Button
                href="/dashboard/products"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/dashboard/products");
                }}
                sx={{ height: "35px", fontSize: "12px" }}
                variant="contained"
                type="button"
              >
                Back to Products
              </Button>
            </div>
          </div>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Name"
              variant="outlined"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <TextField
              variant="outlined"
              label="Amount"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={product.amount}
              onChange={(e) =>
                setProduct({ ...product, amount: parseInt(e.target.value) })
              }
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              variant="outlined"
              label="Quantity"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={product.quantity}
              onChange={(e) =>
                setProduct({ ...product, quantity: parseInt(e.target.value) })
              }
            />
            <TextField
              variant="outlined"
              label="Weight (KG)"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={product.weight}
              onChange={(e) =>
                setProduct({ ...product, weight: parseInt(e.target.value) })
              }
            />
          </Box>
          <TextField
            select
            label="Store"
            sx={{
              width: "51.5ch",
            }}
            value={product.store}
            onChange={(e) => {
              setProduct({ ...product, store: e.target.value });
              console.log(e.target.value);
            }}
          >
            {storeList.map((store) => (
              <MenuItem key={store.store_id} value={store.store_id}>
                {store.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            onChange={(e) => {
              setProduct({ ...product, details: e.target.value });
              console.log(e.target.value);
            }}
            label="Product Details"
            rows={4}
            sx={{
              m: 1,
              width: "51.5ch",
            }}
            multiline
          />
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              select
              label="Category"
              value={product.category}
              onChange={(e) => {
                setProduct({ ...product, category: e.target.value });
                if (e.target.value && e.target.value.length > 0) {
                  getSubCategories(e.target.value);
                }
              }}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.category_id}
                  value={category.category_id}
                >
                  {category.category_name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Sub Category"
              value={product.subCategory}
              onChange={(e) => {
                setProduct({ ...product, subCategory: e.target.value });
                console.log(e.target.value);
              }}
            >
              {subCategories.map((subcat) => (
                <MenuItem
                  key={subcat.sub_category_id}
                  value={subcat.sub_category_id}
                >
                  {subcat.sub_category_name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <br />
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "51ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="flex-col width-100 align-center align-start">
              <span className="pointer">
                {productFile?.name} {isImageUploading && <ProgressCircle />}
              </span>
              <div className="flex-row align-center">
                <span
                  className="pointer text-blue-default"
                  onClick={() => productImageRef.current?.click()}
                >
                  Select Image
                </span>
              </div>
            </div>
          </Box>
          <br />
          <Button
            onClick={(e) => {
              console.log(product);
            }}
            sx={{ height: "35px", width: "150px", fontSize: "12px" }}
            variant="contained"
            type="button"
          >
            Create
          </Button>
        </>
      ) : (
        <MegaLoader />
      )}
    </div>
  );
}
