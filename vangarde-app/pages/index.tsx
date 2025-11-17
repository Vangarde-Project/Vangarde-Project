import dynamic from "next/dynamic";

const LoginFeature = dynamic(() => import("./login"), { ssr: false });

export default function Home() {
  return <LoginFeature />;
}
