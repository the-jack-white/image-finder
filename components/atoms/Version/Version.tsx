import Package from "../../../package.json";

const Version = () => {
  return (
    <div
      className="flex bg-slate justify-center w-full text-sm text-gray pt-4"
      data-testid="app-version"
    >
      <span>v{Package.version}</span>
    </div>
  );
};

export default Version;
