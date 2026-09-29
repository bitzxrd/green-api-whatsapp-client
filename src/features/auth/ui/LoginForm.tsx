import { useState } from "react";
import type { FormEvent } from "react";
import { useAppDispatch } from "@/shared/lib/redux";
import { login } from "../model/authSlice";
import { useLazyCheckCredentialsQuery } from "../api/authApi";
import s from "./LoginForm.module.scss";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [checkCredentials, { isFetching }] = useLazyCheckCredentialsQuery();
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const creds = {
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
    };

    try {
      const { stateInstance } = await checkCredentials(creds).unwrap();
      if (!stateInstance) throw new Error("empty state");
      dispatch(login(creds));
    } catch {
      setError("Неверный idInstance или apiTokenInstance");
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h1 className={s.title}>GREEN-API</h1>
      {error && <p className={s.error}>{error}</p>}
      <input
        className={s.input}
        placeholder="idInstance"
        inputMode="numeric"
        pattern="\d{4,}"
        title="Только цифры, минимум 4"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
        required
      />
      <input
        className={s.input}
        placeholder="apiTokenInstance"
        pattern="[A-Za-z0-9]+"
        title="Только латинские буквы и цифры"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
        required
      />
      <button className={s.button} disabled={isFetching}>
        {isFetching ? "Проверка..." : "Войти"}
      </button>
    </form>
  );
};
