import { User } from "@/types/user.types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

const BirthDateInput = ({
  setValue,
}: {
  setValue: UseFormSetValue<User>;
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
              setValue(
                "birthDate",
                !formatedDate ? "MM/DD/YYYY" : formatedDate
              );
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

export default BirthDateInput;