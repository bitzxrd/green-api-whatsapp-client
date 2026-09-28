import { ChatPage } from "@/pages/chat";
import { LoginPage } from "@/pages/login";
import { useAppSelector } from "@/shared/lib/redux";

export const App = () => {
  const isAuth = useAppSelector((s) => !!s.auth.idInstance);
  return isAuth ? <ChatPage /> : <LoginPage />;
};
