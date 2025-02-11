// src/utils/.ts

export const getNoticeIcon = (type) => {
    switch (type) {
        case "success":
            return "bx-check-circle";
        case "danger":
            return "bx-error-circle";
        case "warning":
            return "bx-help-circle";
        case "info":
            return "bx-info-circle";
        case "primary":
            return "bx-heart-circle";
        default:
            return "bx-circle";
    }
}

export const getCategoryIcon = (icon) => {
    switch (icon) {
        case "success":
            return "bx-check-circle";
        case "danger":
            return "bx-error-circle";
        case "warning":
            return "bx-help-circle";
        case "info":
            return "bx-info-circle";
        case "primary":
            return "bx-heart-circle";
        default:
            return "bx-circle";
    }
}
