export interface ProductType {
  id?: number;
  name: string;
  description: string | undefined;
  price: number;
  quantity: number;
  category: string;
}

export interface PaginationType {
  prev: boolean;
  page: number;
  next: boolean;
  total: number;
}

export interface MessageType {
  message: string;
  color: string;
}

export interface ProductsTableProps {
  products: ProductType[];
  loadProductForEdit: (product: ProductType) => void;
  deleteProduct: (productId: number) => void;
}

export interface HeaderProps {
  handleSearchFormSubmit: (event: React.FormEvent) => void;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  minPrice: number | undefined;
  setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  maxPrice: number | undefined;
  setMaxPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export interface ProductFormProps {
  formContent: ProductType | undefined;
  isEditing: boolean;
  message: { color: string; message: string } | undefined;
  handleFormSubmit: (event: React.FormEvent) => void;
  categories: string[];
  selectedCategory: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filteredCategories: string[];
  handleCategorySelect: (selectedCategory: string) => void;
}

export interface FilterOptionsType {
  category?: string;
  maxPrice?: number;
  minPrice?: number;
  name?: string;
}
