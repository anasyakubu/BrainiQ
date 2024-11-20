import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";
import Messages from "./messageschatbot";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the GoogleGenerativeAI SDK

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

interface MessagesProps {
  messages: Message[];
  isLoading: boolean;
  currentResponse: any;
}

const apiKey: string = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
// console.log(apiKey);
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now().toString(),
      role: "assistant",
      content: "Hello! How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const result = await model.generateContent(input); // Generate content using Gemini API
      const response = result.response;
      const formattedResponse = response.text();

      // Gradual text reveal effect
      setCurrentResponse("");
      let tempResponse = "";
      for (let i = 0; i < formattedResponse.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 20)); // Adjust speed for reveal
        tempResponse += formattedResponse[i];
        setCurrentResponse(tempResponse);
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: tempResponse,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setCurrentResponse("");
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full bg-muted/50 relative flex flex-col min-h-[50vh] rounded-xl p-4 gap-4">
      <Badge
        variant={"outline"}
        className={`absolute right-3 top-1.5 bg-[#00B612]`}
      >
        ✓ Material Added
      </Badge>
      <div className="flex-1" />
      <Messages
        messages={messages}
        isLoading={isTyping}
        currentResponse={currentResponse}
      />
      <form
        className="relative overflow-hidden rounded-lg border bg-background"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your query here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <Button
            disabled={isTyping}
            variant={"secondary"}
            type="submit"
            size="sm"
            className="ml-auto bg-[#00B612]"
          >
            {isTyping ? "Thinking..." : "Send"}
            {isTyping ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <CornerDownLeft className="size-3.5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
