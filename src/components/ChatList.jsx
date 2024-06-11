import { useState } from "react";
import AddUser from "./AddUser";

export default function ChatList() {
  const [addMode, setAddMode] = useState(false);
  return (
    <div className="chat-list flex-1 overflow-y-auto">
      <div className="search flex items-center gap-3 p-5">
        <div className="search-bar flex-1 bg-[rgba(17,25,40,0.5)] flex items-center gap-3 rounded-lg p-2">
          <img className="size-5" src="/search.png" alt="" />
          <input
            className="bg-transparent border-none outline-none flex-1 w-full"
            type="text"
            placeholder="Search"
          />
        </div>
        <img
          className="add size-10 bg-[rgba(17,25,40,0.5)] p-2 rounded-lg cursor-pointer"
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      <div className="item flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-[#dddddd35]">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src="./avatar.png"
          alt=""
        />
        <div className="texts flex flex-col gap-2">
          <span className="font-medium">Jane Doe</span>
          <p className="flex font-light text-sm">Hello</p>
        </div>
      </div>
      {addMode && <AddUser />}
    </div>
  );
}
