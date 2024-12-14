import { ProductFormProps } from '../../../types';



const ProductForm: React.FC<ProductFormProps> = ({ formContent, isEditing, message, handleFormSubmit,
    categories, selectedCategory, filteredCategories,
    handleInputChange, handleCategoryChange, isOpen, setIsOpen, handleCategorySelect
}) => {

    return (
        <div className="w-full md:basis-1/3 md:w-1/3 md:mx-0 md:ml-auto my-2 p-6 rounded-xl shadow shadow-md shadow-gray-700">
            <h2 className="text-2xl text-slate-800 text-center">{isEditing ? "Update" : "Add"} Product</h2>
            {message?.message && <p className={`mt-3 text-center text-sm ${message.color}`}>{message.message}</p>}

            <form className="flex flex-col gap-4 my-5 px-3">

                {formContent?.id && <div className="flex flex-row items-center">
                    <label className="text-sm text-slate-600 w-28 " htmlFor="name">Id</label>
                    <p className="text-sm text-slate-600 p-2">:</p>
                    <input
                        type="text"
                        id="id"
                        className="border-b border-gray-500 text-sm text-slate-700 w-full focus:outline-none "
                        readOnly
                        required
                        value={formContent.id}
                    />

                </div>}

                <div className="flex flex-row items-center">
                    <label className="text-sm text-slate-600 w-28 " htmlFor="name">Name</label>
                    <p className="text-sm text-slate-600 p-2">:</p>
                    <input
                        type="text"
                        id="name"
                        className="border-b border-gray-500 text-sm text-slate-700 w-full focus:outline-none "
                        placeholder="Enter the product name"
                        required
                        value={formContent?.name || ""}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex flex-row items-center">
                    <label className="text-sm text-slate-600 w-28 " htmlFor="description">Description</label>
                    <p className="text-sm text-slate-600 text-right p-2">:</p>
                    <input
                        type="text"
                        id="description"
                        className="border-b border-gray-500 text-sm text-slate-700 w-full focus:outline-none "
                        placeholder="Enter the product description"
                        value={formContent?.description || ""}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex flex-row items-center ">
                    <label className="text-sm text-slate-600 w-28 " htmlFor="price">Price</label>
                    <p className="text-sm text-slate-600 text-right p-2">:</p>
                    <input
                        type="number"
                        id="price"
                        className="border-b border-gray-500 text-sm text-slate-700 w-full focus:outline-none "
                        min={1}
                        placeholder="Enter the product price"
                        value={!formContent?.price || formContent?.price === 0 ? "" : formContent.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="flex flex-row items-center ">
                    <label className="text-sm text-slate-600 w-28 " htmlFor="quantity">Quantity</label>
                    <p className="text-sm text-slate-600 text-right p-2">:</p>
                    <input
                        type="number"
                        id="quantity"
                        className="border-b border-gray-500 text-sm text-slate-700 w-full focus:outline-none "
                        placeholder="Enter the product quantity"
                        value={!formContent?.quantity || formContent.quantity === 0 ? "" : formContent.quantity}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="flex flex-row items-center">
                    <label
                        className="text-sm text-slate-600 w-28 flex items-center"
                        htmlFor="category"
                    >
                        Category
                    </label>
                    <p className="text-sm text-slate-600 px-2 flex items-center">:</p>

                    <div className="relative w-full">
                        <input
                            type="text"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="border-b border-gray-500 text-sm text-slate-700 w-full focus:outline-none"
                            placeholder="Enter the category"
                        />
                        {isOpen && categories.length > 0 && (
                            <ul className="absolute left-0 right-0 mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                                <button
                                    className="absolute top-0 right-0 m-1 px-2 py-1 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
                                    onClick={() => setIsOpen(false)}
                                >
                                    x
                                </button>
                                {filteredCategories.map((option, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                                        onClick={() => handleCategorySelect(option)}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <button
                    className="px-6 py-2 text-lg mx-auto rounded-lg bg-gray-800 hover:bg-gray-600 text-slate-100"
                    onClick={handleFormSubmit}
                >
                    {isEditing ? "Update" : "Add"}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
