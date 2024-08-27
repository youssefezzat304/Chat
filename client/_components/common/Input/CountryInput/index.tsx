import { countries } from "./countries";
import { Autocomplete, Box, TextField } from "@mui/material";
import Image from "next/image";
import { UseFormRegisterReturn } from "react-hook-form";

interface CountryInputProps {
  control: UseFormRegisterReturn<"address.country">;
  selectedCountry: string | undefined;
}
const CountryInput = ({ control, selectedCountry }: CountryInputProps) => {
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
            <Image
              loading="lazy"
              width={30}
              height={30}
              // srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
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

export default CountryInput;
