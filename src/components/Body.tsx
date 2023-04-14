import React, { useContext, useState } from "react";
import { cart } from "../assets";
import { budgetContext } from "../context/Reducer";
import Filter from "./Filter";
import { MdDelete } from "react-icons/md";

interface bodyProps{
  showModal:boolean
  setShowModal:React.Dispatch<React.SetStateAction<boolean>>
}
export default function Body({showModal,setShowModal}:bodyProps) {
  const { state, dispatch } = useContext(budgetContext);

  const handleDelete = (id: string) => {
    dispatch({ type: "delete_expense", payload: id });
  };

  const [filterVal, setFilterVal] = useState<string>("");

  const filteredVal = state.expenses.filter((item) => {
    if (filterVal === "") {
      return true;
    } else if (filterVal === "Debts") {
      return item.category === filterVal;
    } else if (filterVal === "Food") {
      return item.category === filterVal;
    } else if (filterVal === "Hobies") {
      return item.category === filterVal;
    } else if (filterVal === "Rent") {
      return item.category === filterVal;
    } else if (filterVal === "Savings") {
      return item.category === filterVal;
    } else if (filterVal === "Health") {
      return item.category === filterVal;
    }
  });

  return (
    <div className="scrollbar-thin scrollbar-thumb-[#000] h-full scrollbar-track-[#333] w-full relative overflow-y-scroll overflow-x-hidden">
      <Filter filterVal={filterVal} setFilterVal={setFilterVal} />
      <br />
      <div className="">
      {state.expenses.length === 0 ? (
        <>
          <p className="text-md lg:text-2xl mt-12 text-white-primary font-bold leading-8 text-center">
            Looks like you haven't added any{" "}
            <span className="text-green-100">Expenses Yet.</span>{" "}
          </p>
          <p className="text-md font-semibold leading-7 text-center mt-5 text-white-primary">
            No worries, just hit the{" "}
            <span className="text-green-100 cursor-pointer" onClick={() =>setShowModal(!showModal)}>'Add'</span> button to get started
          </p>
          <img src={cart} className="mt-12 mx-auto" alt="" />
        </>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-hidden sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 font-bold text-left text-xs text-[#000] uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-[#000] uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-[#000] uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-[#000] uppercase tracking-wider"
                      >
                        actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredVal.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white-primary">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white-primary">
                          {item.amount &&
                            item.amount
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white-primary">
                          {item.category}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap cursor-pointer text-sm text-white-primary"
                          onClick={() => handleDelete(item.id)}
                        >
                          <MdDelete color="red" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

    </div>
  );
}
