import { Input } from "@mui/material";
import { ProfileInfoInputProps } from "@/types/props.types";

import styles from "./index.module.css";

const ProfileInfoInput = ({
  control,
  defaultValue,
  errorCondition,
  errorMessage,
  label,
  holder,
  type,
}: ProfileInfoInputProps) => {
  return (
    <div className={styles.infoInput}>
      <label htmlFor="Email address">{label}</label>
      <Input
        placeholder={holder}
        {...control}
        defaultValue={defaultValue}
        type={!type ? "text" : type}
      />
      {errorCondition ? (
        <span className={styles.inlineError}>{errorMessage}</span>
      ) : (
        <span className={styles.inlineError}></span>
      )}
    </div>
  );
};
export default ProfileInfoInput;
