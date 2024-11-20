// import React from "react";
// // import Markdown from "./markdown";
// import { Bot, User2 } from "lucide-react";
// import { Message } from "ai/react";
// import MessageBox from "./messagebox";

// type Props = {
//   messages: Message[];
//   isLoading: boolean;
// };

// const Messages = ({ messages, isLoading }: Props) => {
//   return (
//     <div className="flex flex-col gap-4">
//       {messages.map((m, index) => {
//         return <MessageBox key={index} role={m.role} content={m.content}/>;
//       })}
//     </div>
//   );
// };

// export default Messages;

import { Message } from "ai";
import React from "react";
import MessageBox from "./messagebox";

type Props = {
  messages: Message[];
  isLoading: boolean;
  currentResponse: string;
};

const Messages = ({ messages, isLoading, currentResponse }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((m, index) => (
        <MessageBox key={index} role={m.role} content={m.content} />
      ))}

      {/* Show current response typing progress */}
      {isLoading && currentResponse && (
        <MessageBox role="assistant" content={currentResponse} />
      )}

      {/* Optional: Show typing indicator */}
      {isLoading && !currentResponse && (
        <div className="typing-indicator">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      )}
    </div>
  );
};

export default Messages;
