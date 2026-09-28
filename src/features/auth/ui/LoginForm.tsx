import { useState } from "react";
import type { FormEvent } from "react";
import { useAppDispatch } from "@/shared/lib/redux";
import { login } from "../model/authSlice";
import s from "./LoginForm.module.scss";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      login({
        idInstance: idInstance.trim(),
        apiTokenInstance: apiTokenInstance.trim(),
      }),
    );
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h1 className={s.title}>GREEN-API</h1>
      <input
        className={s.input}
        placeholder="idInstance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
        required
      />
      <input
        className={s.input}
        placeholder="apiTokenInstance"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
        required
      />
      <button className={s.button}>Войти</button>
    </form>
  );
};
