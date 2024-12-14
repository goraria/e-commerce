

const formattedDate = (inputDateTime) => {
    const date = new Date(inputDateTime);

    // Định dạng ngày tháng năm
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options); // Ví dụ: "Sep 29, 2024"

    // Lấy giờ và phút
    const hours = date.getHours(); // Giờ ở dạng 24h
    const minutes = date.getMinutes();

    // Định dạng giờ và phút
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    return `${formattedDate}, ${formattedTime}`;
}

console.log(formattedDate("2024-11-03T18:03:34.000Z"))