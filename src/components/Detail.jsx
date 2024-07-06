import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../lib/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { changeBlock } from "../features/chatSlice";

export default function Detail() {
  const dispatch = useDispatch();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useSelector(
    (state) => state.chat
  );
  const { currentUser } = useSelector((state) => state.user);

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      dispatch(changeBlock());
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <div className="detail flex-1 flex h-full flex-col">
      <div className="user py-5 px-5 flex flex-col items-center gap-3 border-b border-b-[#dddddd35]">
        <img
          className="w-24 h- rounded-full object-cover"
          src={user?.avatar || "./avatar.png"}
          alt="User avatar"
        />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info p-5 flex flex-col gap-2 h-full overflow-y-scroll">
        <div className="option">
          <div className="title flex items-center justify-between">
            <span>Chat Settings</span>
            <img
              className="w-[30px] h-[30px] p-[10px] bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer"
              src="./arrowUp.png"
              alt="Arrow up"
            />
          </div>
        </div>
        <div className="option">
          <div className="title flex items-center justify-between">
            <span>Privacy & help</span>
            <img
              className="w-[30px] h-[30px] p-[10px] bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer"
              src="./arrowUp.png"
              alt="Arrow up"
            />
          </div>
        </div>
        <div className="option">
          <div className="title flex items-center justify-between">
            <span>Shared photos</span>
            <img
              className="w-[30px] h-[30px] p-[10px] bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer"
              src="./arrowUp.png"
              alt="Arrow up"
            />
          </div>
          <div className="photos flex flex-col gap-2 mt-3">
            <div className="photoItem flex items-center justify-between">
              <div className="photoDetail flex gap-5 items-center">
                <img
                  className="w-10 h-10 rounded-md object-cover"
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Shared photo"
                />
                <span className="text-sm text-gray-400 font-light">
                  photo_2024_2.png
                </span>
              </div>
              <img
                className="icon w-[30px] h-[30px] p-[10px] bg-[rgba(17,25,40,0.3)] cursor-pointer rounded-full"
                src="./download.png"
                alt="Download"
              />
            </div>
            {/* Repeat other photo items similarly */}
          </div>
        </div>
        <div className="option">
          <div className="title flex items-center justify-between">
            <span>Shared Files</span>
            <img
              className="w-[30px] h-[30px] p-[10px] bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer"
              src="./arrowDown.png"
              alt="Arrow down"
            />
          </div>
        </div>
        <button
          onClick={handleBlock}
          className="py-[10px] px-5 w-full bg-[rgba(230,74,105,0.553)] border-none rounded-md cursor-pointer hover:bg-[rgba(230,74,105,0.796)]"
        >
          {isCurrentUserBlocked
            ? "You are Blocked"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
        <button
          className="logout p-[10px] bg-[#1a73e8] border-none rounded-md cursor-pointer"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
