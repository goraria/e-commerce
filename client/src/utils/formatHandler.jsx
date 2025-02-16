export const formatRatingScore = (rating) => {

}

export const formatDateTime = (inputDateTime) => {
    const date = new Date(inputDateTime);

    const options = { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    const hours = date.getUTCHours(); // Giờ theo UTC
    const minutes = date.getUTCMinutes(); // Phút theo UTC

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    return `${formattedDate}, ${formattedTime}`;
}