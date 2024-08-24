import { sendMessage } from "@/app/api/messages.api";
import { socket } from "@/app/socket";
import { useChatStore, useUserStore } from "@/app/utils/stores";
import { MessageInterface } from "@/app/utils/types/chat.interfaces";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { BsMic } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import { IoSendSharp } from "react-icons/io5";

const MessageInput = () => {
  const { register, handleSubmit, reset } = useForm();

  const { chatWith, addMessage } = useChatStore();
  const user = useUserStore((state) => state.user);

  const handleSendMessage = useCallback(
    async (data: any) => {
      reset();
      try {
        const response = (await sendMessage(socket, {
          initiatedBy: user!._id,
          receivedBy: chatWith!._id,
          content: data.message,
        })) as MessageInterface;
        addMessage(response);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    },
    [chatWith, user, addMessage, reset]
  );
  return (
    <form className="input-box" onSubmit={handleSubmit(handleSendMessage)}>
      <GoPaperclip className="clip-icon" title="upload file" />
      <BsMic className="mic-icon" title="voice note" />
      <IoSendSharp className="send-icon" title="send" type="submit" />
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
