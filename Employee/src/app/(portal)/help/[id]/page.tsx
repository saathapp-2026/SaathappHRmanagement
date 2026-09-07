"use client";
import { useEffect, useState, use } from "react";
import { helpService, HelpRequest, HelpRequestMessage } from "@/services/employee/help.service";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Send, AlertCircle, Paperclip } from "lucide-react";

export default function HelpRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [ticket, setTicket] = useState<HelpRequest | null>(null);
  const [messages, setMessages] = useState<HelpRequestMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [ticketData, messagesData] = await Promise.all([
          helpService.getHelpRequestById(resolvedParams.id),
          helpService.getHelpRequestMessages(resolvedParams.id)
        ]);
        setTicket(ticketData);
        setMessages(messagesData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [resolvedParams.id]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() && !file) return;
    setIsReplying(true);
    try {
      let finalMessage = replyText;
      if (file) {
        const url = await helpService.uploadAttachment(file, resolvedParams.id);
        finalMessage += `\n\n[Attachment: ${file.name}](${url})`;
      }
      const newMessage = await helpService.replyToHelpRequest(resolvedParams.id, finalMessage);
      setMessages([...messages, newMessage]);
      setReplyText("");
      setFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsReplying(false);
    }
  };

  const handleClose = async () => {
    if (confirm("Are you sure you want to close this help request?")) {
      try {
        const updated = await helpService.closeHelpRequest(resolvedParams.id);
        setTicket(updated);
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading ticket details...</div>;
  }

  if (!ticket) {
    return <div className="p-8 text-center text-red-500">Ticket not found.</div>;
  }

  const isClosed = ticket.status === 'resolved' || ticket.status === 'closed';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button onClick={() => router.push("/help")} className="text-blue-600 hover:underline text-sm mb-2">&larr; Back to Help</button>
          <h1 className="text-2xl font-bold text-slate-900">{ticket.subject}</h1>
          <p className="text-slate-500 text-sm mt-1">Ticket {ticket.help_id} • {ticket.category} • {format(new Date(ticket.created_at), "PPP p")}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-sm font-medium border capitalize bg-slate-100">
            {ticket.status.replace("_", " ")}
          </span>
          {!isClosed && (
            <Button variant="outline" onClick={handleClose}>
              Mark as Resolved
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="text-lg">Description</CardTitle>
        </CardHeader>
        <CardContent className="p-6 whitespace-pre-wrap text-slate-700">
          {ticket.description}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">Messages</h3>
        {messages.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-slate-500">
            No messages yet.
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <Card key={msg.id} className={msg.sender_id === ticket.employee_id ? "ml-12 border-blue-100 bg-blue-50/30" : "mr-12"}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm">
                      {msg.sender_id === ticket.employee_id ? "You" : "Support Agent"}
                    </span>
                    <span className="text-xs text-slate-500">
                      {format(new Date(msg.created_at), "PPP p")}
                    </span>
                  </div>
                  <div className="text-slate-700 whitespace-pre-wrap text-sm">
                    {msg.message}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isClosed && (
          <Card className="mt-6">
            <form onSubmit={handleReply}>
              <CardContent className="p-4 space-y-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply here..."
                  className="w-full flex min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                ></textarea>
                <div className="flex items-center gap-4">
                  <Input type="file" id="attachment" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                   <label htmlFor="attachment" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2 text-slate-600 hover:text-blue-600 border px-3 py-2 rounded-md">
                    <Paperclip className="w-4 h-4" />
                    {file ? file.name : "Attach File"}
                  </label>
                  {file && (
                    <button type="button" onClick={() => setFile(null)} className="text-red-500 text-xs hover:underline">
                      Remove
                    </button>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t p-4 flex justify-end">
                <Button type="submit" disabled={isReplying || (!replyText.trim() && !file)}>
                  {isReplying ? "Sending..." : "Send Reply"} <Send className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
        {isClosed && (
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-4 rounded-lg border border-amber-100">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm font-medium">This ticket has been closed and cannot accept new replies.</p>
          </div>
        )}
      </div>
    </div>
  );
}
