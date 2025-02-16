import React, { useEffect, useState } from "react";
import { Table, Button, Form, Pagination, Dropdown, Badge } from "react-bootstrap";
import axios from 'axios';
import DescriptionForm from "../../components/modal/form/DescriptionForm.jsx";
import apiHandler from "../../utils/apiHandler.jsx";

export default function ProductDescription() {
    const [data, setData] = useState([])

    const [data1, setData1] = useState([])
    const fetchData = async () => {
        try {
            const [descriptionResponse, productsResponse] = await Promise.all([
                apiHandler.get("/admin/get-description"),
                apiHandler.get("/products/get-product"),
                // axios.get("http://localhost:5172/admin/payhd"),
            ]);
            setData(descriptionResponse.data);
            setData1(productsResponse.data);
            // setData2(payhdResponse.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };
    const mergedData = data.map(user => {
        const account = data1.find(acc => acc.idproduct === user.idproduct);
        return { ...user, ...account };
    });
    // console.log(mergedData)

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEntries, setSelectedEntries] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(7);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    const handleEdit = (iddescription) => {

        const DescriptionToEdit = mergedData.find(product => product.iddescription === iddescription);
        if (DescriptionToEdit) {
            setSelectedDescription(DescriptionToEdit); // Lưu thông tin user vào state `selectedUser`
            setModalShow(true); // Hiển thị modal để chỉnh sửa thông tin
        }
    };
    const handleModalClose = () => {
        fetchData();
        setModalShow(false);
        setSelectedDescription(null);
    };
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allVisibleItems = filteredData.slice(indexOfFirstItem, indexOfLastItem).map(item => item.iddescription);
            setSelectedEntries(allVisibleItems);
        } else {
            setSelectedEntries([]);
        }
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
            await apiHandler.delete(`/admin/delete-description/${id}`);

            // Optionally, fetch the updated data again
            fetchData();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const filteredData = mergedData.filter(item =>
        item.title_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sub_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.img_description.toLowerCase().includes(searchTerm.toLowerCase())
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

        // Nếu chỉ có 1 trang, không cần hiển thị phân trang
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

        // Thêm nút 'First' và 'Previous'
        paginationItems.push(
            <Pagination.First
                key="first"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
            />,
            <Pagination.Prev
                key="prev"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
            />
        );

        if (totalPages <= 7) {
            // Hiển thị tất cả các trang nếu số trang <= 7
            for (let i = 1; i <= totalPages; i++) {
                paginationItems.push(addPageButton(i));
            }
        } else {
            // Hiển thị phân trang với dấu `...`
            if (currentPage <= 4) {
                // Trường hợp trang hiện tại nằm trong khoảng 1 - 4
                for (let i = 1; i <= 5; i++) {
                    paginationItems.push(addPageButton(i));
                }
                paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
                paginationItems.push(addPageButton(totalPages));
            } else if (currentPage >= totalPages - 3) {
                // Trường hợp trang hiện tại nằm trong khoảng cuối (totalPages - 3 đến totalPages)
                paginationItems.push(addPageButton(1));
                paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    paginationItems.push(addPageButton(i));
                }
            } else {
                // Trường hợp trang hiện tại ở giữa
                paginationItems.push(addPageButton(1));
                paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
                paginationItems.push(addPageButton(currentPage - 1));
                paginationItems.push(addPageButton(currentPage));
                paginationItems.push(addPageButton(currentPage + 1));
                paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
                paginationItems.push(addPageButton(totalPages));
            }
        }

        // Thêm nút 'Next' và 'Last'
        paginationItems.push(
            <Pagination.Next
                key="next"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            />,
            <Pagination.Last
                key="last"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
            />
        );

        return <Pagination className="m-0">{paginationItems}</Pagination>;
    };

    useEffect(() => {
        // fetchAPI();
        // fetchAPI1();
        fetchData();
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
                                ["Product Name", "Description"].map((item, index) => (
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
                                        checked={selectedEntries.includes(item.iddescription)}
                                        onChange={() => handleSelectItem(item.iddescription)}
                                    />
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="avatar-wrapper me-3 rounded-2 bg-label-secondary">
                                            <div className="avatar">
                                                <img
                                                    // src={`../assets/img/categories/product-7.png`}
                                                    src={item.product_image}
                                                    alt="Product-8"
                                                    className="rounded"
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <span className="text-heading text-wrap fw-medium">
                                                {`${item.brand} ${item.product_name}`}
                                            </span>
                                            <span className="text-truncate mb-0 d-none d-sm-block">
                                                <small>{item.img_description}</small>
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex flex-column justify-content-center">
                                            <span className="text-heading text-wrap fw-medium">
                                                {`${item.title_description}`}
                                            </span>
                                            <span className="text-truncate mb-0 d-none d-sm-block">
                                                <small>{item.sub_description}</small>
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <Button
                                        variant="link"
                                        onClick={() => handleEdit(item.iddescription)}
                                        className="text-body p-2">
                                        <i className='bx bx-edit'></i>
                                    </Button>
                                    <Button
                                        variant="link"
                                        onClick={() => handleDelete(item.iddescription)}
                                        className="text-body p-2">
                                        <i className='bx bx-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <div className="card-footer flex-column flex-md-row pb-0 pb-4">
                        <div className="row">
                            <div className="d-flex col-sm-12 col-md-6">
                                <div className="dataTables_info d-flex justify-content-start align-items-center">
                                    <div className="text-center mt-2">
                                        Showing {currentItems.length} of {filteredData.length} entries
                                    </div>
                                </div>
                                <div className="ms-2 me-2"></div>
                                <div className="dataTables_select d-flex justify-content-start align-items-center">
                                    <div className="text-center mt-2">
                                        Selected {selectedEntries.length} entries
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end">
                                {renderPagination()}
                            </div>
                            <DescriptionForm
                                show={modalShow}
                                // onHide={() => setModalShow(false)}
                                onHide={handleModalClose}
                                onReload='a'
                                description={selectedDescription}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}