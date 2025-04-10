import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./authSlice";

export interface Comment {
  id: string;
  postId: string;
  user: User;
  content: string;
  timestamp: number;
}

export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  user: User;
  likes: string[]; // Array of user IDs who liked the post
  comments: Comment[];
  timestamp: number;
}

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPostsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.isLoading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.posts = [action.payload, ...state.posts];
    },
    toggleLike(state, action: PayloadAction<{ postId: string; userId: string }>) {
      const { postId, userId } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      
      if (post) {
        const likeIndex = post.likes.indexOf(userId);
        if (likeIndex > -1) {
          // User has already liked, remove like
          post.likes.splice(likeIndex, 1);
        } else {
          // User hasn't liked, add like
          post.likes.push(userId);
        }
      }
    },
    addComment(state, action: PayloadAction<Comment>) {
      const { postId, id, user, content, timestamp } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      
      if (post) {
        post.comments.push({
          id,
          postId,
          user,
          content,
          timestamp,
        });
      }
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPost,
  toggleLike,
  addComment,
} = postsSlice.actions;
export default postsSlice.reducer;
