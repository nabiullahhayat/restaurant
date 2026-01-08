import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  // Modals
  const [modal, setModal] = useState(null); // remove
  const [foodModal, setFoodModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Load orders
  useEffect(() => {
    const data = localStorage.getItem("Orders");
    if (data) {
      const parsedOrders = JSON.parse(data);
      setOrders(parsedOrders);

      let total = 0;
      parsedOrders.forEach((order) => {
        total += Number(order.orderTotal);
      });
      setGrandTotal(total);
    }
  }, []);

  // Delete order
  const deleteOrder = (id) => {
    const orderToDelete = orders.find((o) => o.id === id);
    if (!orderToDelete) return;

    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("Orders", JSON.stringify(updatedOrders));

    setGrandTotal((prev) => prev - Number(orderToDelete.orderTotal));
    toast.success("Order deleted successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <Link
        to="/admin"
        className="block text-center text-3xl md:text-4xl font-bold text-yellow-600 mb-6"
      >
        Order History
      </Link>

    
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg">
          <thead className="bg-yellow-100">
            <tr className="text-left text-black">
              <th className="p-3">Date</th>
              <th className="p-3">Foods</th>
              <th className="p-3">Category</th>
              <th className="p-3">Total Price</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-black">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                let foodsText = order.items
                  .map((i) => `${i.name}`)
                  .join(", ");

                if (foodsText.length > 50) {
                  foodsText = foodsText.substring(0, 50) + "...";
                }

                return (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-yellow-50 transition"
                  >
                    <td className="p-3 whitespace-nowrap">{order.date}</td>

                    {/* CLICKABLE FOOD CELL */}
                    <td
                      className="p-3 text-blue-600 cursor-pointer hover:underline"
                      onClick={() => {
                        setSelectedOrder(order);
                        setFoodModal(true);
                      }}
                    >
                      {foodsText}
                    </td>

                    <td className="p-3">
                      {[...new Set(order.items.map((i) => i.category))].join(
                        ", "
                      )}
                    </td>

                    <td className="p-3 font-semibold text-yellow-600">
                      ${order.orderTotal}
                    </td>

                    <td className="p-3 text-center">
                      <AiOutlineDelete
                        className="text-red-500 text-xl cursor-pointer hover:text-red-700"
                        onClick={() => {
                          setSelectedOrder(order);
                          setModal("remove");
                        }}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Grand Total */}
      <div className="max-w-sm ml-auto mt-6 bg-white p-4 rounded-xl shadow-lg flex justify-between">
        <span className="font-bold text-lg text-yellow-600">
          Grand Total:
        </span>
        <span className="font-bold text-lg text-red-600">
          ${grandTotal}
        </span>
      </div>

 
      {modal === "remove" && selectedOrder && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-5">
            <h2 className="text-2xl font-bold text-red-500 text-center">
              Delete Order
            </h2>

            <p className="text-center">
              Are you sure you want to delete order on
              <span className="font-bold"> {selectedOrder.date}</span>?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setModal(null)}
                className="w-full bg-gray-300 py-3 rounded-xl font-bold hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  deleteOrder(selectedOrder.id);
                  setModal(null);
                  setSelectedOrder(null);
                }}
                className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:scale-105 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

 
      {foodModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 space-y-5">
            <h2 className="text-2xl font-bold text-center text-yellow-600">
              Food Details
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border text-black">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Quantity</th>
                    <th className="p-2 border">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="p-2 border">{item.name}</td>
                      <td className="p-2 border">${item.price}</td>
                      <td className="p-2 border">{item.quantity}</td>
                      <td className="p-2 border font-semibold">
                        ${item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between font-bold text-lg text-yellow-600">
              <span>Total Order Price:</span>
              <span>${selectedOrder.orderTotal}</span>
            </div>

            <button
              onClick={() => {
                setFoodModal(false);
                setSelectedOrder(null);
              }}
              className="w-full bg-gray-300 py-3 rounded-xl font-bold hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
