"use client";
import { useEffect, useState } from "react";
import LayersIcon from "@mui/icons-material/Layers";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Importing usePathname for path matching

const links = [
  {
    path: "/",
    name: "watch",
    icon: <LayersIcon sx={{ background: "transparent" }} />,
    type: "movie/popular?language=en-US&page=1",
  },
  {
    path: "/pages/discover",
    name: "discover",
    icon: <LanguageIcon sx={{ background: "transparent" }} />,
    type: "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  },
  {
    path: "/pages/tvShow",
    name: "tvShow",
    icon: <LiveTvIcon sx={{ background: "transparent" }} />,
    type: "discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
  },
  {
    path: "/pages/myFav",
    name: "myFav",
    icon: <FavoriteIcon sx={{ background: "transparent" }} />,
    number: "(0)",
    className: "rounded-full px-1 py-1 bg-sky-400 text-zinc-900",
  },
  {
    path: "/pages/subscribe",
    name: "subscribtion",
    icon: <CreditCardIcon sx={{ background: "transparent" }} />,
  },
  {
    path: "/login",
    name: "logout",
    icon: <LogoutIcon sx={{ background: "transparent" }} />,
  },
];

export default function SideNav({ setType, addfav }) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname(); 

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTypeChange = (newType) => {
    if (newType) {
      setType(newType);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <ul className="flex flex-row sm:flex-col gap-5 w-100 rounded p-3">
      {links.map((link, index) => {
        const isMyFav = link.name === "myFav";
        const favNumber = isMyFav ? `(${addfav.length})` : link.number || "";

        // Check if the current link is active
        const isActive = pathname === link.path;

        return (
          <li
            onClick={() => handleTypeChange(link.type)}
            key={index}
            className="flex flex-col sm:items-start justify-center items-center"
          >
            <Link href={link.path}>
              <div
                className={`sm:gap-3 sm:p-3 p-1 flex justify-center items-center transition duration-300 ease-in-out 
                  ${isActive ? "bg-lightblue rounded-xl" : ""}
                  hover:bg-blue-500 hover:text-white rounded-lg`}
              >
                <span className="text-xs sm:text-3xl">{link.icon}</span>
                <span className="hidden sm:inline">{link.name}</span>
                <span className={link.className || ""}>{favNumber}</span>
              </div>
            </Link>

            {index === 3 && (
              <hr className="my-4 border-1 border-zinc-50 w-full hidden sm:block" />
            )}
          </li>
        );
      })}
    </ul>
  );
}
