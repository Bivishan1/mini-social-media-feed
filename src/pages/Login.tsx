import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/use-redux";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
};

export default Login;
