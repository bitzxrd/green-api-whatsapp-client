import { logout } from "@/features/auth";
import { addChat, resetChats } from "@/entities/chat";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux";

export const ChatPage = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector((s) => s.auth.idInstance);
  const chats = useAppSelector((s) => s.chats.messages);

  const handleLogout = () => {
    dispatch(resetChats());
    dispatch(logout());
  };

  return (
    <div>
      <p>Instance: {id}</p>
      <p>Chats: {Object.keys(chats).join(", ") || "none"}</p>
      <button onClick={() => dispatch(addChat("77000000000"))}>
        test chat
      </button>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};
