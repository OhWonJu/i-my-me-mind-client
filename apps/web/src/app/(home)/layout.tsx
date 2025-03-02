import { Background, BackgroundNode } from "./_components";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex flex-col justify-center items-center bg-background w-screen h-screen overflow-hidden">
      <Background />
      <BackgroundNode />
      {children}
    </main>
  );
};

export default HomeLayout;
