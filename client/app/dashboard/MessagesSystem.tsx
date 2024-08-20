"use client";
import { useQuery } from "@tanstack/react-query";
import { useChatStore } from "../utils/stores/chat.store";
import { createChat, getChat, getOrCreateChat } from "../api/chat.api";
import { useUserStore } from "../utils/stores/user.store";
import { useState } from "react";
import DisplayImage from "../components/others/DisplayImage";
import { CurrentUser } from "../utils/types/user.interfaces";

export const MessagesSystem = () => {
  const selectedChatId = useChatStore((state) => state.selectedChatId);
  const user = useUserStore((state) => state.user);
  const [messages, setMessages] = useState([]);
  const { data: chatMessages, isLoading } = useQuery({
    queryFn: () =>
      getOrCreateChat({ userId: user?._id, chatterId: selectedChatId }),
    queryKey: ["chatMessages", selectedChatId],
    enabled: !!selectedChatId,
  });

  return (
    <div className="messages-continer">
      <Message />
    </div>
  );
};

export const Message = (subject: CurrentUser) => {
  return (
    <div className={`message-container`}>
      <DisplayImage base64String={subject.profilePic} variant="rounded" className="message-pp"/>
      <div className="message-bubble">
        <strong>Name</strong>
        <p>content</p>
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
