import { useState } from "react";
import { api } from "../../api/client";
import { useNavigate } from "react-router";
import { AuthFooter, AuthStyles } from "./common";

export const Login = () => {
  const [name, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !password) {
      setError("*All fields are required");
      return;
    }

    api
      .post("/users/login", { name, password })
      .then((res) => res.data)
      .then((data) => {
        localStorage?.setItem("token", data.token);
        navigate({ pathname: "/" }, { replace: true });
      })
      .catch((err) => setError(err?.message));
  };

  return (
    <div className={AuthStyles.form}>
      <h2 className="p-4 font-bold">Login Form</h2>
      <form
        className="p-4"
        onSubmit={handleSubmit}
        onChange={() => error && setError("")}
      >
        <label htmlFor="login-name">Username</label>
        <input
          id="login-name"
          type="text"
          value={name}
          onChange={(e) => setEmail(e.target.value)}
          className={AuthStyles.input}
        />
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={AuthStyles.input}
        />
        <div className="flex flex-col md:flex-row gap-2 justify-center">
          <button className={AuthStyles.button} type="submit">
            Login
          </button>
          <button className={AuthStyles.button} type="reset">
            Reset
          </button>
        </div>
        <div>
          {error && (
            <p className="text-red-500 text-sm text-center italic">{error}</p>
          )}
        </div>
        <AuthFooter linkTo="register" />
      </form>
    </div>
  );
};
