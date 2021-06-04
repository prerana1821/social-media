import { Navigate, Route } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "./authSlice";

export type PrivateRouteProps = {
  path: string;
  element: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

export const PrivateRoute = ({ path, element }: PrivateRouteProps) => {
  const auth = useAppSelector(selectAuth);
  return auth.token ? (
    <Route element={element} path={path} />
  ) : (
    <Navigate replace state={{ from: path }} to='/login' />
  );
};
