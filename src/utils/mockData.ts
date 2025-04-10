import { Post } from "@/store/slices/postsSlice";
import { v4 as uuidv4 } from "uuid";

// Sample users
const users = [
  {
    id: "1",
    username: "user",
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "user@example.com",
  },
  {
    id: "2",
    username: "sarah_jones",
    profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "sarah@example.com",
  },
  {
    id: "3",
    username: "tech_guru",
    profilePicture: "https://randomuser.me/api/portraits/men/67.jpg",
    email: "techguru@example.com",
  },
  {
    id: "4",
    username: "travel_lover",
    profilePicture: "https://randomuser.me/api/portraits/women/21.jpg",
    email: "travellover@example.com",
  },
];

// Generate mock posts
export const mockPosts: Post[] = [
  {
    id: uuidv4(),
    content: "Just launched my new portfolio website! Check it out and let me know what you think. #webdev #portfolio",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    user: users[2],
    likes: ["1", "4"],
    comments: [
      {
        id: uuidv4(),
        postId: "1",
        user: users[3],
        content: "Looks amazing! Love the design.",
        timestamp: Date.now() - 3600000,
      },
    ],
    timestamp: Date.now() - 86400000,
  },
  {
    id: uuidv4(),
    content: "Enjoying a beautiful day at the beach. Perfect weather for swimming and building sandcastles!",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    user: users[3],
    likes: ["1", "2"],
    comments: [
      {
        id: uuidv4(),
        postId: "2",
        user: users[1],
        content: "I'm so jealous! Have a great time!",
        timestamp: Date.now() - 7200000,
      },
      {
        id: uuidv4(),
        postId: "2",
        user: users[2],
        content: "Beautiful view! Where is this?",
        timestamp: Date.now() - 5400000,
      },
    ],
    timestamp: Date.now() - 172800000,
  },
  {
    id: uuidv4(),
    content: "Just finished reading an amazing book on artificial intelligence. It really opened my mind to the possibilities of the future.",
    user: users[1],
    likes: ["3"],
    comments: [],
    timestamp: Date.now() - 259200000,
  },
  {
    id: uuidv4(),
    content: "Working on a new project using React and Redux. Learning so much and excited about the possibilities!",
    user: users[0],
    likes: ["2", "3"],
    comments: [
      {
        id: uuidv4(),
        postId: "4",
        user: users[2],
        content: "React is awesome! Let me know if you need any help!",
        timestamp: Date.now() - 10800000,
      },
    ],
    timestamp: Date.now() - 345600000,
  },
];
