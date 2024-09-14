import { useSnackbar } from "notistack";

const useNotification = () => {
    const { enqueueSnackbar } = useSnackbar();
    return (text, type, duration) => {
        enqueueSnackbar(text, {
            variant: type,
            autoHideDuration: duration,
        });
    };
};

export default useNotification;
