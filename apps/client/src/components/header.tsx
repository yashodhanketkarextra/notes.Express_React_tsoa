import { Navbar } from "./navbar";

export const Header = () => {
  return (
    <header
      className="flex flex-col md:flex-row justify-between items-center p-4 h-[5vh]
      bg-stone-800 text-stone-300
      "
    >
      <p className="font-bold text-lg">Notes</p>
      <Navbar />
    </header>
  );
};
