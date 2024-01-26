const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-red-300 h-dvh" data-testid="app-container">
      {children}
    </main>
  );
};

export default AppContainer;
