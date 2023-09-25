export interface User {
  address: string;
  bank_details: {
    account_no: string;
    bank_name: string;
    bank_code: string;
  };
  email: string;
  gender: string;
  lastname: string;
  othernames: string;
  phone: string;
  photo: string;
  role: {
    superAdmin: "No";
    admin: "No" | "Yes";
    rider: "No" | "Yes";
  };
  store_id: {
    superAdmin: null | string;
    admin: null | string;
    rider: null | string;
  };
  username: string;
}

export interface Category {
  category_id: string;
  category_name: string;
  img: string;
}
export interface SubCategory {
  category_id: string;
  category_name: string;
  sub_category_id: string;
  sub_category_name: string;
}
export interface Product {
  id: string;
  name: string;
  amount: string;
  constant_amount: string;
  details: string;
  active: "Yes" | "No";
  category_id: string;
  category_name: string;
  sub_category_id: string;
  sub_category_name: string;
  quantity: string;
  weight: string;
  main_photo: string;
  location: string;
  photo_a: string;
  photo_b: string;
  photo_c: string;
  photo_d: string;
  store_id: string;
  store_name: string;
}
export interface Store {
  address: string;
  bankDetails: {
    account_no: string;
    bank_code: string;
    bank_name: string;
  };
  description: string;
  email: string;
  logo: string;
  metrics: {
    total_active_products: number;
    total_inactive_products: number;
    successful_orders: number;
    pending_orders: number;
    failed_orders: number;
  };
  name: string;
  phone: string;
  store_id: string;
}

export type OrderStatus =
  | "Pending"
  | "Successful"
  | "Failed"
  | "Delivery"
  | "Refund"
  | "Delivered"
  | "";

export type PaymentStatus = "Successful" | "Pending" | "Failed" | "";
export interface Order {
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  payment_timestamp: string;
  order_timestamp: string;
  reference_code: string;
  store: [
    {
      name: string;
      email: string;
      phone: string;
      address: string;
    }
  ];
  product: [
    {
      poid: string;
      id: string;
      name: string;
      quantity: string;
      amount: string;
      vat: string;
      details: string;
    }
  ];
  customer: [
    {
      lastname: string;
      othernames: string;
      email: string;
      phone: string;
    }
  ];
  rider: {
    fullname: string;
    email: string;
    phone: string;
  };
  shipping: [
    {
      address: string;
      details: string;
      deliveryTracking: null | string;
    }
  ];
  amount: null | number;
}
