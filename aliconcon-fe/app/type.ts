export type Product = {
    _id: string;
    title: string;
    purchase_price: string;
    sale_price: number;
    discount_price: number;
    description: string;
    images: Array<string>;
    category: any;
    quantity: number;
    sold: number;
    options: any;
    comments?: Array<any>
    likes?: Array<any>
  };
  