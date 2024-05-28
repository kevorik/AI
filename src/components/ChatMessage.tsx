import {
  FunctionComponent,
  DetailedHTMLProps,
  TableHTMLAttributes,
} from "react";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  emotion?: string;
}
interface Props {
  message: ChatMessage;
}

// This lets us style any markdown tables that are rendered
const CustomTable: FunctionComponent<
  Omit<
    DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>,
    "ref"
  > &
    ReactMarkdownProps
> = ({ children, ...props }) => {
  return (
    <div className="overflow-x-auto">
      <table {...props} className="w-full text-left border-collapse table-auto">
        {children}
      </table>
    </div>
  );
};

const EmotionIcon: React.FC<{ emotion: string }> = ({ emotion }) => {
  if (emotion === "good") {
    return <span style={{fontSize: "4rem", flexShrink: 0}} role="img" aria-label="good">😊</span>;
  } else if (emotion === "bad") {
    return <span style={{fontSize: "4rem", flexShrink: 0}} role="img" aria-label="bad">😞</span>;
  } else if (emotion === "neutral") {
    return <span style={{fontSize: "4rem", flexShrink: 0}} role="img" aria-label="neutral">😐</span>;
  } 
  return null;
};

export const ChatMessage: React.FC<React.PropsWithChildren<Props>> = ({
  message,
}) => (
  message.role === "user" ? (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
      <div style={{ backgroundColor: "#cbd5e0", borderColor: "#e2e8f0", borderWidth: 2, borderRadius: 8, padding: 8, maxWidth: "calc(100% - 16px)" }}>
        <p>{message.content}</p>
      </div>
    </div>
  ) : (
    <div style={{ display: "flex", alignItems: "flex-start", boxSizing: "border-box", maxWidth: "100%" }}>
      <div style={{ backgroundColor: "#f7fafc", borderColor: "#edf2f7", borderWidth: 2, borderRadius: 8, padding: 8, width: "100%", display: "flex", alignItems: "center", boxSizing: "border-box" }}>
        {message.emotion && (
          <>
            <div style={{ marginRight: 16, display: "flex", alignItems: "center" }}>
              <EmotionIcon emotion={message.emotion} />
            </div>
            <div style={{ flex: "1", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold", textAlign: "center" }}>
                <ReactMarkdown
                  children={`Ваш текст: ${message.content}`}
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: CustomTable,
                  }}
                />
              </div>
              <div style={{ position: "relative", borderTop: "1px solid transparent", marginTop: 16, paddingTop: 8, textAlign: "center" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  Ваш текст имеет <span style={{ color: message.emotion === "good" ? "green" : message.emotion === "bad" ? "red" : "gray" }}>
                    {message.emotion === "good" ? "положительную" : message.emotion === "bad" ? "отрицательную" : "нейтральную"}
                  </span> тональность
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
);

