export default function LoadingState() {
  return (
    <div className="flex justify-center items-center min-h-[250px] -mt-10">
      <div className="text-center text-gray-600 dark:text-gray-400">
        <span className="flex gap-1" style={{ fontFamily: "Marzaki" }}>
          <span
            className="animate-bounce text-[175px]"
            style={{ animationDelay: "0s" }}
          >
            .
          </span>
          <span
            className="animate-bounce text-[175px]"
            style={{ animationDelay: "0.2s" }}
          >
            .
          </span>
          <span
            className="animate-bounce text-[175px]"
            style={{ animationDelay: "0.4s" }}
          >
            .
          </span>
        </span>
      </div>
    </div>
  );
}
