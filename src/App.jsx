import List from "./components/List";
import Chat from "./components/Chat";
import Detail from "./components/Detail";
import Login from "./components/Login";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, setUserLogout } from "./features/userSlice";

export default function App() {
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector((state) => state.user);
  const { chatId } = useSelector((state) => state.chat);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchUserInfo(user?.uid)); // Dispatch the fetchUserInfo action
      } else {
        dispatch(setUserLogout()); // Ensure user state is updated when logged out
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  console.log(currentUser);

  if (isLoading) {
    return (
      <div className="loading p-12 text-4xl rounded-lg bg-[rgba(17,25,40,0.9)]">
        Loading...
      </div>
    );
  }

  return (
    <div className="container w-[90vw] h-[90vh] bg-[rgba(17,25,40,0.75)] backdrop-blur-sm backdrop-saturate-150 rounded-md border-[rgba(255,255,255,0.125)] flex">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}
