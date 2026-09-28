import { logout } from "@/features/auth";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux";

export const ChatPage = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector((s) => s.auth.idInstance);

  return (
    <div>
      <p>Instance: {id}</p>
      <button onClick={() => dispatch(logout())}>Выйти</button>
    </div>
  );
};
