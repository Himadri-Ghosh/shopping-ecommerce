import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>([
    {
      role: "assistant",
      content: "Hi! 👋 I'm your shopping assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<any>(null);

  const HF_API_TOKEN = "import.meta.env.VITE_HF_API_KEY";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev: any) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Using Hugging Face Inference API with a free model
      const response = await fetch(
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: input,
            parameters: {
              max_length: 100,
              temperature: 0.7,
            },
          }),
        }
      );

      const data = await response.json();

      let botReply = "";
      if (data.error) {
        botReply =
          "Sorry, I'm having trouble connecting. Please make sure you've added your Hugging Face API token!";
      } else if (data[0]?.generated_text) {
        botReply = data[0].generated_text;
      } else {
        botReply =
          "I'm here to help! You can ask me about products, orders, or anything else.";
      }

      setMessages((prev: any) => [
        ...prev,
        { role: "assistant", content: botReply },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev: any) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "What products do you have?",
    "Track my order",
    "Return policy",
    "Contact support",
  ];

  const handleQuickQuestion = (question: any) => {
    setInput(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
        >
          <MessageCircle size={24} />
          <span className="font-medium">Chat with us</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-96 h-[500px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-red-600 to-red-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <div>
                <h3 className="font-semibold">Shopping Assistant</h3>
                <p className="text-xs opacity-90">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg: any, idx: number) => (
              <div
                key={idx}
                className={`flex gap-2 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="bg-red-600 rounded-full p-2 h-8 w-8 flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-red-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none shadow"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="bg-gray-600 rounded-full p-2 h-8 w-8 flex items-center justify-center shrink-0">
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="bg-red-600 rounded-full p-2 h-8 w-8 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white p-3 rounded-lg rounded-bl-none shadow">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-3 border-t bg-white">
              <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-ted-600"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-600 text-white rounded-lg px-4 py-2 transition"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
