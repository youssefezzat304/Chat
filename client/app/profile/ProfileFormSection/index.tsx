"use client";


import { ProfileFormSectionProps } from "@/types/props.types";
import styles from "./index.module.css";
import { ProfileInput } from "@/_components";
import BirthDateInput from "@/_components/common/Input/BirthDateInput";
import CountryInput from "@/_components/common/Input/CountryInput";
import { TextField } from "@mui/material";

const ProfileFormSection = ({
  control,
  activeUser,
  saveChanges,
  errors,
  setValue,
}: ProfileFormSectionProps) => {
  return (
    <form
      className={styles.profileFormSec}
      onSubmit={control.handleSubmit((data) => saveChanges(data))}
    >
      <section className={styles.personalInfoSec}>
        <label htmlFor="" className={styles.sectionLabel}>
          Personal information
        </label>
        <section>
          <ProfileInput
            label="Email Address"
            control={control.register("email")}
            defaultValue={activeUser.email}
            errorCondition={errors.email}
            errorMessage={errors.email?.message}
            holder="example@info.com"
          />

          <BirthDateInput setValue={setValue} />

          <ProfileInput
            label="Phone number"
            type="number"
            control={control.register("phoneNumber")}
            defaultValue={activeUser.phoneNumber}
            errorCondition={errors.phoneNumber}
            errorMessage={errors.phoneNumber?.message}
            holder="0123456789"
          />
        </section>
      </section>

      <section className={styles.personalInfoSec}>
        <label htmlFor="Address" className={styles.sectionLabel}>
          Address
        </label>
        <section>
          <CountryInput
            control={control.register("address.country")}
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
            label="Postal code"
            control={control.register("address.postalCode")}
            defaultValue={activeUser.address.postalCode}
            errorCondition={errors.address?.postalCode}
            errorMessage={errors.address?.postalCode?.message}
            holder="AB1234"
          />
        </section>
      </section>

      <section className={styles.bio}>
        <label htmlFor="Bio">Bio</label>
        <div className={styles.infoInput}>
          <TextField
            {...control.register("status")}
            id="outlined-multiline-static"
            label=""
            multiline
            rows={3}
            defaultValue={
              activeUser.status
                ? activeUser.status
                : "Hey there I am using chat app..."
            }
            variant="standard"
          />
        </div>
        {errors.status ? (
          <span className={styles.inlineError}>{errors.status.message}</span>
        ) : (
          <span className={styles.inlineError}></span>
        )}
      </section>
    </form>
  );
};

export default ProfileFormSection;
