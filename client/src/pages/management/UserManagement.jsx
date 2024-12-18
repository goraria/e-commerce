import React, { useEffect, useState } from "react";
import { Table, Button, Form, Pagination, Dropdown, Badge } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {UserForm} from "../../components/modal/form/UserForm.jsx";

export const UserManagement = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([])
    const fetchAPI = async () => {
        const response = await axios.get("http://localhost:5172/admin/get-user")
        // console.log(response.data)
        setData(response.data)
    };
    const [data1, setData1] = useState([])
    const fetchAPI1 = async () => {
        const response = await axios.get("http://localhost:5172/admin/get-account")
        // console.log(response.data)
        setData1(response.data)
    };
    const mergedData = data.map(user => {
        const account = data1.find(acc => acc.idaccount === user.idaccount);
        return { ...user, ...account };
    });
    // console.log(mergedData)
    const handleModalClose = () => {
        fetchAPI1();
        // fetchAPI1();
        setModalShow(false);
        setSelectedUser(null);
    };
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalShow, setModalShow] = useState(false);


    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEntries, setSelectedEntries] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(7);

    const [reloadTrigger, setReloadTrigger] = useState(0);
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    const handleReload = () => {
        setReloadTrigger(reloadTrigger + 1);
    };
    const handleEdit = (userId) => {
        // Tìm user theo ID
        const userToEdit = mergedData.find(user => user.idaccount === userId);
        if (userToEdit) {
            setSelectedUser(userToEdit); // Lưu thông tin user vào state `selectedUser`
            setModalShow(true); // Hiển thị modal để chỉnh sửa thông tin
        }
    };
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allVisibleItems = filteredData.slice(indexOfFirstItem, indexOfLastItem).map(item => item.iduser);
            setSelectedEntries(allVisibleItems);
        } else {
            setSelectedEntries([]);
        }
    };
    const handleSelectItem = (iduser) => {
        if (selectedEntries.includes(iduser)) {
            setSelectedEntries(selectedEntries.filter(item => item !== iduser));
        } else {
            setSelectedEntries([...selectedEntries, iduser]);
        }
    };

    const filteredData = mergedData.filter(item =>
        item.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lastname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // const getInitials = (name) => {
    //     const initials = name.split(" ").map(n => n[0]).join("");
    //     return initials;
    // };
    // const getInitials = (firstname, lastname) => {
    //     return (firstname + lastname);
    // };
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);

        if (totalPages <= 1) return null;

        const paginationItems = [];
        const addPageButton = (pageNumber) => (
            <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => setCurrentPage(pageNumber)}
            >
                {pageNumber}
            </Pagination.Item>
        );

        // Thêm nút 'First' và 'Previous' với Font Awesome icons
        paginationItems.push(
            <Pagination.First
                key="first"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}>
                <i className='bx bx-chevrons-left' ></i> {/* << */}
            </Pagination.First>,

            <Pagination.Prev
                key="prev"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}>
                <i className='bx bx-chevron-left'></i> {/* < */}
            </Pagination.Prev>
        );

        // Nếu đang ở các trang đầu (1-3), hiển thị 5 trang đầu và trang cuối cùng
        if (currentPage <= 3) {
            for (let i = 1; i <= Math.min(5, totalPages); i++) {
                paginationItems.push(addPageButton(i));
            }
            if (totalPages > 5) {
                paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled>
                    <i className='bx bx-dots-horizontal-rounded' ></i> {/* ... */}
                </Pagination.Ellipsis>);
                paginationItems.push(addPageButton(totalPages));
            }
        }
        // Nếu đang ở các trang cuối (từ totalPages - 2 trở lên), hiển thị 5 trang cuối và trang đầu tiên
        else if (currentPage >= totalPages - 2) {
            paginationItems.push(addPageButton(1));
            paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" disabled>
                <i className='bx bx-dots-horizontal-rounded' ></i> {/* ... */}
            </Pagination.Ellipsis>);
            for (let i = totalPages - 4; i <= totalPages; i++) {
                paginationItems.push(addPageButton(i));
            }
        }
        // Nếu đang ở giữa (trang 4 đến totalPages - 3), hiển thị trang đầu, ... trang hiện tại, và dấu ... cuối
        else {
            paginationItems.push(addPageButton(1)); // Trang đầu tiên
            paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" disabled>
                <i className='bx bx-dots-horizontal-rounded' ></i> {/* ... */}
            </Pagination.Ellipsis>);

            const startPage = currentPage - 1; // Trang trước
            const endPage = currentPage + 1;   // Trang sau

            for (let i = startPage; i <= endPage; i++) {
                paginationItems.push(addPageButton(i));
            }

            paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled>
                <i className='bx bx-dots-horizontal-rounded' ></i> {/* ... */}
            </Pagination.Ellipsis>);
            paginationItems.push(addPageButton(totalPages)); // Trang cuối cùng
        }

        // Thêm nút 'Next' và 'Last' với Font Awesome icons
        paginationItems.push(
            <Pagination.Next
                key="next"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}>
                <i className='bx bx-chevron-right' ></i> {/* > */}
            </Pagination.Next>,

            <Pagination.Last
                key="last"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}>
                <i className='bx bx-chevrons-right' ></i> {/* >> */}
            </Pagination.Last>
        );

        return <Pagination style={{ margin: 0 }}>{paginationItems}</Pagination>;
    };


    const renderRoleBadge = (role) => {
        switch (role) {
            case 1: // "Admin"
                return <span className="text-truncate d-flex align-items-center text-heading">
                    <i className="bx bx-desktop text-danger me-2"></i>Admin</span>;
            case 0: // "User"
                return <span className="text-truncate d-flex align-items-center text-heading">
                    <i className="bx bx-user text-success me-2"></i>User</span>;
            case "Subscriber":
                return <span className="text-truncate d-flex align-items-center text-heading">
                    <i className="bx bx-crown text-primary me-2"></i>Subscriber</span>;
            case "Editor":
                return <span className="text-truncate d-flex align-items-center text-heading">
                    <i className="bx bx-pie-chart-alt text-info me-2"></i>Editor</span>;
            case "Author":
                return <span className="text-truncate d-flex align-items-center text-heading">
                    <i className="bx bx-edit text-warning me-2"></i>Author</span>;
            default:
                return <span className="text-truncate d-flex align-items-center text-heading">
                    <i className="bx bx-badge text-primary me-2"></i>Other</span>;
        }
    };

    useEffect(() => {
        fetchAPI();
        fetchAPI1();
    }, []);

    return (
        <>
            <div className="card">
                <div className="card-datatable table-responsive">
                    <div className="dataTables_wrapper dt-bootstrap5 no-footer">
                        <div className="card-header flex-column flex-md-row pb-0">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="col-sm-12 col-md-6 d-flex">
                                    <div
                                        className="dataTables_filter mb-0 mb-md-6 d-flex justify-content-center justify-content-md-end mt-n6 mt-md-0 me-3"> {/* col-sm-6 col-md-2 */}
                                        <Form.Control
                                            className="form-control"
                                            type="search"
                                            placeholder="Search..."
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                    <div className="dataTables_length">
                                        <label className="d-flex justify-content-left align-items-center">
                                            {/*<span>Show</span>*/}
                                            <select
                                                name="DataTables_Table_0_length"
                                                aria-controls="DataTables_Table_0"
                                                className="form-select" // ms-3 me-3
                                                style={{width: "80px"}}
                                                onChange={handleItemsPerPageChange}
                                                value={itemsPerPage}
                                            >
                                                <option value="10">7</option>
                                                <option value="10">10</option>
                                                <option value="25">20</option>
                                                <option value="50">50</option>
                                                <option value="50">70</option>
                                                <option value="50">100</option>
                                            </select>
                                            {/*<span>entries</span>*/}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Table hover responsive className="table border-top dataTable datatable no-footer dtr-column">
                        <thead style={{height: 64}}>
                        <tr>
                            <th
                                className="sorting_disabled dt-checkboxes-cell dt-checkboxes-select-all"
                                style={{verticalAlign: "middle", fontSize: 16, width: 18}}
                            >
                                <Form.Check
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedEntries.length === currentItems.length && currentItems.length > 0}
                                />
                            </th>
                            {
                                ["User", "UserName", "Role", "Phone Number"].map((item, index) => (
                                    <th className="sorting" key={index} style={{verticalAlign: "middle", fontSize: 13}}>
                                        {item}
                                    </th>
                                ))
                            }
                            <th className="sorting_disabled text-center"
                                style={{verticalAlign: "middle", fontSize: 13, width: 120}}>Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        checked={selectedEntries.includes(item.idaccount)}
                                        onChange={() => handleSelectItem(item.idaccount)}
                                    />
                                </td>
                                <td className="sorting_1">
                                    <div className="d-flex justify-content-start align-items-center user-name">
                                        <div className="avatar-wrapper">
                                            <div className="avatar avatar-sm me-4">
                                                <span className={`avatar-initial rounded-circle bg-label-${"primary"}`}>
                                                    {item.firstname[0]}{item.lastname[0]}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <a className="text-heading text-truncate">
                                                <span className="fw-medium">{`${item.firstname} ${item.lastname}`}</span>
                                            </a>
                                            <small>{item.email}</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.username}
                                </td>
                                <td>{renderRoleBadge(item.role)}</td>
                                <td>{item.phone_number}</td>
                                <td>
                                    <Button variant="link" onClick={() => handleEdit(item.idaccount)}>
                                        <i className='bx bx-edit' ></i>
                                    </Button>
                                    {/* <Button variant="link"><i className='bx bx-trash'></i></Button> */}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <div className="card-footer flex-column flex-md-row pb-0 pb-4">
                        <div className="row">
                            <div className="col-sm-12 col-md-6" style={{display: "flex"}}>
                                <div className="dataTables_info"
                                     style={{display: "flex", justifyContent: "left", alignItems: "center"}}>
                                    <div className="text-center mt-2">
                                        Showing {currentItems.length} of {filteredData.length} entries
                                    </div>
                                </div>
                                <div className="ms-2 me-2"></div>
                                <div className="dataTables_select"
                                     style={{display: "flex", justifyContent: "left", alignItems: "center"}}>
                                    <div className="text-center mt-2">
                                        Selected {selectedEntries.length} entries
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-sm-12 col-md-6">
                            <div className="dataTables_paginate paging_simple_numbers" style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                                <Pagination className="d-flex justify-content-center" style={{ margin: 0 }}>
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
                            </div>
                        </div> */}

                            <div className="col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end">
                                {renderPagination()}
                            </div>
                            <UserForm
                                show={modalShow}
                                // onHide={() => setModalShow(false)}
                                onHide={handleModalClose}
                                onReload='a'
                                user={selectedUser}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};