import { useId } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CheckCircleOutlineRounded,
  CloseRounded,
  ErrorOutlineRounded,
  HelpOutlineRounded,
  InfoOutlined,
  WarningAmberRounded,
} from "@mui/icons-material";

const theme = createTheme({
  palette: { primary: { main: "#7c3aed" }, error: { main: "#b91c1c" } },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
});
const statuses = {
  success: { Icon: CheckCircleOutlineRounded, color: "success" },
  error: { Icon: ErrorOutlineRounded, color: "error" },
  warning: { Icon: WarningAmberRounded, color: "warning" },
  question: { Icon: HelpOutlineRounded, color: "primary" },
  info: { Icon: InfoOutlined, color: "info" },
};

/** Reusable controlled dialog; children may contain a form or custom content. */
export default function AppDialog({
  open,
  title,
  description,
  children,
  status = "info",
  confirmation = false,
  destructive = false,
  confirmLabel = confirmation ? "Confirm" : "Got it",
  cancelLabel = "Cancel",
  pending = false,
  onConfirm,
  onClose,
  maxWidth = "xs",
  actions,
}) {
  const id = useId();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { Icon, color } = statuses[status] ?? statuses.info;
  const dismiss = () => {
    if (!pending) onClose?.();
  };
  const buttonSx = {
    minHeight: 44,
    px: 3,
    "&.Mui-focusVisible": {
      outline: "3px solid",
      outlineColor: "primary.light",
      outlineOffset: 3,
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={dismiss}
        fullWidth
        maxWidth={maxWidth}
        aria-labelledby={`${id}-title`}
        aria-describedby={description ? `${id}-description` : undefined}
        disableEscapeKeyDown={pending}
        transitionDuration={reducedMotion ? 0 : { enter: 180, exit: 120 }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(15, 23, 42, 0.5)",
              backdropFilter: "blur(4px)",
            },
          },
        }}
        PaperProps={{
          sx: {
            m: 2,
            width: "calc(100% - 32px)",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(15,23,42,.22)",
            border: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            pt: 3,
          }}
        >
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              width: 52,
              height: 52,
              borderRadius: 3,
              color: `${color}.main`,
              bgcolor: (t) => alpha(t.palette[color].main, 0.1),
            }}
          >
            <Icon aria-hidden="true" sx={{ fontSize: 28 }} />
          </Box>
          <IconButton
            aria-label="Close dialog"
            disabled={pending}
            onClick={dismiss}
            sx={{
              width: 44,
              height: 44,
              ...{ "&.Mui-focusVisible": buttonSx["&.Mui-focusVisible"] },
            }}
          >
            <CloseRounded />
          </IconButton>
        </Box>
        <DialogTitle
          id={`${id}-title`}
          sx={{
            px: 3,
            pt: 2.5,
            pb: 1,
            fontSize: "1.25rem",
            fontWeight: 700,
            lineHeight: 1.5,
            overflowWrap: "anywhere",
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent aria-busy={pending} sx={{ px: 3, pb: 3 }}>
          {description && (
            <DialogContentText
              id={`${id}-description`}
              sx={{
                lineHeight: 1.8,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              {description}
            </DialogContentText>
          )}
          {children}
        </DialogContent>
        <DialogActions
          sx={{
            gap: 1,
            p: 3,
            pt: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            bgcolor: "grey.50",
            flexWrap: "wrap",
            "& > :not(style) ~ :not(style)": { ml: 0 },
          }}
        >
          {actions ?? (
            <>
              {confirmation && (
                <Button
                  autoFocus
                  onClick={dismiss}
                  disabled={pending}
                  variant="outlined"
                  color="inherit"
                  sx={buttonSx}
                >
                  {cancelLabel}
                </Button>
              )}
              <Button
                autoFocus={!confirmation}
                onClick={onConfirm}
                disabled={pending}
                variant="contained"
                disableElevation
                color={destructive ? "error" : "primary"}
                sx={buttonSx}
                startIcon={
                  pending ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : undefined
                }
              >
                {pending ? "Saving…" : confirmLabel}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
