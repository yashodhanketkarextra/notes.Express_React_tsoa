export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col md:flex-row justify-between items-center p-2 h-[5vh]">
      <p>Notes</p>
      <p>&copy; {year} Yashodhan Ketkar.</p>
    </footer>
  );
};
