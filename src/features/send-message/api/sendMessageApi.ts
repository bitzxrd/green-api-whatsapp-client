import { greenApi } from "@/shared/api/greenApi";

interface SendMessageArg {
  phone: string;
  message: string;
}

interface SendMessageRes {
  idMessage: string;
}

export const sendMessageApi = greenApi.injectEndpoints({
  endpoints: (build) => ({
    sendMessage: build.mutation<SendMessageRes, SendMessageArg>({
      query: ({ phone, message }) => ({
        url: "sendMessage/:token",
        method: "POST",
        body: { chatId: `${phone}@c.us`, message },
      }),
    }),
  }),
});

export const { useSendMessageMutation } = sendMessageApi;
