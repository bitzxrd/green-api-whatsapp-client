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
