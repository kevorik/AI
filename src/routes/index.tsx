// import { useState, useMemo, useEffect, useRef } from "react";
// import { App } from "../App";
// import { useChat } from "../hooks/use-chat";
// import { ChatMessage } from "../components/ChatMessage";
// import { Welcome } from "../components/Welcome";

// export default function Index() {
//   const [message, setMessage] = useState<string>("");

//   const { currentChat, chatHistory, sendMessage, cancel, state, clear } = useChat();

//   const currentMessage = useMemo(() => {
//     return { content: currentChat ?? "", role: "assistant" } as const;
//   }, [currentChat]);

//   const bottomRef = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     scrollToBottom();
//   }, [currentChat, chatHistory, state]);

//   const scrollToBottom = () => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const inputRef = useRef<HTMLInputElement>(null);
//   const focusInput = () => {
//     inputRef.current?.focus();
//   };

//   useEffect(() => {
//     focusInput();
//   }, [state]);

//   return (
//     <App title="Create your own AI chat bot">
//       <main className="bg-white md:rounded-lg md:shadow-md p-6 w-full h-full flex flex-col">
//         <section className="overflow-y-auto flex-grow mb-4 pb-8">
//           <div className="flex flex-col space-y-4">
//             {chatHistory.length === 0 ? (
//               <Welcome />
//             ) : (
//               chatHistory.map((chat, i) => (
//                 <ChatMessage key={i} message={chat} />
//               ))
//             )}
//             {currentChat ? <ChatMessage message={currentMessage} /> : null}
//           </div>
//           <div ref={bottomRef} />
//         </section>
//         <div className="flex items-center justify-center h-20">
//           {state === "idle" ? null : (
//             <button className="bg-gray-100 text-gray-900 py-2 px-4 my-8" onClick={cancel}>
//               Stop generating
//             </button>
//           )}
//         </div>
//         <section className="bg-gray-100 rounded-lg p-2">
//           <form
//             className="flex"
//             onSubmit={(e) => {
//               e.preventDefault();
//               sendMessage(message, chatHistory);
//               setMessage("");
//             }}
//           >
//             {chatHistory.length > 1 ? (
//               <button className="bg-gray-100 text-gray-600 py-2 px-4 rounded-l-lg" type="button" onClick={clear}>
//                 Clear
//               </button>
//             ) : null}
//             <input
//               type="text"
//               ref={inputRef}
//               className="w-full rounded-l-lg p-2 outline-none"
//               placeholder={state == "idle" ? "Type your message..." : "..."}
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               disabled={state !== "idle"}
//             />
//             {state === "idle" ? (
//               <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg" type="submit">
//                 Send
//               </button>
//             ) : null}
//           </form>
//         </section>
//       </main>
//     </App>
//   );
// }

import { useState, useMemo, useEffect, useRef } from "react";
import { App } from "../App";
import { useChat } from "../hooks/use-chat";
import { ChatMessage } from "../components/ChatMessage";
import { Welcome } from "../components/Welcome";

export default function Index() {
  const [message, setMessage] = useState<string>("");

  const { currentChat, chatHistory, sendMessage, cancel, state, clear } = useChat();

  const currentMessage = useMemo(() => {
    return { content: currentChat ?? "", role: "assistant" } as const;
  }, [currentChat]);

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollToBottom();
  }, [currentChat, chatHistory, state]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, [state]);

  return (
    <App title="Create your own AI chat bot">
      <main className="bg-white md:rounded-lg md:shadow-md p-6 w-full h-full flex flex-col">
        <section className="overflow-y-auto flex-grow mb-4 pb-8">
          <div className="flex flex-col space-y-4">
            {chatHistory.length === 0 ? (
              <Welcome />
            ) : (
              chatHistory.map((chat, i) => (
                <ChatMessage key={i} message={chat} />
              ))
            )}
            {currentChat ? <ChatMessage message={currentMessage} /> : null}
          </div>
          <div ref={bottomRef} />
        </section>
        <div className="flex items-center justify-center h-20">
          {state === "idle" ? null : (
            <button className="bg-gray-100 text-gray-900 py-2 px-4 my-8" onClick={cancel}>
              Stop generating
            </button>
          )}
        </div>
        <section className="bg-gray-100 rounded-lg p-2">
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(message, chatHistory);
              setMessage("");
            }}
          >
            {chatHistory.length > 1 ? (
              <button className="bg-gray-100 text-gray-600 py-2 px-4 rounded-l-lg" type="button" onClick={clear}>
                Clear
              </button>
            ) : null}
            <input
              type="text"
              ref={inputRef}
              className="w-full rounded-l-lg p-2 outline-none"
              placeholder={state == "idle" ? "Type your message..." : "..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={state !== "idle"}
            />
            {state === "idle" ? (
              <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg" type="submit">
                Send
              </button>
            ) : null}
          </form>
        </section>
      </main>
    </App>
  );
}
