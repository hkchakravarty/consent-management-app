import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { CheckboxContainer } from "../styles/consent-form-styles";

interface ConsentCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}

const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({
  label,
  checked,
  onChange,
  id,
}) => {
  return (
    <CheckboxContainer>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            id={id}
          />
        }
        label={label}
      />
    </CheckboxContainer>
  );
};

export default React.memo(ConsentCheckbox);
