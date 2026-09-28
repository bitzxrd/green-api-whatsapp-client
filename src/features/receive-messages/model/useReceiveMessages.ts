import { useEffect } from "react";
import { addMessage } from "@/entities/chat";
import { useAppDispatch } from "@/shared/lib/redux";
import { receiveApi } from "../api/receiveApi";
import type { Notification } from "../api/receiveApi";

const MIN_INTERVAL = 2000;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const getText = (data?: Notification["body"]["messageData"]) =>
  data?.textMessageData?.textMessage ?? data?.extendedTextMessageData?.text;

export const useReceiveMessages = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let stopped = false;

    const poll = async () => {
      while (!stopped) {
        const startedAt = Date.now();
        let gotNotification = false;

        try {
          const n = await dispatch(
            receiveApi.endpoints.receiveNotification.initiate(undefined, {
              forceRefetch: true,
              subscribe: false,
            }),
          ).unwrap();

          if (n && !stopped) {
            gotNotification = true;
            const { body } = n;
            console.log(body.typeWebhook, body);

            const chatId = body.senderData?.chatId;
            const text = getText(body.messageData);

            if (
              body.typeWebhook === "incomingMessageReceived" &&
              chatId?.endsWith("@c.us") &&
              text &&
              body.idMessage
            ) {
              dispatch(
                addMessage({
                  phone: chatId.replace("@c.us", ""),
                  message: {
                    id: body.idMessage,
                    text,
                    out: false,
                    ts: (body.timestamp ?? Date.now() / 1000) * 1000,
                  },
                }),
              );
            }

            await dispatch(
              receiveApi.endpoints.deleteNotification.initiate(n.receiptId),
            ).unwrap();
          }
        } catch {
          await sleep(3000);
        }

        const elapsed = Date.now() - startedAt;
        if (!gotNotification && elapsed < MIN_INTERVAL)
          await sleep(MIN_INTERVAL - elapsed);
      }
    };

    poll();
    return () => {
      stopped = true;
    };
  }, [dispatch]);
};
