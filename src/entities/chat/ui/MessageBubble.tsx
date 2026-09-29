import s from "./MessageBubble.module.scss";
import type { Message } from "../model/types";

export const MessageBubble = ({ message }: { message: Message }) => (
  <div className={`${s.bubble} ${message.out ? s["bubble--out"] : ""}`}>
    {message.text}
  </div>
);
