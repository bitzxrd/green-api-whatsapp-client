import { greenApi } from "@/shared/api/greenApi";

export interface Notification {
  receiptId: number;
  body: {
    typeWebhook: string;
    idMessage?: string;
    timestamp?: number;
    senderData?: { chatId: string };
    messageData?: {
      typeMessage: string;
      textMessageData?: { textMessage: string };
      extendedTextMessageData?: { text: string };
    };
  };
}

export const receiveApi = greenApi.injectEndpoints({
  endpoints: (build) => ({
    receiveNotification: build.query<Notification | null, void>({
      query: () => "receiveNotification/:token?receiveTimeout=10",
    }),
    deleteNotification: build.mutation<unknown, number>({
      query: (receiptId) => ({
        url: `deleteNotification/:token/${receiptId}`,
        method: "DELETE",
      }),
    }),
  }),
});
