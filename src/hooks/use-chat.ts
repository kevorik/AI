// import { useMemo, useState } from "react";
// import axios from 'axios';
// import { appConfig } from "../../config.browser";

// const API_PATH = "http://localhost:4000/api/v1/sentiment-analysis/analyze";

// interface ChatMessage {
//   role: "user" | "assistant";
//   content: string;
//   emotion?: string;
// }

// export function useChat() {
//   const [currentChat, setCurrentChat] = useState<string | null>(null);
//   const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
//   const [state, setState] = useState<"idle" | "waiting" | "loading">("idle");

//   const abortController = useMemo(() => new AbortController(), []);

//   function cancel() {
//     setState("idle");
//     abortController.abort();
//     if (currentChat) {
//       const newHistory = [
//         ...chatHistory,
//         { role: "user", content: currentChat } as const,
//       ];
//       setChatHistory(newHistory);
//       setCurrentChat("");
//     }
//   }

//   function clear() {
//     console.log("clear");
//     setChatHistory([]);
//   }

//   const sendMessage = async (message: string, chatHistory: Array<ChatMessage>) => {
//     setState("waiting");
//     let chatContent = "";
//     let chatEmotion = "";
//     const newHistory = [
//       ...chatHistory,
//       { role: "user", content: message } as const,
//     ];

//     setChatHistory(newHistory);
//     const body = {
//       text: message
//     };

//     try {
//       const res = await axios.post(API_PATH, body);
//       const responseText = res.data;
//       chatContent = responseText.text;
//       chatEmotion = responseText.emotion;

//       setCurrentChat(responseText);
//       setChatHistory((curr) => [
//         ...curr,
//         { role: "assistant", content: responseText, emotion: chatEmotion } as const,
//       ]);
//       setCurrentChat(null);
//       setState("idle");
//     } catch (error) {
//       console.error(error);
//       setState("idle");
//     }
//   };

//   return { sendMessage, currentChat, chatHistory, cancel, clear, state };
// }


import { useMemo, useState } from "react";
import axios from 'axios';
import { appConfig } from "../../config.browser";

const API_PATH = "http://localhost:4000/api/v1/sentiment-analysis/analyze";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  emotion?: string;
}

export function useChat() {
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [state, setState] = useState<"idle" | "waiting" | "loading">("idle");

  const abortController = useMemo(() => new AbortController(), []);

  function cancel() {
    setState("idle");
    abortController.abort();
    if (currentChat) {
      const newHistory = [
        ...chatHistory,
        { role: "user", content: currentChat } as const,
      ];
      setChatHistory(newHistory);
      setCurrentChat("");
    }
  }

  function clear() {
    console.log("clear");
    setChatHistory([]);
  }

  const sendMessage = async (message: string, chatHistory: Array<ChatMessage>) => {
    setState("waiting");
    let chatContent = "";
    let chatEmotion = "";
    const newHistory = [
      ...chatHistory,
      { role: "user", content: message } as const,
    ];

    setChatHistory(newHistory);
    const body = {
      text: message
    };

    try {
      const res = await axios.post(API_PATH, body);
      const response = res.data;
      chatContent = response.text;
      chatEmotion = response.emotion;

      setCurrentChat(chatContent);
      setChatHistory((curr) => [
        ...curr,
        { role: "assistant", content: chatContent, emotion: chatEmotion } as const,
      ]);
      setCurrentChat(null);
      setState("idle");
    } catch (error) {
      console.error(error);
      setState("idle");
    }
  };

  return { sendMessage, currentChat, chatHistory, cancel, clear, state };
}