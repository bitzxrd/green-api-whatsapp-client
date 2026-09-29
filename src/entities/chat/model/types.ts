export interface Message {
  id: string;
  text: string;
  out: boolean;
  ts: number;
}

export interface ChatsState {
  messages: Record<string, Message[]>;
  activeId: string | null;
}

export interface ChatHistoryItem {
  idMessage: string;
  type: "incoming" | "outgoing";
  timestamp: number;
  typeMessage: string;
  textMessage?: string;
  extendedTextMessage?: { text: string };
}

export interface ChatListItem {
  id: string;
  name: string;
  type: "user" | "group" | "supergroup" | "channel";
}
