import type { ChatHistoryItem, Message } from "../model/types";

export const mapHistoryItem = (item: ChatHistoryItem): Message | null => {
  const text = item.textMessage ?? item.extendedTextMessage?.text;
  if (!text) return null;

  return {
    id: item.idMessage,
    text,
    out: item.type === "outgoing",
    ts: item.timestamp * 1000,
  };
};
