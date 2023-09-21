export interface User {
  username: string;
  lastname: string;
  othernames: string;
  email: string;
  phone: string;
  bank_details: {
    account_no: string;
    bank_name: string;
    bank_code: string;
  };
  photo: string;
  address: string;
  gender: string;
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
}
