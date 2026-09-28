import { useState } from "react";
import type { FormEvent } from "react";
import { addChat } from "@/entities/chat";
import { useAppDispatch } from "@/shared/lib/redux";
import s from "./CreateChatForm.module.scss";

export const CreateChatForm = () => {
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) return;
    dispatch(addChat(digits));
    setPhone("");
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        className={s.input}
        placeholder="Номер телефона"
        inputMode="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button className={s.button}>Новый чат</button>
    </form>
  );
};
