import { useState } from "react";
import type { FormEvent } from "react";
import { addMessage } from "@/entities/chat";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux";
import { useSendMessageMutation } from "../api/sendMessageApi";
import s from "./Composer.module.scss";

export const Composer = () => {
  const dispatch = useAppDispatch();
  const activeId = useAppSelector((state) => state.chats.activeId);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [send, { isLoading }] = useSendMessageMutation();

  if (!activeId) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const message = text.trim();
    if (!message) return;

    try {
      const { idMessage } = await send({ phone: activeId, message }).unwrap();
      dispatch(
        addMessage({
          phone: activeId,
          message: { id: idMessage, text: message, out: true, ts: Date.now() },
        }),
      );
      setText("");
      setError("");
    } catch {
      setError("Не удалось отправить сообщение");
    }
  };

  return (
    <form className={s.composer} onSubmit={handleSubmit}>
      {error && <p className={s.error}>{error}</p>}
      <div className={s.row}>
        <input
          className={s.input}
          placeholder="Сообщение"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className={s.button} disabled={isLoading}>
          ➤
        </button>
      </div>
    </form>
  );
};
