'use client'
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface ActionButtonsProps {
  onInterview?: () => void;
  onReject?: () => void;
  onApprove?: () => void;
  currentStatus?: "in_progress" | "interview" | "accepted" | "rejected";
  disabled?: boolean;
}

const ActionButtons = ({
  onInterview,
  onReject,
  onApprove,
  currentStatus = "in_progress",
  disabled = false
}: ActionButtonsProps) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleAction = async (action: string, callback?: () => void) => {
    if (!callback) return;
    setIsLoading(action);
    try {
      await callback();
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
    } finally {
      setIsLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "success";
      case "rejected": return "destructive";
      case "interview": return "primary";
      case "in_progress": return "success";
      default: return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted": return "heroicons:check-circle";
      case "rejected": return "heroicons:x-circle";
      case "interview": return "heroicons:video-camera";
      case "in_progress": return "heroicons:clock";
      default: return "heroicons:clock";
    }
  };

  return (
    <div className="space-y-7">
      {/* Current Status */}
{/*       <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-default-50 rounded-lg">
          <Icon 
            icon={getStatusIcon(currentStatus)} 
            className={`w-5 h-5 text-${getStatusColor(currentStatus)}-500`}
          />
          <span className="text-sm font-medium text-default-900 capitalize">
            Status: {currentStatus}
          </span>
        </div>
      </div> */}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Interview Button */}
        <Button
          onClick={() => handleAction("interview", onInterview)}
          disabled={disabled || isLoading === "interview" || currentStatus === "interview"}
          fullWidth
          size="lg"
          className="flex items-center justify-center gap-2 min-h-[44px]
                     !bg-blue-100 !text-blue-600 !border !border-blue-200 
                     hover:!bg-blue-200 hover:!text-blue-700 hover:!border-blue-300
                     focus-visible:!ring-0 focus-visible:!ring-offset-0 !shadow-none"
        >
          {isLoading === "interview" ? (
            <Icon icon="heroicons:arrow-path" className="w-5 h-5 animate-spin" />
          ) : (
            <Icon icon="heroicons:video-camera" className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">
            {isLoading === "interview" ? "Processing..." : "Interview"}
          </span>
        </Button>

        {/* Approve Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={disabled || isLoading === "approve" || currentStatus === "accepted"}
              fullWidth
              size="lg"
              className="flex items-center justify-center gap-2 min-h-[44px]
                          !bg-green-100 !text-green-600 !border !border-green-200
                          hover:!bg-green-200 hover:!text-green-700 hover:!border-green-300
                          focus-visible:!ring-0 focus-visible:!ring-offset-0 !shadow-none"
            >
              {isLoading === "approve" ? (
                <Icon icon="heroicons:arrow-path" className="w-5 h-5 animate-spin" />
              ) : (
                <Icon icon="heroicons:check-circle" className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">
                {isLoading === "approve" ? "Processing..." : "Accept"}
              </span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Icon icon="heroicons:check-circle" className="w-5 h-5 text-success" />
                Accept Candidate
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to accept this candidate? This action will move them to the next stage of the hiring process.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleAction("approve", onApprove)}
                className="bg-success hover:bg-success/90"
              >
                Yes, Accept
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Reject Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={disabled || isLoading === "reject" || currentStatus === "rejected"}
              fullWidth
              size="lg"
              className="flex items-center justify-center gap-2 min-h-[44px]
                          !bg-red-100 !text-red-600 !border !border-red-200
                          hover:!bg-red-200 hover:!text-red-700 hover:!border-red-300
                          focus-visible:!ring-0 focus-visible:!ring-offset-0 !shadow-none"
            >
              {isLoading === "reject" ? (
                <Icon icon="heroicons:arrow-path" className="w-5 h-5 animate-spin" />
              ) : (
                <Icon icon="heroicons:x-circle" className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">
                {isLoading === "reject" ? "Processing..." : "Reject"}
              </span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Icon icon="heroicons:x-circle" className="w-5 h-5 text-destructive" />
                Reject Candidate
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to reject this candidate? This action cannot be undone and will remove them from the current hiring process.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleAction("reject", onReject)}
                className="bg-destructive hover:bg-destructive/90"
              >
                Yes, Reject
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Action Guidelines */}
      <div className="flex justify-center">
        <div className="inline-block p-4 bg-info/10 rounded-lg border border-info/20 text-left max-w-md w-full">
          <div className="flex items-center gap-2 text-sm text-info mb-2">
            <Icon icon="heroicons:information-circle" className="w-4 h-4" />
            <span className="font-medium">Action Guidelines</span>
          </div>
          <div className="text-xs text-info/80 space-y-1">
            <p>• <strong>Interview:</strong> Schedule a meeting to further evaluate the candidate</p>
            <p>• <strong>Accept:</strong> Move candidate to the next stage of hiring</p>
            <p>• <strong>Reject:</strong> Remove candidate from current consideration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
