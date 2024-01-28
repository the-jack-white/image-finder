const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="bg-red-300 h-dvh flex flex-col gap-4 items-center"
      data-testid="app-container"
    >
      {children}
    </main>
  );
};

export default AppContainer;
