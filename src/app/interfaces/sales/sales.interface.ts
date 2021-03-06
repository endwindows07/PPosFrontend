import { ISalesOrder } from "./sales-order.interface";
import { IProfile } from "../profile.interface";

export interface ISales {
  sales_List: ISalesOrder[];
  payment: string;

  id?: string;
  total_Price?: string;
  status?: string;

  sales_Time?: string;

  memberId?: string;
  cancelSales_Time?: string;
  memberCancelBill?: string;

  member?: IProfile;
}