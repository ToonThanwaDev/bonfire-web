import { Link } from "react-router-dom";

export default function ChatRoomPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1>Chat Room</h1>
      <div className="flex flex-col items-center gap-2">
        <Link className="w-[60%]" to="/chat/1">
          <div className="border-2 cursor-pointer border-blue-400 rounded-lg px-4 py-2">Room 1</div>
        </Link>
        <Link className="w-[60%]" to="/chat/2">
          <div className="border-2 cursor-pointer border-blue-400 rounded-lg px-4 py-2">Room 2</div>
        </Link>
        <Link className="w-[60%]" to="/chat/3">
          <div className="border-2 cursor-pointer border-blue-400 rounded-lg px-4 py-2">Room 3</div>
        </Link>
      </div>
    </div>
  );
}
