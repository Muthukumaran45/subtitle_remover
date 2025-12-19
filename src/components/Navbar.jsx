import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-10 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">Subtitle Remover</h1>
      </div>

      <ul className="flex gap-8 text-sm font-medium">
        <NavLink to="/" className="hover:text-blue-400 transition">
          Home
        </NavLink>
        <NavLink to="/how-it-works" className="hover:text-blue-400 transition">
          How It Works
        </NavLink>
        <NavLink to="/contact" className="hover:text-blue-400 transition">
          Contact
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
