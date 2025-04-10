import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/use-redux";
import PostsList from "../components/posts/PostsList";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const Profile = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="container y-6">
      <Card className="mb-6 glass-card">
        <CardHeader className="pb-0">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.profilePicture} alt={user.username} />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex justify-around text-center">
            <div>
              <div className="text-lg font-bold">Posts</div>
              <div className="text-muted-foreground">
                <PostsList userPosts={true} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
