// Model: Product
export interface Product {
  id?: number;
  name: string;
  sku?: string;
  slug: string;
  profileId: number;
  profile: Profile;
  regularPrice: number;
  salesPrice?: number;
  currencyId: number;
  currency: AdminCurrencies;
  categoryId: number;
  category: ProductCategory;
  earningsPorcent?: number;
  status: Status;
  stock: number;
  taxActive: boolean;
  barcode?: string;
  weight?: number;
  weightUnit?: string;
  width?: number;
  height?: number;
  length?: number;
  tax?: number;
  description?: string;
  image?: string;
  medias?: string;
  createdAt: Date;
  updatedAt: Date;
  ProductFavorite: ProductFavorite[];
  options: Option[];
  variations: ProductVariation[];
}

// Model: ProductVariation
export interface ProductVariation {
  id: number;
  productId: number;
  product: Product;
  sku?: string;
  stock: number;
  regularPrice: number;
  salesPrice?: number;
  description?: string;
  weight?: number;
  weight_unit?: string;
  width?: number;
  height?: number;
  length?: number;
  createdAt: Date;
  updatedAt: Date;
  options: ProductVariationOptions[];
}

// Model: ProductVariationOptions
export interface ProductVariationOptions {
  id: number;
  variationId: number;
  variation: ProductVariation;
  optionId: number;
  option: Option;
  optionValueId: number;
  optionValue: OptionValue;
  createdAt: Date;
  updatedAt: Date;
}

// Additional Interfaces for related models
export interface Profile {
  id: number;
  // Add other properties relevant to the Profile model
}

export interface AdminCurrencies {
  id: number;
  // Add other properties relevant to the AdminCurrencies model
}

export interface ProductCategory {
  id: number;
  // Add other properties relevant to the ProductCategory model
}

export interface Status {
  // Define the status values
}

export interface ProductFavorite {
  // Define the properties for ProductFavorite model
}

export interface Option {
  id: number;
  // Add other properties relevant to the Option model
}

export interface OptionValue {
  id: number;
  // Add other properties relevant to the OptionValue model
}
