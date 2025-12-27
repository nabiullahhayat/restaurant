import { Link } from "react-router-dom";

function MenusPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
      <title>Menus Page</title>
      
      <div className="flex flex-col items-center gap-10">

       
        <h1 className="text-yellow-600 font-extrabold text-5xl sm:text-6xl text-center drop-shadow-md">
          Choose Your Favorite Menu
        </h1>

       
        <div className="flex flex-col md:flex-row gap-6">

          <Link to="/breakfast" className="text-center bg-yellow-600 text-black font-semibold text-3xl px-12 py-6 rounded-3xl shadow-lg hover:scale-105 hover:shadow-yellow-500/50 transition-all duration-300" > Breakfast </Link>

          <Link to="/lunch" className="text-center bg-yellow-600 text-black font-semibold text-3xl px-12 py-6 rounded-3xl shadow-lg hover:scale-105 hover:shadow-yellow-500/50 transition-all duration-300"> Lunch & Dinner </Link>

          <Link to="/drinks" className="text-center bg-yellow-600 text-black font-semibold text-3xl px-12 py-6 rounded-3xl shadow-lg hover:scale-105 hover:shadow-yellow-500/50 transition-all duration-300"> Drinks</Link>

        </div>
      </div>
    </div>
  );
}

export default MenusPage;
