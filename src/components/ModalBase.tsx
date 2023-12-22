import {Button, Card, CardActions, CardContent, CircularProgress, Modal, Typography,} from "@mui/material";
import {ReactNode} from "react";

interface ModalProps {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    onConfirm: () => void;
    confirmButtonText: string;
    onCancel: () => void;
    cancelButtonText: string;
    isLoading?: boolean;
    isDisabled?: boolean;
}

export default function ModalBase({
                                      isOpen,
                                      title,
                                      children,
                                      onConfirm,
                                      confirmButtonText,
                                      onCancel,
                                      cancelButtonText,
                                      isLoading,
                                      isDisabled,
                                  }: ModalProps) {

    const buttonTextStyle = {
        fontFamily: "Roboto, sans-serif",
        fontWeight: 700,
        fontSize: "13px",
        lineHeight: "22px",
        letterSpacing: "0.46px",
        textTransform: "uppercase",
    };

    return (
        <Modal
            open={isOpen}
            onClose={onCancel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                border: "none",
                outline: 0,
            }}
        >
            <Card
                sx={{
                    width: 570,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    id="modal-modal-title"
                    sx={{
                        textAlign: "center",
                        padding: "15px",
                        marginTop: "20px",
                    }}
                    variant="h6"
                    component="div"
                >
                    {title}
                </Typography>
                <CardContent sx={{width: "100%"}}>{children}</CardContent>
                <CardActions
                    sx={{
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "right",
                        width: "100%",
                        marginRight: "40px",
                        marginBottom: "20px",
                    }}
                >
                    {isLoading && <CircularProgress size="1.8rem"/>}
                    <Button
                        sx={buttonTextStyle}
                        size="small"
                        onClick={onConfirm}
                        disabled={isLoading || isDisabled}
                    >
                        {confirmButtonText}
                    </Button>
                    <Button
                        sx={{buttonTextStyle, color: "#9e9e9e"}}
                        size="small"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        {cancelButtonText}
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    );
}
