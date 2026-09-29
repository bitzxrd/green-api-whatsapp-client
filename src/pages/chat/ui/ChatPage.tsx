import { logout } from "@/features/auth";
import { useReceiveMessages } from "@/features/receive-messages";
import { Composer } from "@/features/send-message";
import {
  addChat,
  ChatList,
  MessageBubble,
  resetChats,
  setActiveChat,
} from "@/entities/chat";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux";
import s from "./ChatPage.module.scss";

export const ChatPage = () => {
  useReceiveMessages();

  const dispatch = useAppDispatch();
  const { messages, activeId } = useAppSelector((state) => state.chats);
  const activeMessages = activeId ? messages[activeId] : undefined;

  const handleLogout = () => {
    dispatch(resetChats());
    dispatch(logout());
  };

  return (
    <div className={s.page}>
      <aside className={`${s.sidebar} ${activeId ? s["sidebar--hidden"] : ""}`}>
        <ChatList
          messages={messages}
          activeId={activeId}
          onSelect={(phone) => dispatch(setActiveChat(phone))}
          onCreate={(phone) => dispatch(addChat(phone))}
          onLogout={handleLogout}
        />
      </aside>

      <main className={`${s.window} ${activeId ? "" : s["window--hidden"]}`}>
        {activeId ? (
          <>
            <header className={s.header}>
              <button
                className={s.back}
                onClick={() => dispatch(setActiveChat(null))}
                aria-label="Назад"
              >
                ←
              </button>
              <div className={s.avatar}>{activeId.slice(-2)}</div>
              <span className={s.title}>+{activeId}</span>
            </header>

            <div className={s.messages}>
              {activeMessages?.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
            </div>

            <Composer />
          </>
        ) : (
          <p className={s.empty}>Выберите чат или создайте новый</p>
        )}
      </main>
    </div>
  );
};
