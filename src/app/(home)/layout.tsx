import Header from "@/modules/home/ui/components/header";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
    </>
  );
};

export default HomeLayout;
