import { logout } from "@/features/auth";
import { CreateChatForm } from "@/features/create-chat";
import { useReceiveMessages } from "@/features/receive-messages";
import { Composer } from "@/features/send-message";
import { resetChats, setActiveChat } from "@/entities/chat";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux";

export const ChatPage = () => {
  useReceiveMessages();

  const dispatch = useAppDispatch();
  const id = useAppSelector((s) => s.auth.idInstance);
  const { messages, activeId } = useAppSelector((s) => s.chats);

  const handleLogout = () => {
    dispatch(resetChats());
    dispatch(logout());
  };

  return (
    <div>
      <p>Instance: {id}</p>
      <button onClick={handleLogout}>Выйти</button>

      <CreateChatForm />
      <ul>
        {Object.keys(messages).map((phone) => (
          <li key={phone} onClick={() => dispatch(setActiveChat(phone))}>
            {phone === activeId ? "● " : ""}+{phone}
          </li>
        ))}
      </ul>

      <ul>
        {(activeId ? messages[activeId] : []).map((m) => (
          <li key={m.id}>
            {m.out ? "→" : "←"} {m.text}
          </li>
        ))}
      </ul>
      <Composer />
    </div>
  );
};
