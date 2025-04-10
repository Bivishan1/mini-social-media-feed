import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/use-redux";
import { addPost } from "../../store/slices/postsSlice";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Image } from "lucide-react";
import { toast } from "sonner";

const CreatePostForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() && !image) {
      toast.error("Please add some content or image");
      return;
    }

    if (!user) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      dispatch(
        addPost({
          id: uuidv4(),
          content,
          imageUrl: image || undefined,
          user,
          likes: [],
          comments: [],
          timestamp: Date.now(),
        })
      );

      setContent("");
      setImage(null);
      setIsSubmitting(false);
      toast.success("Post created successfully!");
    }, 500);
  };

  return (
    <Card className="mb-6 glass-card">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4">
          <div className="flex space-x-3 mb-3">
            {user && (
              <Avatar>
                <AvatarImage src={user.profilePicture} alt={user.username} />
                <AvatarFallback>
                  {user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 resize-none"
              rows={2}
            />
          </div>

          {image && (
            <div className="relative mt-2">
              <img
                src={image}
                alt="Selected"
                className="w-full h-auto rounded-md max-h-60 object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                onClick={() => setImage(null)}
              >
                ×
              </Button>
            </div>
          )}
        </CardContent>

        <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="h-4 w-4 mr-1" /> Add Image
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </Button>

          <Button
            type="submit"
            disabled={(!content.trim() && !image) || isSubmitting}
            size="sm"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreatePostForm;
