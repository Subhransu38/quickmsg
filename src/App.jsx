import List from "./components/List";
import Chat from "./components/Chat";
import Detail from "./components/Detail";
import Login from "./components/Login";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

export default function App() {
  const user = false;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <div className="container w-[90vw] h-[90vh] bg-[rgba(17,25,40,0.75)] backdrop-blur-sm backdrop-saturate-150 rounded-md border-[rgba(255,255,255,0.125)] flex">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}
