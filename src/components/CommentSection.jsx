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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useCommentStore from "@/store/useCommentStore";

const CommentSection = ({ listingId }) => {
  const { comments, fetchComments, addComment, loading } = useCommentStore();
  const [newComment, setNewComment] = useState("");
  const [open, setOpen] = useState(false);



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
      setOpen(false);
    } catch (err) {
      if (err.response?.status === 401)
        return toast.error("Unauthorized! Please login.");
      toast.error("Failed to post comment");
      setOpen(false);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="mt-4">

      <Dialog open={open} onOpenChange={setOpen}>
        {/* ✅ Trigger button */}
        <DialogTrigger asChild>
          <Button className=" bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-full shadow-lg flex items-center gap-2 px-4 py-2">
            <MessageCircle size={18} />
            Add Comment ({listingComments.length})
          </Button>
        </DialogTrigger>

        {/* ✅ Dialog content */}
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>     Write a comment </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddComment} className="space-y-4 mt-3">
            <Input
              type="text"
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="focus:ring-[#4f46e5] focus:border-[#4f46e5]"
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#4f46e5] text-white hover:bg-[#4338ca] flex items-center gap-2"
              >
                <Send size={16} />
                {loading ? "Sending..." : "Send"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>


    </div>
  );

};

export default CommentSection;