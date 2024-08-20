"use client";
import { useEffect, useState } from "react";
import DisplayImage from "../components/others/DisplayImage";
import { useGetMessages } from "../utils/queries/chat.query";
import { MessageInterface } from "../utils/types/chat.interfaces";

export const MessagesSystem = () => {
  const [messages, setMessages] = useState<JSX.Element[]>([]);
  const { chatMessages, isLoading } = useGetMessages();

  useEffect(() => {
    if (Array.isArray(chatMessages?.data)) {
      const newMessages = chatMessages.data.map((message) => (
        <Message key={message._id} message={message} />
      ));
      setMessages(newMessages);
    }
  }, [chatMessages?.data]);

  return (
    <div className="messages-continer">
      {isLoading ? <div>Loading...</div> : messages}
    </div>
  );
};

type MessageProps = {
  message: MessageInterface;
};
export const Message = ({ message }: MessageProps) => {
  return (
    <div className={`message-container`}>
      <DisplayImage
        base64String={message.senderId.profilePic}
        variant="rounded"
        className="message-pp"
      />
      <div className="message-bubble">
        <strong>{message.senderId.displayName}</strong>
        <p>{message.content}</p>
      </div>
    </div>
  );
};

// export const Messages = ({ messages, userId }: {messages: [], userId:string}) => {
//   const [lastSender, setLastSender] = useState(null);

//   return (
//     <div className="messages-container">
//       {messages.map((message, index) => {
//         const isLastInStreak =
//           index === messages.length - 1 ||
//           messages[index + 1].senderId !== message.senderId;

//         return (
//           <div key={message._id} className={`message-container`}>
//             <div className="message-bubble">
//               <span>{message.senderName}</span>
//               <p>{message.content}</p>
//             </div>
//             {isLastInStreak && message.senderId !== userId && (
//               <DisplayImage user={message.sender} />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };
