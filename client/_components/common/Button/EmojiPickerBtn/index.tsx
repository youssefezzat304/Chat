"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import ButtonIcon from "../../Icon/ButtonIcon";
import { LiaLaughBeamSolid } from "react-icons/lia";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import styles from "./index.module.css";

const EmojiPickerBtn = ({ onEmojiSelect }: { onEmojiSelect: any }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const togglePicker = useCallback(() => {
    setShowPicker((prevShowPicker) => !prevShowPicker);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [togglePicker]);

  return (
    <div ref={pickerRef} className={styles.emojiPickerContainer}>
      <ButtonIcon
        className={styles.emojis}
        icon={<LiaLaughBeamSolid />}
        title="Emoji picker"
        onClick={togglePicker}
      />
      {showPicker && (
        <div className={styles.emojiPicker}>
          <Picker
            data={data}
            theme="light"
            onEmojiSelect={onEmojiSelect}
            previewPosition="none"
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerBtn;
