import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoLogoYoutube } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useVideo } from "../context/VideoContext";

function Header({ toggleSidebar }) {
  const { user, logout } = useContext(AuthContext);
  const { search, setSearch, handleSearch } = useVideo();


  
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 z-100">
      <div className="flex item-center gap-4">
        <button onClick={toggleSidebar} className="text-2xl">
          <HiMenu />
        </button>
        <Link
          to="/"
          className=" flex items-center gap-1 text-xl font-bold text-shadow-lg"
        >
          <IoLogoYoutube className="text-2xl text-red-600" />
          YouTube
        </Link>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex justify-center flex-1 mx-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 border rounded-l-xl py-1 px-4"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-200 px-4 py-1 rounded-r-xl"
        >
          <FiSearch />
        </button>
      </div>

      {/* Auth Section */}
      <div className="flex items-center gap-3">
        {!user ? (
          <Link
            to="/login"
            className=" flex items-center gap-1 text-blue-500 text-sm font-semibold bg-gray-100 hover:bg-gray-300 px-3 py-1 rounded-md"
          >
            <MdAccountCircle className="text-2xl" /> Sign In
          </Link>
        ) : (
          <>
            <span className="flex items-center gap-1 text-sm font-medium text-gray-700 bg-zinc-300 py-1 px-4 rounded">
              <MdAccountCircle className="text-2xl" /> {user.username}
            </span>
            <button
              onClick={logout}
              className="text-sm font-semibold bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
