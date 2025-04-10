import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/use-redux";
import { toggleLike, addComment, Post } from "../../store/slices/postsSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Heart, MessageCircle, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [commentText, setCommentText] = useState("");
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const isLiked = user ? post.likes.includes(user.id) : false;

  const handleLike = () => {
    if (user) {
      dispatch(toggleLike({ postId: post.id, userId: user.id }));
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() && user) {
      dispatch(
        addComment({
          id: uuidv4(),
          postId: post.id,
          user,
          content: commentText,
          timestamp: Date.now(),
        })
      );
      setCommentText("");
    }
  };

  return (
    <Card className="mb-4 overflow-hidden glass-card">
      <CardHeader className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage
              src={post.user.profilePicture}
              alt={post.user.username}
            />
            <AvatarFallback>
              {post.user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{post.user.username}</div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(post.timestamp, { addSuffix: true })}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="text-sm mb-4">{post.content}</p>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="Post image"
            className="w-full h-auto rounded-md object-cover"
          />
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`px-2 ${isLiked ? "text-red-500" : ""}`}
            >
              <Heart
                className={`h-4 w-4 mr-1 ${isLiked ? "fill-red-500" : ""}`}
              />
              {post.likes.length}
            </Button>

            <Collapsible open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {post.comments.length}
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          </div>
        </div>

        <Collapsible open={isCommentsOpen} className="w-full">
          <CollapsibleContent className="mt-2">
            {post.comments.length > 0 && (
              <div className="space-y-2 max-h-60 overflow-y-auto mb-3 p-2 bg-background/50 rounded-md">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={comment.user.profilePicture}
                        alt={comment.user.username}
                      />
                      <AvatarFallback>
                        {comment.user.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="text-xs font-semibold">
                          {comment.user.username}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {formatDistanceToNow(comment.timestamp, {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="text-xs">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {user && (
              <form
                onSubmit={handleAddComment}
                className="flex items-center gap-2 mt-2"
              >
                <Input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 h-8 text-sm"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-8 w-8"
                  disabled={!commentText.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
