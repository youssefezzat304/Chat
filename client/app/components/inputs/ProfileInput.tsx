import { Autocomplete, Box, Input, TextField } from "@mui/material";
import { ComponentProps, useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
  FieldError,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import { CurrentUser } from "@/app/utils/types/user.interfaces";
import { countries } from "@/app/profile/countries";

type ProfileInputProps = ComponentProps<"input"> & {
  control: UseFormRegisterReturn<string>;
  defaultValue: string | null | undefined;
  errorCondition: FieldError | undefined;
  errorMessage: string | null | undefined;
  label: string;
  holder: string;
  type?: "text" | "number" | "email" | null;
};
export const ProfileInput = ({
  control,
  defaultValue,
  errorCondition,
  errorMessage,
  label,
  holder,
  type,
}: ProfileInputProps) => {
  return (
    <div className="info-input">
      <label htmlFor="Email address">{label}</label>
      <Input
        placeholder={holder}
        {...control}
        defaultValue={defaultValue}
        type={!type ? "text" : type}
      />
      {errorCondition ? (
        <span className="inline-error">{errorMessage}</span>
      ) : (
        <span className="inline-error"></span>
      )}
    </div>
  );
};

interface CountrySelectProps {
  control: UseFormRegisterReturn<"country">;
  selectedCountry: string | undefined;
}
export const CountrySelect = ({
  control,
  selectedCountry,
}: CountrySelectProps) => {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;

        return (
          <Box
            key={key}
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading="lazy"
              width="30"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label}
          </Box>
        );
      }}
      renderInput={(params) => (
        <>
          <label htmlFor="country">Country</label>
          <TextField
            {...control}
            {...params}
            size="small"
            placeholder={selectedCountry ? selectedCountry : "Choose a country"}
            InputProps={{
              ...params.InputProps,
              sx: {
                "& .MuiAutocomplete-endAdornment": {
                  display: "flex",
                  flexDirection: "row",
                  gap: "4px",
                },
              },
            }}
          />
        </>
      )}
    />
  );
};

export const BirthDateInput = ({
  setValue,
}: {
  setValue: UseFormSetValue<CurrentUser>;
}) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [cleared, setCleared] = useState<boolean>(false);

  useEffect(() => {
    if (cleared) {
      setDate(null);
      setValue("birthDate", "");
    }
  }, [cleared, setValue]);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoItem label="Birth Date" sx={{ color: "#6c757d" }}>
          <DesktopDatePicker
            value={date}
            onChange={(value) => {
              const formatedDate = value?.format("MM/DD/YYYY");
              setValue("birthDate", formatedDate);
            }}
            slotProps={{
              textField: {
                sx: {
                  "& .MuiInputBase-root": {
                    fontSize: "1rem",
                  },
                },
                size: "small",
              },
              field: { clearable: true, onClear: () => setCleared(true) },
            }}
          />
        </DemoItem>
      </LocalizationProvider>
    </>
  );
};
