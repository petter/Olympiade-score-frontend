import { toast, ToastContent } from 'react-toastify';
import styles from './toast.module.css';

const defaultOptions = {

    position: toast.POSITION.TOP_RIGHT,
    closeButton: false,
    hideProgressBar: true,
    className: styles.Toast,
}

export default {
    success(msg: ToastContent, options = {}) {
        return toast.success(msg, {
            ...options,
            ...defaultOptions
        })
    }
}