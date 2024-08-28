"use client";
import { ProfileFormSectionProps } from "@/types/props.types";
import styles from "./index.module.css";
import { ProfileInput } from "@/_components";
import BirthDateInput from "@/_components/common/Input/BirthDateInput";
import CountryInput from "@/_components/common/Input/CountryInput";
import { TextField } from "@mui/material";
import { useCallback } from "react";
import { FieldError } from "react-hook-form";
import { User } from "@/types/user.types";

const ProfileFormSection = ({
  control,
  activeUser,
  saveChanges,
  errors,
  setValue,
}: ProfileFormSectionProps) => {
  const {
    register,
    handleSubmit,
    _formState: { isSubmitting },
  } = control;

  const renderInput = useCallback(
    (
      label: string,
      name: keyof User,
      type: "number" | "email" | "text" | undefined,
      defaultValue: string,
      error: FieldError | undefined,
      placeholder: string,
    ) => (
      <ProfileInput
        label={label}
        type={type}
        control={register(name)}
        defaultValue={defaultValue}
        errorCondition={error}
        errorMessage={error?.message}
        holder={placeholder}
      />
    ),
    [register],
  );

  return (
    <form
      className={styles.profileFormSec}
      onSubmit={handleSubmit(saveChanges)}
    >
      <section className={styles.personalInfoSec}>
        <label htmlFor="" className={styles.sectionLabel}>
          Personal information
        </label>
        <section>
          {renderInput(
            "Email Address",
            "email",
            "text",
            activeUser.email,
            errors.email,
            "example@info.com",
          )}
          <BirthDateInput setValue={setValue} />
          {renderInput(
            "Phone number",
            "phoneNumber",
            "number",
            activeUser.phoneNumber,
            errors.phoneNumber,
            "0123456789",
          )}
        </section>
      </section>

      <section className={styles.personalInfoSec}>
        <label htmlFor="Address" className={styles.sectionLabel}>
          Address
        </label>
        <section>
          <CountryInput
            control={register("address.country")}
            selectedCountry={activeUser.address.country}
          />
          <ProfileInput
            label="City/State"
            control={control.register("address.city")}
            defaultValue={activeUser.address.city}
            errorCondition={errors.address?.city}
            errorMessage={errors.address?.city?.message}
            holder="California"
          />
          <ProfileInput
            label="City/State"
            control={control.register("address.postalCode")}
            defaultValue={activeUser.address.postalCode}
            errorCondition={errors.address?.postalCode}
            errorMessage={errors.address?.postalCode?.message}
            holder="California"
          />
        </section>
      </section>

      <section className={styles.bio}>
        <label htmlFor="Bio">Bio</label>
        <div className={styles.infoInput}>
          <TextField
            {...register("status")}
            id="outlined-multiline-static"
            multiline
            rows={3}
            defaultValue={
              activeUser.status ?? "Hey there I am using chat app..."
            }
            variant="standard"
          />
        </div>
        {errors.status && (
          <span className={styles.inlineError}>{errors.status.message}</span>
        )}
      </section>
    </form>
  );
};

export default ProfileFormSection;
