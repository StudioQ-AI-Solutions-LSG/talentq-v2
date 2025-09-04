'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";

interface StatusChange {
  id: string;
  status: "in_progress" | "interview" | "accepted" | "rejected" | "hired" | "withdrawn";
  changedBy: string;
  changedByRole: string;
  changedByAvatar?: string;
  timestamp: string;
  reason?: string;
  notes?: string;
}

interface StatusHistoryProps {
  statusHistory?: StatusChange[];
}

const StatusHistory = ({
  statusHistory = [
    {
      id: "1",
      status: "in_progress",
      changedBy: "System",
      changedByRole: "Automated",
      timestamp: "2024-01-10T09:00:00Z",
      reason: "Application submitted",
      notes: "Candidate applied for the position"
    },
    {
      id: "2",
      status: "interview",
      changedBy: "Sarah Johnson",
      changedByRole: "Technical Lead",
      changedByAvatar: "/images/avatar/avatar-1.jpg",
      timestamp: "2024-01-12T14:30:00Z",
      reason: "Initial screening passed",
      notes: "Technical skills assessment completed successfully"
    },
    {
      id: "3",
      status: "accepted",
      changedBy: "Mike Chen",
      changedByRole: "HR Manager",
      changedByAvatar: "/images/avatar/avatar-2.jpg",
      timestamp: "2024-01-15T16:45:00Z",
      reason: "Interview completed",
      notes: "Strong cultural fit and technical competency demonstrated"
    },
    {
      id: "4",
      status: "rejected",
      changedBy: "Emily Rodriguez",
      changedByRole: "Senior Developer",
      changedByAvatar: "/images/avatar/avatar-3.jpg",
      timestamp: "2024-01-16T11:20:00Z",
      reason: "Final review",
      notes: "Candidate withdrew application"
    }
  ]
}: StatusHistoryProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "success";
      case "rejected": return "destructive";
      case "interview": return "primary";
      case "in_progress": return "success";
      case "hired": return "info";
      case "withdrawn": return "secondary";
      default: return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted": return "heroicons:check-circle";
      case "rejected": return "heroicons:x-circle";
      case "interview": return "heroicons:video-camera";
      case "in_progress": return "heroicons:clock";
      case "hired": return "heroicons:user-plus";
      case "withdrawn": return "heroicons:user-minus";
      default: return "heroicons:clock";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in_progress": return "New";
      case "interview": return "Interview";
      case "accepted": return "Accepted";
      case "rejected": return "Rejected";
      case "hired": return "Hired";
      case "withdrawn": return "Withdrawn";
      default: return status;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-normal flex items-center gap-2">
          <Icon icon="heroicons:clock" className="text-primary" />
          Status History
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {statusHistory.map((change, index) => {
            const { date, time } = formatTimestamp(change.timestamp);
            
            return (
              <div key={change.id} className="p-3 border border-default-200 rounded-lg bg-default-50/50">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    {change.changedByAvatar ? (
                      <img src={change.changedByAvatar} alt={change.changedBy} />
                    ) : (
                      <div className="w-full h-full bg-default-200 flex items-center justify-center">
                        <Icon icon="heroicons:user" className="w-5 h-5 text-default-500" />
                      </div>
                    )}
                  </Avatar>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-default-900 truncate">
                            {change.changedBy}
                          </span>
                        </div>
                        <span className="text-xs text-default-500">
                          {change.changedByRole}
                        </span>
                      </div>
                      
                      {/* Status Badge */}
                      <div className="flex-shrink-0 ml-2">
                        <Badge 
                          color={getStatusColor(change.status) as any}
                          className="text-xs flex items-center gap-1"
                        >
                          <Icon icon={getStatusIcon(change.status)} className="w-3 h-3" />
                          {getStatusLabel(change.status)}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Date and Time */}
                    <div className="text-xs text-default-500 mb-2">
                      <span>{date} at {time}</span>
                    </div>
                    
                    {/* Notes */}
                    {change.notes && (
                      <div className="p-2 bg-white rounded border border-default-200">
                        <div className="text-xs text-default-600 leading-relaxed">
                          {change.notes}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="pt-4 border-t mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {statusHistory.length}
              </div>
              <div className="text-xs text-default-500">Total Changes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {statusHistory.filter(s => s.status === "accepted").length}
              </div>
              <div className="text-xs text-default-500">Accepted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {statusHistory.filter(s => s.status === "interview").length}
              </div>
              <div className="text-xs text-default-500">Interviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">
                {statusHistory.filter(s => s.status === "rejected").length}
              </div>
              <div className="text-xs text-default-500">Rejections</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusHistory;
