import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/use-redux";
import CreatePostForm from "../components/posts/CreatePostForm";
import PostsList from "../components/posts/PostsList";

const Index = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Home Feed</h1>
      <CreatePostForm />
      <PostsList />
    </div>
  );
};

export default Index;
