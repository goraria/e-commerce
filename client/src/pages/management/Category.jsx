import React, { useEffect, useState } from "react";
import { Table, Button, Form, Pagination, Dropdown, Badge } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {CategoryForm} from "../../components/modal/form/CategoryForm.jsx";

export const Category = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([])
    const fetchAPI = async () => {
        // const response = await axios.get("http://localhost:5172/admin/get-category")
        try {
            const response = await axios.get("http://localhost:5172/category/get-category")
            setData(response.data)
        } catch (error) {
            console.error("Error fetching category data:", error);
        }
    };

    const handleEdit = (idcategory) => {
        // Tìm user theo ID
        // console.log(idcategory)
        const categoryToEdit = data.find(product => product.idcategory === idcategory);
        // console.log(categoryToEdit)
        if (categoryToEdit) {
            setSelectedCategory(categoryToEdit); // Lưu thông tin user vào state `selectedUser`
            setModalShow(true); // Hiển thị modal để chỉnh sửa thông tin
        }
    };

    const handleModalClose = () => {
        fetchAPI();
        setModalShow(false);
        setSelectedCategory(null);
    };

    const handleDelete = async (id) => {
        try {
            // await axios.delete(`http://localhost:5172/admin/delete-category/${id}`);
            await axios.delete(`http://localhost:5172/category/delete-category/${id}`);

            fetchAPI();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEntries, setSelectedEntries] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allVisibleItems = filteredData.slice(indexOfFirstItem, indexOfLastItem).map(item => item.id);
            setSelectedEntries(allVisibleItems);
        } else {
            setSelectedEntries([]);
        }
    };

    const handleSelectItem = (id) => {
        if (selectedEntries.includes(id)) {
            setSelectedEntries(selectedEntries.filter(item => item !== id));
        } else {
            setSelectedEntries([...selectedEntries, id]);
        }
    };

    const filteredData = data.filter(item =>
        item.category_name.toLowerCase().includes(searchTerm.toLowerCase())
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

        return <Pagination className="m-0">{paginationItems}</Pagination>;
    };
    useEffect(() => {
        fetchAPI();
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
                            <th className="sorting" style={{verticalAlign: "middle", fontSize: 13}}>
                                Category Name
                            </th>
                            <th className="sorting_disabled text-center"
                                style={{verticalAlign: "middle", fontSize: 13, width: 156}}>Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index} style={{height: 64}}>
                                <td>
                                    <Form.Check
                                        className="dt-checkboxes-cell"
                                        type="checkbox"
                                        checked={selectedEntries.includes(item.id)}
                                        onChange={() => handleSelectItem(item.id)}
                                    />
                                </td>
                                <td className="sorting_1">
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-wrapper me-3 rounded-2 bg-label-secondary">
                                            <div className="avatar"><img
                                                src={`../assets/img/categories/${item.category_image}`}
                                                alt="Product-8"
                                                className="rounded"/></div>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center"><span
                                            className="text-heading text-wrap fw-medium">{item.category_name}</span><span
                                            className="text-truncate mb-0 d-none d-sm-block"><small>{item.category_description}</small></span>
                                        </div>
                                    </div>
                                </td>
                                {/* <td>{item.brand}</td> */}
                                {/* <td>{item.product_name}</td> */}
                                {/* <td> {item.role === 1 ? "Admin" : item.role === 0 ? "User" : "Unknown Role"}</td>
                                <td>{item.phone_number}</td> */}
                                <td>
                                    <Button variant="link" onClick={() => handleEdit(item.idcategory)}
                                            style={{marginLeft: 'auto'}}><i className='bx bx-edit' ></i></Button>
                                    <Button variant="link" onClick={() => handleDelete(item.idcategory)}
                                            style={{marginLeft: 'auto'}}><i className='bx bx-trash' ></i></Button>
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
                            <CategoryForm
                                show={modalShow}
                                // onHide={() => setModalShow(false)}
                                onHide={handleModalClose}
                                onReload='a'
                                category={selectedCategory}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
