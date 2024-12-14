import React, { useState } from "react";
import { Table, Button, Form, Pagination } from "react-bootstrap";

const DataTable = () => {
    // Dữ liệu mẫu
    const [data, setData] = useState([
        { name: "Glyn Giacoppo", email: "ggiacoppo2r@apache.org", date: "04/15/2021", salary: "$24973.48", status: "Professional" },
        { name: "Evangelina Carnock", email: "ecarnock2q@washington.edu", date: "01/26/2021", salary: "$23704.82", status: "Resigned" },
        { name: "Olivette Gudgin", email: "ogudgin2p@gizmodo.com", date: "04/09/2021", salary: "$15211.60", status: "Professional" },
        { name: "Reina Peckett", email: "rpeckett2o@timesonline.co.uk", date: "05/20/2021", salary: "$16619.40", status: "Resigned" },
        { name: "Alaric Beslier", email: "abeslier2n@zimbio.com", date: "04/16/2021", salary: "$19366.53", status: "Resigned" },
        { name: "Edwina Ebsworth", email: "eebsworth2m@sbwire.com", date: "09/27/2021", salary: "$19586.23", status: "Current" },
        { name: "Ronica Hasted", email: "rhasted2l@hexun.com", date: "07/04/2021", salary: "$24866.66", status: "Resigned" },
        { name: "Glyn Giacoppo", email: "ggiacoppo2r@apache.org", date: "04/15/2021", salary: "$24973.48", status: "Professional" },
        { name: "Evangelina Carnock", email: "ecarnock2q@washington.edu", date: "01/26/2021", salary: "$23704.82", status: "Resigned" },
        { name: "Olivette Gudgin", email: "ogudgin2p@gizmodo.com", date: "04/09/2021", salary: "$15211.60", status: "Professional" },
        { name: "Reina Peckett", email: "rpeckett2o@timesonline.co.uk", date: "05/20/2021", salary: "$16619.40", status: "Resigned" },
        { name: "Alaric Beslier", email: "abeslier2n@zimbio.com", date: "04/16/2021", salary: "$19366.53", status: "Resigned" },
        { name: "Edwina Ebsworth", email: "eebsworth2m@sbwire.com", date: "09/27/2021", salary: "$19586.23", status: "Current" },
        { name: "Ronica Hasted", email: "rhasted2l@ádasdasdsa.com", date: "07/04/2021", salary: "$24866.66", status: "Resigned" }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    // Hàm xử lý tìm kiếm
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset trang khi tìm kiếm
    };

    // Lọc dữ liệu theo từ khóa tìm kiếm
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div>
            <h2>DataTable with Buttons</h2>
            <div className="d-flex justify-content-between mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <Button variant="primary">Add New Record</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Salary</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.date}</td>
                            <td>{item.salary}</td>
                            <td>{item.status}</td>
                            <td>
                                <Button variant="link">Edit</Button>
                                <Button variant="link">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            <div>Showing {currentItems.length} of {filteredData.length} entries</div>
        </div>
    );
};

export default DataTable;
