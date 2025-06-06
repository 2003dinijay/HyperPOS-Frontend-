import React from 'react';

const CartTable = ({ cartItems, onQuantityChange, productList }) => {
    const calculateTotal = (price, quantity, discount) => {
        const total = price * quantity * (1 - discount / 100);
        return total > 0 ? total : 0;
    };

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-700 shadow-md max-h-[50vh]">
            <table className="min-w-full text-sm text-center text-gray-800">
                <thead className="bg-purple-700/70 text-white">
                    <tr>
                        <th className="px-4 py-2 text-center">#</th>
                        <th className="px-4 py-2 ">Product Name</th>
                        <th className="px-4 py-2 text-center">Unit</th>
                        <th className="px-4 py-2 text-center">Quantity</th>
                        <th className="px-4 py-2 text-center">Discount</th>
                        <th className="px-4 py-2 text-center">Cost</th>
                        <th className="px-4 py-2 text-center">Total</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-white">
                    {cartItems?.length >0 ? 
                        cartItems.map((item, index)=> {
                            const itemTotall = calculateTotal(
                                item?.unitCost,
                                item?.quantity,
                                item?.discount
                            );
                            const maxQuantity = item.quantity;
                            return (
                                <tr key={index} className="hover:bg-teal-50">
                                    <td className="px-4 py-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-2">
                                        {
                                            productList?.find(
                                                (product) => product.id === item?.productId
                                            )
                                            ?.name || "N/A"
                                        }
                                    </td>
                                    <td className="px-4 py-2">
                                        {
                                            productList?.find(
                                                (product) => product.id === item?.productId
                                            )?.unit
                                        }
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min = "0"
                                            max={maxQuantity}
                                            onChange={(e) =>
                                                onQuantityChange(
                                                    item?.id,
                                                    parseInt(e.target.value, 10) || 0
                                                )
                                            }
                                            className="w-16 p-1 border text-black border-purple-300 rounded bg-gray-100 text-center">
                                        </input>
                                    </td>
                                    <td className="px-4 py-2">
                                        {item?.discount}%
                                    </td>
                                    <td className="px-4 py-2">
                                        Rs. {Number(item?.unitCost).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2">
                                        Rs. {Number(itemTotall).toFixed(2)}
                                    </td>
                                </tr>
                            );
                        })
                        : (
                            <tr>
                                <td className="px-4 py-2 text-center text-gray-500" colSpan="8">
                                    No items in the GRN return
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default CartTable;