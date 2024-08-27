import logo from "./public/images/logo.png";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex items-center justify-center select-none">
      <div className="flex  animate-fade-up items-center">
        <img src={logo} alt="logo" />
        <div className="flex flex-col items-center">
          <div className="flex gap-2 items-center">
            <span className="text-4xl text-neutral-500">Welcome to</span>
            <span className="text-4xl font-bold">Renesandro AI</span>
          </div>
          <span className="text-neutral-500 text-xl text-center w-full">
            The future of AI is here
          </span>
          <button
            onClick={() => navigate("/Renesandro")}
            className="bg-neutral-900 text-white rounded-xl p-2 mt-4 w-[100px]"
          >
            Get start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
