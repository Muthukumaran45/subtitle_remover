import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Subtitle Remover</h1>

      <ul className="flex gap-6">
        <NavLink to="/" className="hover:text-blue-400">
          Home
        </NavLink>
        <NavLink to="/how-it-works" className="hover:text-blue-400">
          How It Works
        </NavLink>
        <NavLink to="/contact" className="hover:text-blue-400">
          Contact
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
