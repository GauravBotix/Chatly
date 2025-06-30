const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden  lg:flex items-center min-h-[50vh] justify-center   p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-chat-fourth-900 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold text-text-900 mb-4">{title}</h2>
        <p className="text-text-900">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
