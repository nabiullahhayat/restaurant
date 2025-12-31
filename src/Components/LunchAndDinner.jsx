import { useState, useEffect } from "react";

function Drinks() {
   const [foods , setFoods] = useState([])
      const [quantities, setQuantities] = useState({});
      const [cart, setCart] = useState({});
      const [table, setTable] = useState("");
    
      useEffect(() => {
        const data = localStorage.getItem('FoodData');
        if(data) {
          setFoods(JSON.parse(data))
        }
      }, [])
 
  const increase = (id) => {
    const current = quantities[id] || 1;
    setQuantities({ ...quantities, [id]: current + 1 });
  };

  
  const decrease = (id) => {
    const current = quantities[id] || 1;
    setQuantities({ ...quantities, [id]: current > 1 ? current - 1 : 1 });
  };

 
  const addToCart = (food) => {
    const qty = quantities[food.id] || 1;
    setCart({ ...cart, [food.id]: { ...food, qty } });
  };

  
  const isAdded = (id) => !!cart[id];

 
  const orderNow = () => {
    if (!table) return alert("Please select a table number");
    if (Object.keys(cart).length === 0) return alert("No food added");

    console.log({ table, items: Object.values(cart) });
    alert("Order placed successfully ✅");
  };

  
  const lunchAndDinner = foods.filter(food => food.category === "Lunch" || food.category === "Dinner");

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-10">
      <title>Lunch & Dinner</title>
    
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-600">Lunch & Dinner</h1>

        <div className="flex items-center gap-4">
          <select
            value={table}
            onChange={(e) => setTable(e.target.value)}
            className="mt-1 px-4 py-2 rounded-xl text-white bg-yellow-600 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Select Table</option>
            {[1,2,3,4,5,6].map(t => <option key={t} value={t}>Table {t}</option>)}
          </select>

          <button
            onClick={orderNow}
            className="bg-yellow-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition"
          >
            Order ({Object.keys(cart).length})
          </button>
        </div>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {lunchAndDinner.map(food => (
          <div key={food.id} className="bg-white border border-yellow-200 rounded-xl p-4 flex flex-col gap-4 hover:shadow-lg transition">
            <img src={food.image} alt={food.name} className="h-40 w-full object-cover rounded-lg border border-dashed border-yellow-300"/>
            <h2 className="text-lg font-semibold text-gray-800">{food.name}</h2>
            <p className="text-yellow-600 font-medium">${food.price}</p>

            <div className="flex items-center justify-between">
             
              <div className="flex items-center gap-3">
                <button onClick={() => decrease(food.id)} className="w-8 h-8 border border-yellow-400 rounded text-lg text-yellow-600 hover:bg-yellow-100">−</button>
                <span className="font-medium text-yellow-600">{quantities[food.id] || 1}</span>
                <button onClick={() => increase(food.id)} className="w-8 h-8 border border-yellow-400 rounded text-lg text-yellow-600 hover:bg-yellow-100">+</button>
              </div>

            
              <button
                onClick={() => addToCart(food)}
                className={`h-9 min-w-[90px] flex items-center justify-center rounded-lg font-semibold text-sm transition
                  ${isAdded(food.id) ? "bg-green-500 text-white" : "bg-yellow-600 text-white hover:bg-yellow-700"}`}
              >
                {isAdded(food.id) ? "Added ✓" : "Add"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drinks;
