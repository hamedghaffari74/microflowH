import { Button, ButtonProps } from "@mui/material";
interface UiButtonProps extends ButtonProps {
    label?: string;
}

const UiButton = ({ label, ...props }: UiButtonProps) => {
    return <Button {...props}>{label}</Button>;
};

export default UiButton;
