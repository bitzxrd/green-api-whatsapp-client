import { useState } from "react";
import type { FormEvent } from "react";
import s from "./ChatList.module.scss";
import type { Message } from "../model/types";

interface ChatListProps {
  messages: Record<string, Message[]>;
  activeId: string | null;
  onSelect: (phone: string) => void;
  onCreate: (phone: string) => void;
  onLogout: () => void;
}

export const ChatList = ({
  messages,
  activeId,
  onSelect,
  onCreate,
  onLogout,
}: ChatListProps) => {
  const [adding, setAdding] = useState(false);
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) return;
    onCreate(digits);
    setPhone("");
    setAdding(false);
  };

  const chats = Object.keys(messages);

  return (
    <div className={s.list}>
      <div className={s.header}>
        Чаты
        <div className={s.headerActions}>
          <button
            className={s.addButton}
            onClick={() => setAdding((v) => !v)}
            aria-label="Новый чат"
          >
            {adding ? "×" : "+"}
          </button>
          <button className={s.logoutButton} onClick={onLogout}>
            Выйти
          </button>
        </div>
      </div>

      {adding && (
        <form className={s.form} onSubmit={handleSubmit}>
          <input
            className={s.input}
            placeholder="Номер телефона"
            inputMode="tel"
            autoFocus
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className={s.submit}>ОК</button>
        </form>
      )}

      {chats.length === 0 && <p className={s.empty}>Нет чатов</p>}

      {chats.map((chatPhone) => {
        const list = messages[chatPhone];
        const last = list[list.length - 1];
        return (
          <div
            key={chatPhone}
            className={`${s.item} ${chatPhone === activeId ? s["item--active"] : ""}`}
            onClick={() => onSelect(chatPhone)}
          >
            <div className={s.avatar}>{chatPhone.slice(-2)}</div>
            <div className={s.info}>
              <p className={s.phone}>+{chatPhone}</p>
              <p className={s.preview}>
                {last
                  ? last.out
                    ? `Вы: ${last.text}`
                    : last.text
                  : "Нет сообщений"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
