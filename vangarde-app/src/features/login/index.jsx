import LoginForm from "./components/ui/LoginCard";
import { LoginCard } from "@/components/ui/LoginCard";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* LoginCard komt uit de component-library */}
      <LoginCard title="Vangarde Login">
        {/* LoginForm is je eigen formuliercomponent */}
        <LoginForm />
      </LoginCard>
    </div>
  );
}
