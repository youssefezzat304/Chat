"use client";
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";
import { User } from "../utils/types/user.interfaces";
import ProfileInput, {
  BirthDateInput,
  CountrySelect,
} from "../components/inputs/ProfileInput";
import { TextField } from "@mui/material";

type ProfileFormSectionProps = {
  control: Control<User>;
  activeUser: User;
  handleSubmit: UseFormHandleSubmit<User, undefined>;
  saveChanges: SubmitHandler<User>;
  errors: FieldErrors<User>;
  setValue: UseFormSetValue<User>;
};
const ProfileFormSection = ({
  control,
  activeUser,
  saveChanges,
  errors,
  setValue,
}: ProfileFormSectionProps) => {
  return (
    <form
      className="profile-form-sec"
      onSubmit={control.handleSubmit((data) => saveChanges(data))}
    >
      <section className="personal-info-sec">
        <label htmlFor="" className="section-label">
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

      <section className="personal-info-sec">
        <label htmlFor="" className="section-label">
          Address
        </label>
        <section>
          <CountrySelect
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

      <section className="bio">
        <label htmlFor="Bio">Bio</label>
        <div className="info-input">
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
          <span className="inline-error">{errors.status.message}</span>
        ) : (
          <span className="inline-error"></span>
        )}
      </section>
    </form>
  );
};

export default ProfileFormSection;
