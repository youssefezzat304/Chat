import { sendMessage } from "@/app/api/messages.api";
import { socket } from "@/app/socket";
import { useChatStore, useUserStore } from "@/app/utils/stores";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { BsMic } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import { IoSendSharp } from "react-icons/io5";
import { Icon } from "../headers/NotificationsHeader";

const MessageInput = () => {
  const { register, handleSubmit, reset } = useForm();
  const chatId = useChatStore((state) => state.selectedChatId);
  const chatWith = useChatStore((state) => state.chatWith);
  const user = useUserStore((state) => state.user);

  const handleSendMessage = useCallback(
    async (data: any) => {
      reset();
      try {
        await sendMessage(socket, {
          chatId: chatId,
          initiatedBy: user!._id,
          receivedBy: chatWith!._id,
          content: data.message,
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    },
    [chatId, chatWith, reset, user]
  );
  return (
    <form
      autoComplete="off"
      className="input-box"
      onSubmit={handleSubmit(handleSendMessage)}
    >
      <GoPaperclip className="clip-icon" title="upload file" />
      <BsMic className="mic-icon" title="voice note" />
      <Icon
        className={`send-icon`}
        title="Send"
        onClick={handleSubmit(handleSendMessage)}
        icon={<IoSendSharp title="send" type="submit" />}
      ></Icon>

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
