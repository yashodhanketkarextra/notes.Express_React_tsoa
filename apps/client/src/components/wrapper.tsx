import { Footer } from "./footer";
import { Header } from "./header";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <Header />
      <main className="mb-auto">{children}</main>
      <Footer />
    </div>
  );
};
