import { useAppSelector } from "@/shared/lib/redux";

export const App = () => {
  const id = useAppSelector((s) => s.auth.idInstance);
  return <div>{id || "not authorized"}</div>;
};
