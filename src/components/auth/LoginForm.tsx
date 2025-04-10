import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { useAppDispatch, useAppSelector } from "../../hooks/use-redux";
import { loginStart, loginSuccess, loginFailure } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Mock credentials
const MOCK_CREDENTIALS = {
  username: "user",
  password: "password",
  id: "1",
  profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
  email: "user@example.com",
};

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    dispatch(loginStart());
    
    // Simulate API call with delay
    setTimeout(() => {
      if (username === MOCK_CREDENTIALS.username && password === MOCK_CREDENTIALS.password) {
        dispatch(loginSuccess({
          id: MOCK_CREDENTIALS.id,
          username: MOCK_CREDENTIALS.username,
          profilePicture: MOCK_CREDENTIALS.profilePicture,
          email: MOCK_CREDENTIALS.email,
        }));
        toast.success("Login successful!");
        navigate("/");
      } else {
        dispatch(loginFailure("Invalid username or password"));
        toast.error("Invalid username or password");
      }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md glass-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
              disabled={isLoading}
            />
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-gray-500 dark:text-gray-400">
        <p>Use username: "user" and password: "password"</p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
