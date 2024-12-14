import React from 'react';
import { HeaderProps } from '../../../types';


const Header: React.FC<HeaderProps> = ({
    handleSearchFormSubmit, selectedFilter, setSelectedFilter, searchQuery,
    setSearchQuery, minPrice, setMinPrice, maxPrice, setMaxPrice
}) => {
    return (
        <div className="mx-10 mt-10 mb-5 p-6 rounded-xl shadow shadow-md shadow-gray-700">
            <h2 className="text-3xl text-slate-800 text-center">Welcome to the Product Inventory</h2>
            <form
                onSubmit={handleSearchFormSubmit}
                className="flex flex-col gap-2 mt-3 md:flex-row items-center justify-center"
            >
                <select
                    id="searchType"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="border p-2 rounded-xl border-gray-500 text-sm text-slate-700 focus:outline-none"
                >
                    <option value="all">All</option>
                    <option value="category">By Category</option>
                    <option value="name">By Name</option>
                    <option value="price">By Price Range</option>
                </select>
                {selectedFilter !== 'all' &&
                    <>{selectedFilter === "price" ? (
                        <div className="flex gap-2">
                            <input
                                type="number"
                                id="minPrice"
                                placeholder="Min Price"
                                value={minPrice || ""}
                                onChange={(e) => setMinPrice(Number(e.target.value))}
                                className="border p-2 rounded-xl border-gray-500 text-sm text-slate-700 focus:outline-none"
                                required
                            />
                            <input
                                type="number"
                                id="maxPrice"
                                placeholder="Max Price"
                                value={maxPrice || ""}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="border p-2 rounded-xl border-gray-500 text-sm text-slate-700 focus:outline-none"
                                required
                            />
                        </div>
                    ) : (
                        <input
                            type="text"
                            id="search"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border p-2 rounded-xl border-gray-500 text-sm text-slate-700 focus:outline-none"
                            required
                        />
                    )}
                        <button
                            type="submit"
                            className="px-6 py-2 text-sm rounded-xl bg-gray-800 hover:bg-gray-600 text-slate-100"
                        >
                            Search
                        </button>
                    </>
                }
            </form>
        </div>
    );
};

export default Header;
