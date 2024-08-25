import React from "react";
import ButtonIcon from "../../Icon/ButtonIcon";
import { BsMic } from "react-icons/bs";

const VoiceNoteBtn = () => {
  return (
    <ButtonIcon
      className="mic-icon"
      title="Voice note"
      icon={<BsMic />}
    ></ButtonIcon>
  );
};

export default VoiceNoteBtn;
