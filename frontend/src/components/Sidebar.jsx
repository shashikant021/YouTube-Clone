import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { RiWechatChannelsLine } from "react-icons/ri";

function Sidebar() {
  return (
    <aside className="w-48 bg-gray-100 p-4 h-full fixed top-[60px] left-0 z-50">
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:bg-gray-300 p-1 rounded flex justify-center items-center gap-1">
          <IoMdHome className="text-2xl" /> Home
        </Link>
        <Link to="/channel/my" className="hover:bg-gray-300 p-1 rounded flex justify-center items-center gap-1">
          <RiWechatChannelsLine className="text-2xl" /> My Channel
        </Link>
        <Link to="/explore" className="hover:bg-gray-300 p-1 rounded flex justify-center items-center gap-1">
          <MdExplore className="text-2xl" /> Explore
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
