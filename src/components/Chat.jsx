import EmojiPicker from "emoji-picker-react";
import {
  doc,
  onSnapshot,
  arrayUnion,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../lib/firebase";
import { useSelector } from "react-redux";
import upload from "../lib/upload";

export default function Chat() {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useSelector(
    (state) => state.chat
  );
  const { currentUser } = useSelector((state) => state.user);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text === "") return;
    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    setImg({
      file: null,
      url: "",
    });

    setText("");
  };

  return (
    <div className="chat flex flex-col flex-[2] border-l border-l-[#dddddd35] border-r border-r-[#dddddd35] h-full ">
      <div className="top p-3 flex items-center justify-between border-b border-b-[#dddddd35]">
        <div className="user flex items-center gap-5">
          <img
            className="size-14 rounded-full object-cover"
            src={user?.avatar || "./avatar.png"}
            alt=""
          />
          <div className="texts flex flex-col gap-1">
            <span className="text-lg font-bold">{user?.username}</span>
            <p className="text-sm font-light text-[#a5a5a5]">
              Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
        <div className="icons flex gap-5">
          <img className="size-5" src="./phone.png" alt="" />
          <img className="size-5" src="./video.png" alt="" />
          <img className="size-5" src="./info.png" alt="" />
        </div>
      </div>
      <div className="center w-full p-5 flex-1 flex flex-col gap-5 overflow-auto scrollbar-gutter scroll-smooth">
        {chat?.messages?.map((message) => {
          return (
            <div
              key={message?.createdAt}
              className={
                message.senderId === currentUser.id
                  ? "message own max-w-[70%] flex gap-5 self-end"
                  : "message max-w-[70%] flex gap-5"
              }
            >
              <div className="texts flex-1 flex flex-col gap-1">
                {message.img && (
                  <img
                    src={message.img}
                    alt=""
                    className="w-full h-[300px] rounded-xl object-cover"
                  />
                )}
                <p
                  className={
                    message.senderId === currentUser.id
                      ? "p-5 bg-[#5183fe] rounded-xl"
                      : "p-5 bg-[rgba(17,25,40,0.3)] rounded-xl"
                  }
                >
                  {message.text}
                </p>
                {/* <span className="text-[13px]">1 min ago</span> */}
              </div>
            </div>
          );
        })}
        {img.url && (
          <div className="message own max-w-[70%] flex gap-5 self-end">
            <div className="texts flex-1 flex flex-col gap-1">
              <img
                src={img.url}
                alt=""
                className="w-full h-[300px] rounded-xl object-cover"
              />
            </div>
          </div>
        )}

        <div ref={endRef}></div>
      </div>
      <div className="bottom p-3 flex items-center justify-between border-t-[1px] border-t-[#dddddd35] gap-5 mt-auto">
        <div className="icons flex gap-5">
          <label htmlFor="file">
            <img className="w-5 h-5 cursor-pointer" src="./img.png" alt="" />
          </label>
          <input
            type="file"
            id="file"
            onChange={handleImg}
            className="hidden"
          />
          <img className="w-5 h-5 cursor-pointer" src="./camera.png" alt="" />
          <img className="w-5 h-5 cursor-pointer" src="./mic.png" alt="" />
        </div>
        <input
          className="flex-1 bg-[rgba(17,25,40,0.5)] border-none outline-none text-white p-3 rounded-[10px] text-base disabled:cursor-not-allowed"
          type="text"
          value={text}
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You can't send message"
              : "Type a message..."
          }
          onChange={(event) => setText(event.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji relative">
          <img
            className="w-5 h-5 cursor-pointer"
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker absolute bottom-1/2 left-0">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
          className="send-btn bg-[#5183fe] text-white py-[10px] px-5 border-none rounded-md cursor-pointer disabled:bg-[#5182feb4] disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}
