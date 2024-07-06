import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function AddUser() {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-user p-7 bg-[rgba(17,25,40,0.9)] rounded-lg absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-max">
      <form className="flex gap-5" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="username"
          name="username"
          id=""
          className="p-2 rounded-lg outline-none text-black"
        />
        <button className="p-2 bg-[#1a73e8] rounded-lg text-white cursor-pointer">
          Search
        </button>
      </form>
      {user && (
        <div className="user mt-12 flex items-center justify-between">
          <div className="detail flex items-center gap-3">
            <img
              src={user.avatar || "./avatar.png"}
              alt=""
              className="size-12 rounded-full object-cover"
            />
            <span>{user.username}</span>
          </div>
          <button
            className="p-2 bg-[#1a73e8] rounded-lg text-white cursor-pointer"
            onClick={handleAdd}
          >
            Add User
          </button>
        </div>
      )}
    </div>
  );
}
