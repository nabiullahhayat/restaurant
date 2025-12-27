import { Link } from "react-router-dom";
import background from "../images/willcome.jpg";

function Welcome() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <title>Welcome</title>

      {/* Background Image */}
      <img
        src={background}
        alt="Restaurant Background"
        className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 space-y-6">
        <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-wide">
          Welcome
        </h1>

        <p className="text-xl md:text-3xl text-gray-200 font-medium">
          Experience the Taste of Real Food
        </p>

        <Link
          to="/menus"
          className="mt-4 bg-yellow-600 text-white font-bold px-8 py-4 rounded-full text-lg shadow-xl hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300 animate-bounce"
        >
          Order Now
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
