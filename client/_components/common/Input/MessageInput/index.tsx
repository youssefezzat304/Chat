import { sendMessage } from "@/api/messages.api";
import { socket } from "@/app/socket";
import { useChatStore, useUserStore } from "@/utils/stores";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import AttachBtn from "../../Button/AttachBtn";
import VoiceNoteBtn from "../../Button/VoiceNoteBtn";
import SendMessageBtn from "../../Button/SendMessageBtn";

import styles from "./index.module.css";

const MessageInput = () => {
  const { register, handleSubmit, reset } = useForm(),
    chatId = useChatStore((state) => state.selectedChatId),
    chatWith = useChatStore((state) => state.chatWith),
    currentUser = useUserStore((state) => state.user);

  const handleSendMessage = useCallback(
    async (data: any) => {
      reset();
      try {
        await sendMessage(socket, {
          chatId: chatId,
          initiatedBy: currentUser!._id,
          receivedBy: chatWith!._id,
          content: data.message,
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    },
    [chatId, chatWith, reset, currentUser]
  );
  return (
    <form
      autoComplete="off"
      className={styles.inputBox}
      onSubmit={handleSubmit(handleSendMessage)}
    >
      <AttachBtn />
      <VoiceNoteBtn />
      <SendMessageBtn onClick={handleSubmit(handleSendMessage)} />
      <input
        {...register("message")}
        type="text"
        title="message"
        placeholder="Your message."
      />
    </form>
  );
};

export default MessageInput;