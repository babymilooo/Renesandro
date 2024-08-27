import React from "react";
import logo from "../public/images/logo.png";
import avatar_1 from "../public/images/avatar_1.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "../Components/Ui/Avatar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 select-none">
      <div className="container flex h-14 max-w-screen- xl items-center">
        <div className="w-full flex justify-between cursor-pointer">
          <div
            className="flex items-center"
            onClick={() => navigate("/Renesandro")}
          >
            <img src={logo} alt="logo" className="h-14 w-auto" />
            <span className="font-bold ml-2">Renesandro AI</span>
          </div>
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src={avatar_1} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className=" ml-2 text-sm font-semibold">Kenyatta Carson</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
