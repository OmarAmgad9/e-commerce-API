import { Product } from "./product";
import { Users } from "./users";


export interface Reviews {
  _id?: string;
  comment?: string;
  rate?: number;
  product?: Product;
  user?: Users;
  createdAt?: Date;
}
