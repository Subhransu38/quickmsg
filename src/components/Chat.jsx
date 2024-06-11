import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };
  return (
    <div className="chat flex flex-col flex-[2] border-l border-l-[#dddddd35] border-r border-r-[#dddddd35] h-full ">
      <div className="top p-3 flex items-center justify-between border-b border-b-[#dddddd35]">
        <div className="user flex items-center gap-5">
          <img
            className="size-14 rounded-full object-cover"
            src="./avatar.png"
            alt=""
          />
          <div className="texts flex flex-col gap-1">
            <span className="text-lg font-bold">John Doe</span>
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
        <div className="message max-w-[70%] flex gap-5">
          <img
            className="w-[30px] h-[30px] rounded-full object-cover"
            src="./avatar.png"
            alt=""
          />
          <div className="texts flex-1 flex flex-col gap-1">
            <p className="p-5 bg-[rgba(17,25,40,0.3)] rounded-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Provident, similique. Eligendi cumque sit obcaecati, aspernatur
              corrupti distinctio modi iusto laboriosam.
            </p>
            <span className="text-[13px]">1 min ago</span>
          </div>
        </div>
        <div className="message own max-w-[70%] flex gap-5 self-end">
          <div className="texts flex-1 flex flex-col gap-1">
            <img
              className="w-full h-[300px] rounded-xl object-cover"
              src="https://images.pexels.com/photos/19155212/pexels-photo-19155212/free-photo-of-roof-on-a-yellow-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <p className="p-5 bg-[#5183fe] rounded-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Provident, similique. Eligendi cumque sit obcaecati, aspernatur
              corrupti distinctio modi iusto laboriosam.
            </p>
            <span className="text-[13px]">1 min ago</span>
          </div>
        </div>
        <div className="message max-w-[70%] flex gap-5">
          <img
            className="w-[30px] h-[30px] rounded-full object-cover"
            src="./avatar.png"
            alt=""
          />
          <div className="texts flex-1 flex flex-col gap-1">
            <p className="p-5 bg-[rgba(17,25,40,0.3)] rounded-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Provident, similique. Eligendi cumque sit obcaecati, aspernatur
              corrupti distinctio modi iusto laboriosam.
            </p>
            <span className="text-[13px]">1 min ago</span>
          </div>
        </div>
        <div className="message own max-w-[70%] flex gap-5 self-end">
          <div className="texts flex-1 flex flex-col gap-1">
            <p className="p-5 bg-[#5183fe] rounded-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Provident, similique. Eligendi cumque sit obcaecati, aspernatur
              corrupti distinctio modi iusto laboriosam.
            </p>
            <span className="text-[13px]">1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom p-3 flex items-center justify-between border-t-[1px] border-t-[#dddddd35] gap-5 mt-auto">
        <div className="icons flex gap-5">
          <img className="w-5 h-5 cursor-pointer" src="./img.png" alt="" />
          <img className="w-5 h-5 cursor-pointer" src="./camera.png" alt="" />
          <img className="w-5 h-5 cursor-pointer" src="./mic.png" alt="" />
        </div>
        <input
          className="flex-1 bg-[rgba(17,25,40,0.5)] border-none outline-none text-white p-3 rounded-[10px] text-base"
          type="text"
          value={text}
          placeholder="Type a message..."
          onChange={(event) => setText(event.target.value)}
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
        <button className="send-btn bg-[#5183fe] text-white py-[10px] px-5 border-none rounded-md cursor-pointer">
          Send
        </button>
      </div>
    </div>
  );
}
