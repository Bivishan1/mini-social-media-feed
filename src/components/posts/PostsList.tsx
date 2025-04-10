import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/use-redux";
import { fetchPostsStart, fetchPostsSuccess } from "../../store/slices/postsSlice";
import PostCard from "./PostCard";
import { mockPosts } from "../../utils/mockData";

const PostsList = ({ userPosts = false }: { userPosts?: boolean }) => {
  const dispatch = useAppDispatch();
  const { posts, isLoading } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPostsStart());

      // Simulate API call to fetch posts
      setTimeout(() => {
        dispatch(fetchPostsSuccess(mockPosts));
      }, 1000);
    }
  }, [dispatch, posts.length]);

  const filteredPosts =
    userPosts && user
      ? posts.filter((post) => post.user.id === user.id)
      : posts;

  if (isLoading && posts.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse p-4 rounded-xl glass-card">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div>
                <div className="h-3 w-24 bg-muted rounded"></div>
                <div className="h-2 w-16 bg-muted rounded mt-2"></div>
              </div>
            </div>
            <div className="space-y-2 mt-3">
              <div className="h-3 bg-muted rounded"></div>
              <div className="h-3 bg-muted rounded w-5/6"></div>
              <div className="h-40 bg-muted rounded mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredPosts.length === 0 && !isLoading) {
    return (
      <div className="text-center p-8">
        <h3 className="font-semibold text-lg">No posts found</h3>
        <p className="text-muted-foreground">
          {userPosts
            ? "You haven't created any posts yet."
            : "There are no posts to display."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
