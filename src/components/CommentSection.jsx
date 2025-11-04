import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { MessageCircle, Send, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useCommentStore from "@/store/useCommentStore";

const CommentSection = ({ listingId }) => {
  const { comments, fetchComments, addComment, loading } = useCommentStore();
  const [newComment, setNewComment] = useState("");

  const listingComments = comments[listingId] || [];

  useEffect(() => {
    fetchComments(listingId); // ✅ Only first time per listing
  }, [listingId, fetchComments]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return toast.warn("Please enter a comment");

    try {
      await addComment(listingId, newComment);
      setNewComment("");
      toast.success("Comment added!");
    } catch (err) {
      if (err.response?.status === 401)
        return toast.error("Unauthorized! Please login.");
      toast.error("Failed to post comment");
    }
  };

  return (
    <div className="mt-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-[#4f46e5] text-[#4f46e5] hover:bg-[#4f46e5] hover:text-white transition-all font-medium rounded-full px-4 py-2"
          >
            <MessageCircle size={18} />
            View Comments ({listingComments.length})
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[420px] sm:w-[460px] bg-white shadow-2xl border-l border-[#e6e8f5] rounded-l-2xl pl-2"
        >
          {/* Header */}
          <SheetHeader className="mb-3">
            <SheetTitle className="text-2xl font-bold text-[#4f46e5] tracking-tight">
              💬 Comments
            </SheetTitle>
            <p className="text-sm text-gray-500">
              Join the discussion and share your thoughts
            </p>
          </SheetHeader>

          {/* Comment List */}
          <div className="flex-1 overflow-y-auto max-h-[70vh] pr-2 space-y-3 custom-scrollbar">
            {listingComments.length === 0 ? (
              <p className="text-sm text-[#4f46e5] text-center mt-10 bg-[#f3f4ff] border border-[#e0e1ff] inline-block px-4 py-2 rounded-full shadow-sm">
                💬 No comments yet — be the first to start the conversation!
              </p>

            ) : (
              listingComments.map((cmt) => (
                <div
                  key={cmt._id}
                  className="bg-indigo-500 border border-indigo-500 rounded-lg p-2 hover:shadow-sm transition-all duration-150"
                >
                  {/* Top section */}
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        src={
                          cmt.user?.avatar ||
                          cmt.user?.imageUrl ||
                          "/default-avatar.png"
                        }
                        alt={cmt.user?.name || "User"}
                      />
                      <AvatarFallback>
                        {(cmt.user?.name?.[0] || "U").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-white text-sm">
                      {cmt.user?.name || "Anonymous"}
                    </span>
                    <span className="text-xs text-white ml-auto">
                      {new Date(cmt.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>

                  {/* Comment text */}
                  <p className="text-white text-sm ml-9 leading-snug">
                    {cmt.text}
                  </p>
                </div>

              ))
            )}
          </div>

          {/* Add Comment */}
          <form
            onSubmit={handleAddComment}
            className="flex items-center gap-2 mt-4 border-t border-gray-200 pt-3 sticky bottom-0 bg-white"
          >
            <Input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 rounded-full focus:ring-[#4f46e5] focus:border-[#4f46e5]"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#4f46e5] text-white hover:bg-[#4338ca] rounded-full px-3 py-2 flex items-center gap-1 shadow-sm"
            >
              <Send size={16} />
              {loading ? "..." : "Send"}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );

};

export default CommentSection;