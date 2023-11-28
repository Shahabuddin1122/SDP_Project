import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import CraftForm from "./Components/CraftForm";
import Footer from "./Components/Footer";
import axios from "axios";


export default function ViewWishlist() {
    const buyerId = sessionStorage.getItem("buyer_id");

    const [wishProducts, setwishProducts] = useState([]);

    useEffect(() => {
        axios.get(`https://heritage-u8vo.onrender.com/wishlist/${buyerId}`)
            .then((response) => {
                console.log(response.data.wishlistItems);
                setwishProducts(response.data.wishlistItems);
            })
    }, [])


    const clearWishlist = async () => {
        axios.delete(`https://heritage-u8vo.onrender.com/delete/wishlist/${buyerId}`)
            .then((response) => {
                window.location.reload();
            })
    }

    return (
        <>
            {buyerId ? <CraftForm /> : <Navbar />}
            
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Image</span>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {wishProducts.length > 0 ? (
                        wishProducts.map((item) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="w-32 p-4">
                                <img src="../images/nakshi_katha(1).jpg" alt="Product Image"></img>
                            </td>
                            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {item.productID.productName}
                            </td>
                            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {item.productID.description}
                            </td>
                        </tr>// Your mapping logic here
                    ))
                    ) : (
                    <p>No wishlist items found.</p>
                    )}
                    
                    </tbody>
                </table>
                <br /><br />&nbsp;
                <button onClick={clearWishlist} class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Clear Wishlist
                    </span>
                </button>
            </div>
            <Footer/>
        </>
    );
}