import { Link, Navigate } from "react-router";

type LinkType = {
  name: string;
  href: string;
};

const common: LinkType[] = [{ name: "Home", href: "/" }];

const loggedout: LinkType[] = [
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
];

const loggedin: LinkType[] = [{ name: "Notes", href: "/notes" }];

export const Navbar = () => {
  const hasToken = !!localStorage.getItem("token");

  return (
    <nav>
      <ul className="inline-flex gap-2">
        {common.map((link) => (
          <LinkFactory key={link.name} link={link} />
        ))}
        {hasToken ? (
          <>
            {loggedin.map((link) => (
              <LinkFactory key={link.name} link={link} />
            ))}
            <LogoutButton />
          </>
        ) : (
          loggedout.map((link) => <LinkFactory key={link.name} link={link} />)
        )}
      </ul>
    </nav>
  );
};

const LogoutButton = () => {
  const handleLogout = async () => {
    localStorage.removeItem("token");
    return Navigate({ to: "/", replace: true });
  };

  return (
    <button className="hover:text-white cursor-pointer" onClick={handleLogout}>
      Logout
    </button>
  );
};

const LinkFactory = ({ link }: { link: LinkType }) => {
  return (
    <li className="hover:text-white">
      <Link to={link.href}>{link.name}</Link>{" "}
    </li>
  );
};
