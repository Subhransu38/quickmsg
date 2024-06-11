export default function UserInfo() {
  return (
    <div className="user-info px-5 py-3  flex items-center justify-between">
      <div className="user flex items-center gap-5">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src="./avatar.png"
          alt=""
        />
        <h2>John Doe</h2>
      </div>
      <div className="icons flex gap-5">
        <img className="w-5 h-5" src="./more.png" alt="" />
        <img className="w-5 h-5" src="./video.png" alt="" />
        <img className="w-5 h-5" src="./edit.png" alt="" />
      </div>
    </div>
  );
}
