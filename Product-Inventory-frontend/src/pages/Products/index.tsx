import { useEffect, useState } from "react";
import { FilterOptionsType, MessageType, PaginationType, ProductType } from '../../types';
import axios from "axios";
import Header from './components/Header';
import ProductForm from './components/ProductForm';
import ProductsTable from './components/ProductsTable';

const Products = () => {
    const BASE_URL = "http://localhost:8081/";
    const PRODUCTS_PER_PAGE = 10

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [formContent, setFormContent] = useState<ProductType | undefined>(undefined);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [message, setMessage] = useState<MessageType | undefined>(undefined)
    const [page, setPage] = useState<PaginationType>({ prev: false, page: 0, next: false, total: 1 });
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

    function wait(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const loadCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}categories`);
            setCategories(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const loadProducts = async (pageNumber: number, ...options: FilterOptionsType[]) => {
        try {
            let url = ''
            const pageparms = `page=${pageNumber}&size=${PRODUCTS_PER_PAGE}`
            const opt = options[0]

            if (opt?.category) {
                url = `${BASE_URL}products/filter/category?category=${opt.category}&${pageparms}`
            } else if (opt?.maxPrice && opt?.minPrice) {
                url = `${BASE_URL}products/filter/price?maxPrice=${opt.maxPrice}&minPrice=${opt.minPrice}&${pageparms}`
            } else if (opt?.name) {
                url = `${BASE_URL}products/filter/name?name=${opt.name}&${pageparms}`
            } else {
                url = `${BASE_URL}products/page?${pageparms}`
                setSelectedFilter('all')
            }

            const response = await axios.get(url);
            setProducts(response.data.content);
            setPage({
                prev: !response.data.first,
                page: response.data.number,
                next: !response.data.last,
                total: response.data.totalPages,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const triggerSearchForm = (page: number) => {
        const filterOptions: FilterOptionsType = {};

        if (selectedFilter === "category") {
            filterOptions.category = searchQuery;
        } else if (selectedFilter === "name") {
            filterOptions.name = searchQuery;
        } else if (selectedFilter === "price") {
            filterOptions.maxPrice = maxPrice;
            filterOptions.minPrice = minPrice;

        }

        loadProducts(page, filterOptions);
    }

    const handleSearchFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const filterOptions: FilterOptionsType = {};

        if (selectedFilter === "category") {
            filterOptions.category = searchQuery;
        } else if (selectedFilter === "name") {
            filterOptions.name = searchQuery;
        } else if (selectedFilter === "price") {
            filterOptions.maxPrice = maxPrice;
            filterOptions.minPrice = minPrice;
        }

        loadProducts(0, filterOptions);
    };

    const addProducts = async (product: ProductType) => {
        try {
            await axios.post(`${BASE_URL}products`, product);
        } catch (err) {
            console.error(err);
        } finally {
            setMessage({ color: "text-green-500", message: "Successfully added the product!" })
            await wait(1000)
            loadProducts(page.total - 1);
            loadCategories()
        }
    };

    const updateProduct = async (product: ProductType) => {
        try {
            await axios.put(`${BASE_URL}products/${product.id}`, product);
        } catch (err) {
            console.error(err);
        } finally {
            setMessage({ color: "text-green-500", message: "Successfully updated the product!" })
            setIsEditing(false);
            await wait(1000)
            loadProducts(page.page);
            loadCategories()
        }
    };

    const deleteProduct = async (productId: number) => {
        try {
            await axios.delete(`${BASE_URL}products/${productId}`);

        } catch (err) {
            console.error(err);
        } finally {
            await wait(1000)
            loadProducts(page.page);
        }
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (
            formContent &&
            formContent.name &&
            formContent.category &&
            formContent.price > 0 &&
            formContent.quantity >= 0
        ) {
            if (isEditing) {
                updateProduct(formContent);
            } else {
                addProducts(formContent);
            }
            setSelectedCategory("")
            setFormContent(undefined);
        }
        else {
            setMessage({ color: "text-red-700", message: "Please fill all fields!" })
        }
    };

    const loadProductForEdit = (product: ProductType) => {

        setFormContent(product);
        setSelectedCategory(product.category)
        setIsEditing(true);
    };

    const handleCategorySelect = (selectedCategory: string) => {
        setFormContent((prev) => ({
            ...prev!,
            category: selectedCategory,
        }));
        setSelectedCategory(selectedCategory);


        setIsOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormContent((prevData) => ({
            ...prevData!,
            [id]: value,
        }));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setSelectedCategory(value);
        setIsOpen(value.length > 0);
        setFilteredCategories(categories.filter(option => option.toLowerCase().includes(value.toLowerCase())));
    };


    useEffect(() => {
        loadProducts(0);
        loadCategories()
    }, []);

    useEffect(() => {
        if (selectedFilter === 'all') loadProducts(0)
    }, [selectedFilter])

    useEffect(() => {
        setMessage(undefined);
    }, [formContent])

    useEffect(() => {
        setFormContent((prev) => ({
            ...prev!,
            category: selectedCategory,
        }));
    }, [selectedCategory])


    return (
        <div>
            <Header
                handleSearchFormSubmit={handleSearchFormSubmit}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
            />

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-14 mx-10 my-3 mb-10">
                <ProductForm
                    formContent={formContent}
                    isEditing={isEditing}
                    message={message}
                    handleFormSubmit={handleFormSubmit}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    handleInputChange={handleInputChange}
                    handleCategoryChange={handleCategoryChange}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    filteredCategories={filteredCategories}
                    handleCategorySelect={handleCategorySelect}
                />

                <div className="mx-auto w-full md:basis-2/3 md:w-2/3 md:mx-0 md:mr-auto my-2 p-6 rounded-xl shadow shadow-md shadow-gray-700">

                    <ProductsTable
                        products={products}
                        loadProductForEdit={loadProductForEdit}
                        deleteProduct={deleteProduct}
                    />
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => triggerSearchForm(page.page - 1)}
                            disabled={!page.prev}
                            className={`px-4 py-2 ${!page.prev ? "text-slate-300" : "text-gray-800 hover:text-slate-500"}   text-sm`}
                        >
                            Previous
                        </button>
                        <span className="text-gray-800 text-sm py-2">Page {page.total === 0 ? 0 : page.page + 1} of {page.total}</span>
                        <button
                            onClick={() => triggerSearchForm(page.page + 1)}
                            disabled={!page.next}
                            className={`px-4 py-2 ${!page.next ? "text-slate-300" : "text-gray-800 hover:text-slate-500"}   text-sm`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
