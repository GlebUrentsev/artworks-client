export type Image = {
  src: string;
  alt: string;
};

export type FeaturedProductDetails = {
  dimentions?: {
    width: number;
    height: number;
  };
  size?: number;
  description?: string;
  recommendations?: Image[];
};

export type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  image?: Image;
  bestseller: boolean;
  featured: boolean;
  details?: FeaturedProductDetails;
};

export type ProductsResponse = Product[];

export type CartProduct = Pick<Product, '_id' | 'price' | 'image' | 'name' | 'currency'>;
