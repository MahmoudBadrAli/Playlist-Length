import * as React from "react";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useTranslation } from "react-i18next";

function SSRInitialFilled(_: BaseNumberField.Root.Props) {
  return null;
}
SSRInitialFilled.muiName = "Input";

export default function NumberField({
  id: idProp,
  label,
  error,
  size = "medium",
  ...other
}: BaseNumberField.Root.Props & {
  label?: React.ReactNode;
  size?: "small" | "medium";
  error?: boolean;
}) {
  const { i18n } = useTranslation();
  const isDark = useSelector((state: RootState) => state.mode.value) === "dark";
  const dir = i18n.language === "ar" ? "rtl" : "ltr";
  const isArabic = i18n.language === "ar";

  let id = React.useId();
  if (idProp) {
    id = idProp;
  }

  return (
    <BaseNumberField.Root
      {...other}
      render={(props, state) => (
        <FormControl
          size={size}
          ref={props.ref}
          disabled={state.disabled}
          required={state.required}
          error={error}
          variant="outlined"
          sx={{
            direction: dir,
          }}
        >
          {props.children}
        </FormControl>
      )}
    >
      <SSRInitialFilled {...other} />
      <InputLabel
        htmlFor={id}
        sx={{
          direction: dir,
          fontFamily: "Cairo",
          fontSize: "1.3rem",
          left: isArabic ? "auto" : undefined,
          right: isArabic ? "1.75rem" : undefined,
          transformOrigin: isArabic ? "top right" : "top left",
          "&.MuiInputLabel-shrink": {
            fontSize: "1rem",
            left: isArabic ? "auto" : undefined,
            right: isArabic ? "28px" : undefined,
          },
        }}
      >
        {label}
      </InputLabel>
      <BaseNumberField.Input
        id={id}
        render={(props, state) => (
          <OutlinedInput
            label={label}
            inputRef={props.ref}
            value={state.inputValue}
            onBlur={props.onBlur}
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
            onKeyDown={props.onKeyDown}
            onFocus={props.onFocus}
            slotProps={{
              input: {
                ...props,
                style: {
                  fontFamily: "Cairo",
                  fontSize: "1.5rem",
                  color: isDark ? "#ffffff" : "#000000",
                  fontWeight: 600,
                  textAlign: isArabic ? "right" : "left",
                  paddingRight: isArabic ? "14px" : undefined,
                  paddingLeft: isArabic ? undefined : "14px",
                },
              },
            }}
            endAdornment={
              <InputAdornment
                position="end"
                sx={{
                  flexDirection: "column",
                  maxHeight: "unset",
                  alignSelf: "stretch",
                  borderLeft: isArabic ? "none" : "1px solid",
                  borderRight: isArabic ? "1px solid" : "none",
                  borderColor: "divider",
                  ml: isArabic ? 0 : 0,
                  mr: isArabic ? 0 : 0,
                  "& button": {
                    py: 0,
                    flex: 1,
                    borderRadius: 0.5,
                  },
                }}
              >
                <BaseNumberField.Increment
                  render={<IconButton size={size} aria-label="Increase" />}
                >
                  <KeyboardArrowUpIcon
                    fontSize={size}
                    sx={{ transform: "translateY(2px)" }}
                  />
                </BaseNumberField.Increment>

                <BaseNumberField.Decrement
                  render={<IconButton size={size} aria-label="Decrease" />}
                >
                  <KeyboardArrowDownIcon
                    fontSize={size}
                    sx={{ transform: "translateY(-2px)" }}
                  />
                </BaseNumberField.Decrement>
              </InputAdornment>
            }
            sx={{
              pr: 0,
              pl: 0,
              direction: dir,
              fontFamily: "Cairo",
              "& .MuiOutlinedInput-notchedOutline legend": {
                width: "auto",
                textAlign: isArabic ? "right" : "left",
              },
            }}
          />
        )}
      />
    </BaseNumberField.Root>
  );
}
