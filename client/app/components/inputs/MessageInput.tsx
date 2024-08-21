import { sendMessage } from "@/app/api/messages.api";
import { useChatStore } from "@/app/utils/stores/chat.store";
import { useUserStore } from "@/app/utils/stores/user.store";
import { useForm } from "react-hook-form";
import { BsMic } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import { IoSendSharp } from "react-icons/io5";

const MessageInput = () => {
  const { register, handleSubmit } = useForm();
  const { selectedChatId, chatWith } = useChatStore();
  const user = useUserStore((state) => state.user);
  const handleSendMessage = async (data: any) => {
    try {
      const response = await sendMessage({
        chatId: selectedChatId,
        initiatedBy: user!._id,
        receivedBy: chatWith!._id,
        content: data.message,
      });
      console.log(response);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
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
