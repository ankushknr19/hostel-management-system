export interface User {
  _id: string;
  email: string;
  phone: string;
  hostel?: {
    name: string;
    address: {
      district: string;
      city: string;
      ward: string;
      street: string;
    };
  };
}
