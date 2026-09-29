export {
  default as chatsReducer,
  addChat,
  addMessage,
  setActiveChat,
  resetChats,
  CHATS_STORAGE_KEY,
} from "./model/chatsSlice";
export type { ChatsState, Message } from "./model/types";
export { ChatList } from "./ui/ChatList";
export { MessageBubble } from "./ui/MessageBubble";
