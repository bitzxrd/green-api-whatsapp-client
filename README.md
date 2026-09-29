# Green API WhatsApp Client

Веб-интерфейс для отправки и приёма текстовых сообщений в WhatsApp через [GREEN-API](https://green-api.com).
Тестовое задание на позицию "Фронтенд разработчик React".

## Стек

- React + TypeScript (Vite)
- Redux Toolkit + RTK Query
- SCSS (mobile-first)
- Упрощённая FSD-архитектура

## Как это работает

1. Пользователь вводит `idInstance` и `apiTokenInstance` от своего аккаунта GREEN-API. Перед входом креды проверяются запросом [GetStateInstance](https://green-api.com/docs/api/account/GetStateInstance/).
2. Создаёт чат по номеру телефона получателя.
3. При открытии чата подгружается история переписки методом [GetChatHistory](https://green-api.com/docs/api/journals/GetChatHistory/).
4. Отправка новых сообщений — методом [SendMessage](https://green-api.com/docs/api/sending/SendMessage/).
5. Приём сообщений — long polling методами [ReceiveNotification / DeleteNotification](https://green-api.com/docs/api/receiving/technology-http-api/).

Креды и локальная копия переписки хранятся в `localStorage` браузера, сервера на бэкенде нет.

## Требования

- [Node.js](https://nodejs.org/) версии 18 или новее (проверить: `node -v`)
- npm (устанавливается вместе с Node.js)

## Запуск локально

```bash
git clone <ссылка на репозиторий>
cd green-api-whatsapp-client
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`.

Перед первым входом:
1. Зарегистрируйтесь на [green-api.com](https://green-api.com), создайте инстанс и привяжите его к WhatsApp через QR-код.
2. В настройках инстанса (`SetSettings`) поле `webhookUrl` должно быть **пустым** — иначе входящие уведомления не попадут в очередь для `ReceiveNotification`.
3. На странице входа введите `idInstance` и `apiTokenInstance` из личного кабинета.

## Сборка

```bash
npm run build
```

Собранные файлы окажутся в `dist/`.

## Известные ограничения

- Бесплатный тариф "Разработчик" ограничивает взаимодействие тремя чатами на инстанс.
- Поддерживаются только текстовые сообщения, как указано в задании.