import { useEffect } from "react";
import { api } from "../../api/client";

export const Home = () => {
  useEffect(() => {
    api
      .get("/notes")
      .then((res) => res.data)
      .then((data) => console.log(data));
  }, []);
  return <div>Home</div>;
};
