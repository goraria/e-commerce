import React, { useEffect, useState } from "react";
import { Table, Button, Form, Pagination, Dropdown, Badge } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {ConfigurationForm} from "../../components/modal/form/ConfigurationForm.jsx";

export const ProductConfiguration = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([])
    const fetchAPI = async () => {
        const response = await axios.get("http://localhost:5172/admin/get-configration")
        setData(response.data)
    };
    const [data1, setData1] = useState([])
    const fetchAPI1 = async () => {
        const response = await axios.get("http://localhost:5172/products/load-product")
        setData1(response.data)
    };
    const mergedData = data.map(user => {
        const account = data1.find(acc => acc.idproduct === user.idproduct);
        return { ...user, ...account };
    });
    console.log(mergedData)

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEntries, setSelectedEntries] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    const handleEdit = (idconfiguration) => {
        // Tìm user theo ID
        console.log(idconfiguration)
        const configurationToEdit = mergedData.find(product => product.idconfiguration === idconfiguration);
        console.log(configurationToEdit)
        if (configurationToEdit) {
            setSelectedConfiguration(configurationToEdit); // Lưu thông tin user vào state `selectedUser`
            setModalShow(true); // Hiển thị modal để chỉnh sửa thông tin
        }
    };
    const handleModalClose = () => {
        fetchAPI();
        fetchAPI1();
        setModalShow(false);
        setSelectedConfiguration(null);
    };
    const [selectedConfiguration, setSelectedConfiguration] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allVisibleItems = filteredData.slice(indexOfFirstItem, indexOfLastItem).map(item => item.idconfi);
            setSelectedEntries(allVisibleItems);
        } else {
            setSelectedEntries([]);
        }
    };
    const handleNavigate = (idproduct) => {
        navigate(`/admin/profile_user/${idproduct}`); // điều hướng tới URL động với userId
    };
    const handleSelectItem = (idproduct) => {
        if (selectedEntries.includes(idproduct)) {
            setSelectedEntries(selectedEntries.filter(item => item !== idproduct));
        } else {
            setSelectedEntries([...selectedEntries, idproduct]);
        }
    };
    const handleDelete = async (id) => {
        try {

            // Send delete request to the server
            await axios.delete(`http://localhost:5172/admin/delete-configuration/${id}`);

            // Optionally, fetch the updated data again
            fetchAPI();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const filteredData = mergedData.filter(item => {
            const searchNumber = Number(searchTerm); // Chuyển đổi searchTerm thành số
            const isNumberSearch = !isNaN(searchNumber); // Kiểm tra xem searchNumber có phải là số

            return (item.cpu.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (isNumberSearch && item.ram === searchNumber) || // So sánh chỉ khi là số
                (isNumberSearch && item.screen === searchNumber) || // So sánh chỉ khi là số
                (isNumberSearch && item.price === searchNumber) ||
                item.resolution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (isNumberSearch && item.storage === searchNumber) ||
                item.gpu.toLowerCase().includes(searchTerm.toLowerCase()))

        }
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const getInitials = (name) => {
        const initials = name.split(" ").map(n => n[0]).join("");
        return initials;
    };
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
                                {/*<div className="head-label text-center">*/}
                                {/*    <h5 className="card-title mb-0">Category DataTable</h5>*/}
                                {/*</div>*/}
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
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                            </select>
                                            {/*<span>entries</span>*/}
                                        </label>
                                    </div>
                                </div>
                                <div className="dt-action-buttons text-end pt-6 pt-md-0">
                                    <div className="dt-buttons btn-group flex-wrap">
                                        <div>
                                            <Button variant="primary" type="button"
                                                    className="btn btn-secondary create-new btn-primary d-flex text-center"
                                                    onClick={() => setModalShow(true)}>
                                                <i className='bx bx-plus me-2'></i>
                                                Add New Category
                                            </Button>
                                        </div>
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
                                ["Product Name", "CPU", "GPU", "RAM", "Storage", "Screen", "Resolution", "Price"].map((item, index) => (
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
                                        checked={selectedEntries.includes(item.id)}
                                        onChange={() => handleSelectItem(item.id)}
                                    />
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-circle me-2">

                                        </div>
                                        <div>
                                            {item.product_name}
                                        </div>
                                    </div>
                                </td>
                                <td>{item.cpu}</td>
                                <td>{item.gpu}</td>
                                <td>{item.ram}</td>
                                <td>{item.storage}</td>
                                <td>{item.screen}</td>
                                <td>{item.resolution}</td>
                                <td>{item.price}</td>
                                <td>
                                    <Button
                                        variant="link"
                                        onClick={() => handleEdit(item.idconfiguration)}
                                        className="p-2">
                                        <i className='bx bx-edit'></i>
                                    </Button>
                                    <Button
                                        variant="link"
                                        onClick={() => handleDelete(item.idconfiguration)}
                                        className="p-2">
                                        <i className='bx bx-trash'></i>
                                    </Button>
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
                            <div className="col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end">
                                {renderPagination()}
                            </div>
                            <ConfigurationForm
                                show={modalShow}
                                // onHide={() => setModalShow(false)}
                                onHide={handleModalClose}
                                onReload='a'
                                configuration={selectedConfiguration}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
