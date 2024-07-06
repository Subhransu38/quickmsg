import { useEffect, useState } from "react";
import AddUser from "./AddUser";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { changeChat } from "../features/chatSlice";

export default function ChatList() {
  const dispatch = useDispatch();

  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();

          return { ...item, user };
        });
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );
    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);
    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      dispatch(
        changeChat({ chatId: chat.chatId, user: chat.user, currentUser })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="chat-list flex-1 overflow-y-auto">
      <div className="search flex items-center gap-3 p-5">
        <div className="search-bar flex-1 bg-[rgba(17,25,40,0.5)] flex items-center gap-3 rounded-lg p-2">
          <img className="size-5" src="/search.png" alt="" />
          <input
            className="bg-transparent border-none outline-none flex-1 w-full"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </div>
        <img
          className="add size-10 bg-[rgba(17,25,40,0.5)] p-2 rounded-lg cursor-pointer"
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {filteredChats.map((chat) => {
        return (
          <div
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
            className={`${
              chat?.isSeen ? "bg-transparent" : "bg-[#5183fe]"
            } item flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-[#dddddd35]`}
          >
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={
                chat.user.blocked.includes(currentUser.id)
                  ? "./avatar.png"
                  : chat.user.avatar || "./avatar.png"
              }
              alt=""
            />
            <div className="texts flex flex-col gap-2">
              <span className="font-medium">
                {chat.user.blocked.includes(currentUser.id)
                  ? "User"
                  : chat.user.username}
              </span>
              <p className="flex font-light text-sm">{chat.lastMessage}</p>
            </div>
          </div>
        );
      })}

      {addMode && <AddUser />}
    </div>
  );
}
