import { useSelector } from "react-redux";
export default function UserInfo() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="user-info px-5 py-3  flex items-center justify-between">
      <div className="user flex items-center gap-5">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={currentUser.avatar || "./avatar.png"}
          alt=""
        />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons flex gap-5">
        <img className="w-5 h-5" src="./more.png" alt="" />
        <img className="w-5 h-5" src="./video.png" alt="" />
        <img className="w-5 h-5" src="./edit.png" alt="" />
      </div>
    </div>
  );
}
