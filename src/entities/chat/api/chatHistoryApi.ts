import { greenApi } from "@/shared/api/greenApi";
import type { ChatHistoryItem } from "../model/types";

export const chatHistoryApi = greenApi.injectEndpoints({
  endpoints: (build) => ({
    getChatHistory: build.query<ChatHistoryItem[], string>({
      query: (phone) => ({
        url: "getChatHistory/:token",
        method: "POST",
        body: { chatId: `${phone}@c.us`, count: 50 },
      }),
    }),
  }),
});

export const { useLazyGetChatHistoryQuery } = chatHistoryApi;
