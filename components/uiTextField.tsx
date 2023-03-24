import { TextField, StandardTextFieldProps } from "@mui/material";
interface UiTextFieldProps extends StandardTextFieldProps {
    label?: string;
}

const UiTextarea = ({ label, ...props }: UiTextFieldProps) => {
    return <TextField {...props}>{label}</TextField>;
};

export default UiTextarea;
