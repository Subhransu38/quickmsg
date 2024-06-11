import UserInfo from "./UserInfo";
import ChatList from "./ChatList";

export default function List() {
  return (
    <div className="list flex-1 flex flex-col">
      <UserInfo />
      <ChatList />
    </div>
  );
}
