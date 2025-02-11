// src/utils/.ts

export function getNoticeIcon(type) {
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
