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
  store_id: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  photo: string;
  address: string;
  area: string;
  city: string;
  state: string;
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

export interface TeamMember {
  team_id: string;
  store_id: string;
  fullname: string;
  email: string;
  role: "admin" | "rider" | "owner";
  priviledge: "Yes" | "No";
  username: string;
  lastname: string;
  othernames: string;
  phone: string;
  active: "Yes" | "No";
  photo: string;
  address: string;
  dob: string;
  gender: string;
  nin: string;
  bvn: string;
  valid_license: string;
  bank_details: {
    account_no: string;
    bank_name: string;
    account_name: string;
  };
  next_of_kin: {
    nok_lastname: string;
    nok_othernames: string;
    nok_address: string;
    nok_phone: string;
    nok_valid_license: string;
  };
}
