import { GenericInputType } from "@/types/props.types";

const GenericInput = ({ icons, inputProps, divProps }: GenericInputType) => {
  return (
    <div {...divProps}>
      <input {...inputProps} />
      {icons}
    </div>
  );
};

export default GenericInput;
