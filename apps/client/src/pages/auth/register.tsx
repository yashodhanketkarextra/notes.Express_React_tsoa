import { useState } from "react";
import { api } from "../../api/client";
import { useNavigate } from "react-router";
import { AuthFooter, AuthStyles } from "./common";

export const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (
    e: React.SubmitEvent<HTMLFormElement>,
    email: string,
    password: string,
    cnfPassword: string,
  ) => {
    e.preventDefault();

    if (!name || !password || !cnfPassword) {
      setError("*All fields are required");
      return;
    }

    if (password !== cnfPassword) {
      setError("Passwords do not match");
      return;
    }

    api
      .post("/users", { email, password })
      .then((res) => res.data)
      .then((data) => {
        localStorage?.setItem("token", data.token);
        navigate({ pathname: "/" }, { replace: true });
      })
      .catch((err) => setError(err?.message));
  };

  const handleReset = () => {
    setName("");
    setPassword("");
    setCnfPassword("");
    setError("");
  };

  return (
    <div className={AuthStyles.form}>
      <h2 className="p-4 font-bold">Registrations Form</h2>
      <form
        className="p-4"
        onSubmit={(e) => handleSubmit(e, name, password, cnfPassword)}
        onChange={() => error && setError("")}
        onReset={handleReset}
      >
        <label htmlFor="login-name">Username</label>
        <input
          id="login-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <label htmlFor="login-cnfpassword">Confirm Password</label>
        <input
          id="login-cnfpassword"
          type="password"
          value={cnfPassword}
          onChange={(e) => setCnfPassword(e.target.value)}
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
        <AuthFooter linkTo="login" isUser />
      </form>
    </div>
  );
};
