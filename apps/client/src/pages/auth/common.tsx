import { Link } from "react-router";

export const AuthFooter = ({
  linkTo,
  isUser,
}: {
  linkTo: string;
  isUser?: boolean;
}) => {
  const desc = isUser ? "Already have an account?" : "Don't have an account?";

  return (
    <div className="mx-auto">
      <p>
        {desc + " Please use "}
        <Link to={"/" + linkTo} className="capitalize underline font-bold">
          {linkTo}
        </Link>
        {" page."}
      </p>
    </div>
  );
};

export const AuthStyles = {
  form: "mx-auto shadow w-1/3 p-2 rounded bg-stone-100 text-stone-800 mt-8",
  input: "my-1 p-2 rounded w-full bg-stone-50 text-stone-950 shadow",
  button:
    "my-1 p-2 rounded w-full bg-stone-950 text-stone-50 shadow cursor-pointer",
};
