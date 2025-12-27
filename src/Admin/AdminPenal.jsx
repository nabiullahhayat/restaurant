import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import foods from '../Data/foods.json'
import Security from "./Security"


function AdminPanel() {
  const [modal, setModal] = useState(null); 

  const [selectedFood, setSelectedFood] = useState(null);
  const food = foods;

  const openEditModal = (food) => {
    setSelectedFood(food);
    setModal("edit");
  };

  const openRemoveModal = (food) => {
    setSelectedFood(food);
    setModal("remove");
    
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 sm:p-10 space-y-8 relative">

      <title>Admin Panle</title>      
      <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-600 text-center">
        Admin Dashboard
      </h1>

     
      <div className="flex space-x-6">
         <button onClick={() => setModal("add")} className='bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-yellow-400 transition-transform'>Add Food</button>
            <Security />
       </div>

      
      <div className="w-full max-w-5xl mt-8">
        <input
          type="text"
          placeholder="Search food by name..."
          className="w-full border-2 border-yellow-600 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white rounded-xl shadow-lg">
            <thead>
              <tr className="bg-yellow-100 text-black">
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Category</th>
                <th className="p-3">Image</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {food.map((food, index) => (
                <tr key={index} className="border-b hover:bg-yellow-50 transition">
                  <td className="p-3 text-gray-800">{food.name}</td>
                  <td className="p-3 text-gray-800">{food.price + '$'}</td>
                  <td className="p-3 text-gray-800">{food.category}</td>
                  <td className="p-3">
                    <img src={food.image} alt={food.name} className=" w-12 h-12 rounded-full" />
                  </td>
                  <td className="p-3 flex justify-center space-x-4">
                    <AiOutlineEdit
                      className="text-blue-600 hover:text-blue-800 cursor-pointer text-xl"
                      onClick={() => openEditModal(food)}
                    />
                    <AiOutlineDelete
                      className="text-red-500 hover:text-red-700 cursor-pointer text-xl"
                      onClick={() => openRemoveModal(food)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
         
          <div className="absolute inset-0 backdrop-blur-sm"></div>

          
          <div className="bg-white rounded-3xl p-8 w-full max-w-md relative shadow-2xl flex flex-col space-y-5 z-10">
            
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold"> X </button>

            
            {modal === "add" && (
              <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-bold text-yellow-600 text-center">Add Food</h2>
                <input type="text" placeholder="Food Name" className="border-2 border-yellow-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400 text-black"/>
                <input type="number" placeholder="$Price" className="border-2 border-yellow-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400 text-black"/>
                <select className="border-2 border-yellow-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-gray-800">
                  <option value="">Select Category</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch & Dinner</option>
                  <option value="Drinks">Drinks</option>
                </select>
                <input type="text" placeholder="Image URL" className="border-2 border-yellow-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400 text-black"/>
                <button className='bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-yellow-400 transition-transform'>Add Food</button>
              </div>
            )}

           
            {modal === "edit" && selectedFood && (
             <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-bold text-blue-600 text-center">Edit Food</h2>
                <input type="text" placeholder="Search Food" className="border-blue-600 border-b-2 text-black p-2 outline-none" />
                <input type="text" placeholder="New Name" className="border-2 border-blue-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400 text-black"/>
                <input type="number" placeholder="$Price" className="border-2 border-blue-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400 text-black"/>
                <select className="border-2 border-blue-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-800">
                  <option value="">Select Category</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch & Dinner</option>
                  <option value="Drinks">Drinks</option>
                </select>
                <input type="text" placeholder="Image URL" className="border-2 border-blue-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400 text-black"/>
                <button className="bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition-transform">Update Food</button>
              </div>
            )}

            
            {modal === "remove" && selectedFood && (
              <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-bold text-red-500 text-center">Remove Food</h2>
                <p className="text-center">Are you sure you want to delete <span className="font-bold">{selectedFood.name}</span>?</p>
                <button className="bg-red-500 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition-transform">Delete Food</button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
