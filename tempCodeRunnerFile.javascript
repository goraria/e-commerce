

const formattedDate = (inputDateTime) => {
    const date = new Date(inputDateTime);

    const options = { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    const hours = date.getUTCHours(); // Giờ theo UTC
    const minutes = date.getUTCMinutes(); // Phút theo UTC

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    return `${formattedDate}, ${formattedTime}`;
}

console.log(formattedDate("2024-11-03T18:03:34.000Z"))