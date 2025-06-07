import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { RiWechatChannelsLine } from "react-icons/ri";

function Sidebar({ isOpen }) {
  return (
    <aside
      className={`
        bg-gray-100 min-h-screen top-[55px] z-50 overflow-hidden transition-all duration-300
        fixed md:static
        ${isOpen ? "w-48" : "w-0"}
        ${isOpen && window.innerWidth < 768 ? "left-0 absolute shadow-lg" : ""}
      `}
    >
      {" "}
      <nav
        className={`flex flex-col gap-4 p-4 ${
          isOpen ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <Link
          to="/"
          className="hover:bg-gray-300 p-1 rounded flex items-center gap-2"
        >
          <IoMdHome className="text-2xl" /> Home
        </Link>
        <Link
          to="/channel/my"
          className="hover:bg-gray-300 p-1 rounded flex items-center gap-2"
        >
          <RiWechatChannelsLine className="text-2xl" /> My Channel
        </Link>
        <Link className="hover:bg-gray-300 p-1 rounded flex items-center gap-2">
          <MdExplore className="text-2xl" /> Explore
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
