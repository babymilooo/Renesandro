import {
  ArrowLeftIcon,
  CaretDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DimensionsIcon,
  FrameIcon,
  LetterCaseCapitalizeIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import CreateNewTask from "./Components/CreateNewTask";
import { useTaskContext } from "./Store/Hooks/useTaskContext";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
const ITEMS_PER_PAGE = 10;
function App() {
  const { tasks } = useTaskContext();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const handleGenerate = async (task: any) => {
    try {
      const response = await fetch(
        "https://tz-front-jvqis72guq-lm.a.run.app/tz-front/generate_formats",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic cmVuZXNhbmRybzpxd2VydHkxMjM0",
          },
          body: JSON.stringify(task),
        }
      );
      console.log(task);
      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTasks = tasks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page numbers
    setCurrentPage(page);
  };

  return (
    <div className="w-full h-screen">
      <div className="h-full w-full flex flex-col justify-center items-center gap-4">
        <div className="w-4/5 flex justify-end">
          <div className="rounded-lg px-2 py-1 cursor-pointer bg-neutral-900 text-white text-lg font-semibold">
            <CreateNewTask />
          </div>
        </div>
        <div className="w-4/5 h-auto border rounded-lg shadow">
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className=" p-2 bg-gray-200 w-[40px] text-center font-normal text-neutral-500">
                  #
                </th>
                <th className=" p-2 font-normal bg-gray-200 text-xs text-start">
                  <div className="flex gap-1">
                    <LetterCaseCapitalizeIcon className="w-4 h-4 text-neutral-500 inline-block" />
                    Task name
                  </div>
                </th>
                <th className=" p-2 font-normal bg-gray-200 w-[70px]">
                  <div className="flex justify-center gap-1 text-center">
                    <DimensionsIcon className="w-4 h-4 text-neutral-500 inline-block" />
                  </div>
                </th>
                <th className=" p-2 font-normal bg-gray-200 text-xs text-start">
                  <div className="flex gap-1">
                    <ListBulletIcon className="w-4 h-4 text-neutral-500 inline-block" />
                    Template ID
                  </div>
                </th>
                <th className=" p-2 font-normal bg-gray-200 text-xs text-start">
                  Images
                </th>
                <th className=" p-2 font-normal bg-gray-200 text-xs text-start">
                  Text
                </th>
                <th className=" p-2 font-normal bg-gray-200 text-xs text-center w-[100px]">
                  <div className="flex justify-center gap-1">
                    <FrameIcon className="w-4 h-4 text-neutral-500 inline-block" />
                    <span>Ammount</span>
                  </div>
                </th>
                <th className=" p-2 font-normal bg-gray-200 text-xs text-start">
                  Gen Type
                </th>
                <th className=" p-2 font-normal bg-gray-200 text-xs text-start w-[120px]">
                  Gen_tasks
                </th>
                <th className=" p-2 font-normal bg-gray-200 text-xs text-start w-[100px]">
                  Result Ads
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-neutral-100 border-b border-neutral-300"
                  onClick={() => navigate(`/Renesandro/${item.id}`)}
                >
                  <td className="p-2 text-neutral-500 text-sm text-center border-r">
                    {tasks.indexOf(item) + 1}
                  </td>
                  <td className="p-2 font-semibold border-r">
                    {item.task_name}
                  </td>
                  <td className="p-2 border-r">
                    <span
                      className={`text-center rounded-lg text-sm select-none px-1 ${
                        item.dimension === "1x1"
                          ? "bg-indigo-200 border-indigo-400 border"
                          : item.dimension === "16x9"
                          ? "bg-green-200 border-green-400 border"
                          : item.dimension === "4x5"
                          ? "bg-yellow-200 border-yellow-400 border"
                          : "bg-red-200 border-red-400 border"
                      }`}
                    >
                      {item.dimension}
                    </span>
                  </td>
                  <td className="p-2 border-r-2 border-neutral-300">
                    <span
                      className={`text-center rounded-lg text-sm px-2 ${
                        item.task_name === "mwpswxcudtwxb"
                          ? "bg-red-200 border-red-400 border"
                          : item.template_id === "0xdoscyowl50c"
                          ? "bg-yellow-200 border-yellow-400 border"
                          : "bg-blue-200 border-blue-400 border"
                      }`}
                    >
                      {item.template_id}
                    </span>
                  </td>
                  <td className="p-2  border-r text-sm">
                    <div className="flex gap-2 flex-wrap">
                      {item.image_layers.map((image: string) => (
                        <span className="bg-gray-200 rounded-md px-1 border-gray-400 border">
                          {image}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-2  border-r text-sm">
                    <div className="flex gap-2 flex-wrap">
                      {item.text_layers.map((text: string) => (
                        <span className="bg-gray-200 rounded-md px-1 border-gray-400 border">
                          {text}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-2 border-r text-end">{item.amount}</td>
                  <td className="p-2 border-r-2 border-neutral-300">
                    <span
                      className={`text-center rounded-lg text-sm px-2 ${
                        item.gen_type === "cyclic_generation"
                          ? "bg-orange-200 border-orange-400 border"
                          : item.gen_type === "random_generation"
                          ? "bg-cyan-200 border-cyan-400 border"
                          : "bg-blue-200"
                      }`}
                    >
                      {item.gen_type}
                    </span>
                  </td>
                  <td className="p-2 border-r flex justify-center">
                    <button
                      className="px-2 bg-yellow-200 border border-yellow-400 text-black rounded-lg"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleGenerate(item);
                      }}
                    >
                      Generate
                    </button>
                  </td>
                  <td className="p-2">
                    <div className="flex justify-center">
                      <button
                        className="px-2 bg-green-200 border border-green-400 text-black rounded-lg"
                        onClick={(event) => {
                          event.stopPropagation();
                          window.open(
                            `https://testapi-jvqis72guq-lm.a.run.app/test_vidro/${item.task_name}_${item.dimension}/format_validation`,
                            "_blank"
                          );
                        }}
                      >
                        Folder
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* <tfoot>
              <tr>
                <td colSpan={10} className="p-2 text-neutral-500 text-start">
                  total {tasks.length}
                </td>
              </tr>
            </tfoot> */}
            <tfoot>
              <tr>
                <td colSpan={5} className="p-2 text-neutral-500 text-start">
                  total {tasks.length}
                </td>
                <td colSpan={5} className="p-2 text-neutral-500 text-start">
                  <div className="flex justify-end gap-2 items-center w-full">
                    {/* <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button> */}
                    <ChevronLeftIcon
                      className="w-6 h-6 text-neutral-500 border-2 border-neutral-500 rounded-md cursor-pointer"
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                    <span className="text-sm text-neutral-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    {/* <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button> */}
                    <ChevronRightIcon
                      className="w-6 h-6 text-neutral-500 border-2 border-neutral-500 rounded-md cursor-pointer"
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
