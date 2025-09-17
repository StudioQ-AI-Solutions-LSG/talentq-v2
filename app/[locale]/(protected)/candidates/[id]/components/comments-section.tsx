"use client";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Comment } from "../../types/candidate-detail-comments-types";

// interface Comment {
//   id: string;
//   author: string;
//   authorRole: string;
//   authorAvatar?: string;
//   content: string;
//   timestamp: string;
//   type: "general" | "technical" | "cultural" | "recommendation";
// }

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment?: (comment: string, type: string) => void;
}

const CommentsSection = ({ comments, onAddComment }: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const [commentType, setCommentType] = useState<
    "general" | "technical" | "cultural" | "recommendation"
  >("general");

  const getTypeColor = (type: string) => {
    switch (type) {
      case "technical":
        return "primary";
      case "cultural":
        return "success";
      case "recommendation":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "technical":
        return "heroicons:code-bracket";
      case "cultural":
        return "heroicons:users";
      case "recommendation":
        return "heroicons:star";
      default:
        return "heroicons:chat-bubble-left-right";
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const handleSubmitComment = () => {
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment.trim(), commentType);
      setNewComment("");
    }
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-normal flex items-center gap-2">
          <Icon
            icon="heroicons:chat-bubble-left-right"
            className="text-primary"
          />
          Comments & Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-6">
        {/* Add New Comment */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-default-900 mb-2 block">
              Add a comment
            </label>
            <Textarea
              placeholder="Share your thoughts about this candidate..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="text-sm font-medium text-default-900 mb-2 block">
                Comment Type
              </label>
              <select
                value={commentType}
                onChange={(e) => setCommentType(e.target.value as any)}
                className="px-3 py-2 border border-default-200 rounded-md text-sm bg-background"
              >
                <option value="general">General</option>
                <option value="technical">Technical</option>
                <option value="cultural">Cultural Fit</option>
                <option value="recommendation">Recommendation</option>
              </select>
            </div>

            <div className="flex-1"></div>

            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              color="primary"
            >
              <Icon icon="heroicons:paper-airplane" className="mr-2" />
              Add Comment
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-default-900 flex items-center gap-2">
            <Icon icon="heroicons:chat-bubble-left-right" className="w-4 h-4" />
            Previous Comments ({comments?.length})
          </h3>

          <div className="space-y-4">
            {comments?.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3 p-4 bg-default-50 rounded-lg"
              >
                <Avatar className="w-10 h-10">
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <Icon
                      icon="heroicons:user"
                      className="w-5 h-5 text-primary"
                    />
                  </div>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-sm font-medium text-default-900">
                      {comment.user_information.name ?? ""}
                    </h4>

                    <Badge
                      color={getTypeColor("general") as any}
                      className="text-xs"
                    >
                      <Icon
                        icon={getTypeIcon("general")}
                        className="w-3 h-3 mr-1"
                      />
                      {"general"}
                    </Badge>
                  </div>

                  <p className="text-sm text-default-600 mb-2 leading-relaxed">
                    {comment.comment}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-default-500">
                    <Icon icon="heroicons:clock" className="w-3 h-3" />
                    {formatTimestamp(comment.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Types Legend */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium text-default-900 mb-3">
            Comment Types
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 text-xs">
              <Badge color="primary" className="text-xs">
                <Icon icon="heroicons:code-bracket" className="w-3 h-3 mr-1" />
                Technical
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Badge color="success" className="text-xs">
                <Icon icon="heroicons:users" className="w-3 h-3 mr-1" />
                Cultural
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Badge color="warning" className="text-xs">
                <Icon icon="heroicons:star" className="w-3 h-3 mr-1" />
                Recommendation
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Badge color="secondary" className="text-xs">
                <Icon
                  icon="heroicons:chat-bubble-left-right"
                  className="w-3 h-3 mr-1"
                />
                General
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentsSection;
