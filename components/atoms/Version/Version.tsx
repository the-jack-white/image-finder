import Package from "../../../package.json";

const Version = () => {
  return (
    <div className="flex justify-center w-full text-sm text-gray">
      <span>v{Package.version}</span>
    </div>
  );
};

export default Version;
