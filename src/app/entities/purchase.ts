export type Purchase = {
  id?:string;
  createdAt?:string;
  updatedAt?:string;
  deletedAt?:string;
  productId:string;
  quantity:number;
  total:number;
  status:string;
}