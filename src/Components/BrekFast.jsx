import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function BrekFast() {
  const [foods, setFoods] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState({});
  const [table, setTable] = useState("");


  useEffect(() => {
    const data = localStorage.getItem("FoodData");
    if (data) {
      setFoods(JSON.parse(data));
    }
  }, []);

 
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

    setCart({
      ...cart,
      [food.id]: {
        id: food.id,
        name: food.name,
        category: food.category,
        price: Number(food.price),
        qty
      }
    });
  };

  const isAdded = (id) => !!cart[id];

 
  const orderNow = () => {
    if (!table) {
      toast.error("Please select a table number");
      return;
    }

    if (Object.keys(cart).length === 0) {
      toast.error("No food added");
      return;
    }

  
    const items = Object.values(cart).map(item => ({
      name: item.name,
      category: item.category,
      price: item.price,
      quantity: item.qty,
      total: item.price * item.qty
    }));

    const orderTotal = items.reduce(
      (sum, item) => sum + item.total,
      0
    );

    const order = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      table,
      items,
      orderTotal
    };

  
    const oldOrders = JSON.parse(localStorage.getItem("Orders")) || [];
    localStorage.setItem(
      "Orders",
      JSON.stringify([...oldOrders, order])
    );

    toast.success("Order placed successfully ✅");

  
    setCart({});
    setQuantities({});
    setTable("");
  };

  const breakfastFoods = foods.filter(
    food => food.category === "Breakfast"
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-10">
      <title>Breakfast</title>


      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
        <Link
          to="/"
          className="text-3xl sm:text-4xl font-bold text-yellow-600"
        >
          Breakfast
        </Link>

        <div className="flex items-center gap-4">
          <select
            value={table}
            onChange={(e) => setTable(e.target.value)}
            className="px-4 py-2 rounded-xl text-white bg-yellow-600"
          >
            <option value="">Select Table</option>
            {[1,2,3,4,5,6].map(t => (
              <option key={t} value={t}>
                Table {t}
              </option>
            ))}
          </select>

          <button
            onClick={orderNow}
            className="bg-yellow-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            Order ({Object.keys(cart).length})
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {breakfastFoods.map(food => (
          <div
            key={food.id}
            className="bg-white rounded-xl p-4 flex flex-col gap-4 shadow hover:shadow-lg"
          >
            <img
              src={food.image}
              alt={food.name}
              className="h-40 w-full object-cover rounded-lg border-[1.5px] border-dotted border-yellow-600"
            />

            <h2 className="font-semibold text-gray-800">
              {food.name}
            </h2>

            <p className="text-yellow-600 font-medium">
              ${food.price}
            </p>

            <div className="flex items-center justify-between">
         
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decrease(food.id)}
                  className="w-8 h-8 border rounded border-yellow-500 text-yellow-600"
                >
                  −
                </button>

                <span className="text-yellow-600">
                  {quantities[food.id] || 1}
                </span>

                <button
                  onClick={() => increase(food.id)}
                  className="w-8 h-8 border rounded border-yellow-500 text-yellow-600"> +
                </button>
              </div>

          
              <button
                onClick={() => addToCart(food)}
                className={`px-4 py-2 rounded font-semibold text-sm ${isAdded(food.id)
                      ? "bg-green-500 text-white"
                      : "bg-yellow-600 text-white"
                  }`}
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

export default BrekFast;
