export function LoginCard({ title, children }) {
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}
