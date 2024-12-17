const formatDateTime = (inputDateTime) => {
    const date = new Date(inputDateTime);

    const utcTime = date.getTime() + date.getTimezoneOffset() * 60000; // Chuyển UTC
    const gmt7Time = new Date(utcTime + 7 * 60 * 60000); // Cộng thêm 7 giờ

    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = gmt7Time.toLocaleDateString("en-US", options);

    const hours = gmt7Time.getHours(); // Dạng 24 giờ
    const minutes = gmt7Time.getMinutes();

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    return `${formattedDate}, ${formattedTime}`;
}

const a = (inputDateTime) => {
    const date = new Date(inputDateTime);

    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options); // Ví dụ: "Sep 29, 2024"

    const hours = date.getHours(); // Lấy giờ dạng 24h
    const minutes = date.getMinutes();

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    return `${formattedDate}, ${formattedTime}`;
}

console.log(a("2024-11-03 18:03:34"))