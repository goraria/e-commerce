import React, {useEffect, useRef, useState} from "react";
import apiHandler from "../../utils/apiHandler.jsx";
import { Pagination } from 'react-bootstrap';

export const PaginationCustom = ({ currentPage, totalPages, onPageChange }) => {
    // Nếu chỉ có 1 trang, không cần hiển thị phân trang
    if (totalPages <= 1) return null;

    const paginationItems = [];

    // Hàm tạo nút trang
    const addPageButton = (pageNumber) => (
        <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
        >
            {pageNumber}
        </Pagination.Item>
    );

    // Thêm nút 'First' và 'Prev'
    paginationItems.push(
        <Pagination.First
            key="first"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
        />,
        <Pagination.Prev
            key="prev"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
        />
    );

    if (totalPages <= 7) {
        // Hiển thị tất cả các trang nếu tổng số trang <= 7
        for (let i = 1; i <= totalPages; i++) {
            paginationItems.push(addPageButton(i));
        }
    } else {
        if (currentPage <= 4) {
            // Nếu trang hiện tại nằm trong khoảng 1 - 4
            for (let i = 1; i <= 5; i++) {
                paginationItems.push(addPageButton(i));
            }
            paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
            paginationItems.push(addPageButton(totalPages));
        } else if (currentPage >= totalPages - 3) {
            // Nếu trang hiện tại nằm ở cuối
            paginationItems.push(addPageButton(1));
            paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
            for (let i = totalPages - 4; i <= totalPages; i++) {
                paginationItems.push(addPageButton(i));
            }
        } else {
            // Nếu trang hiện tại ở giữa
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
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        />,
        <Pagination.Last
            key="last"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
        />
    );

    return <Pagination className="m-0">{paginationItems}</Pagination>;
}


export const PaginationCustomOld = () => {
    const [data, setData] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEntries, setSelectedEntries] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(7);

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showFromCalendar, setShowFromCalendar] = useState(false);
    const [showToCalendar, setShowToCalendar] = useState(false);
    const [error, setError] = useState("");
    const fromCalendarRef = useRef(null);
    const toCalendarRef = useRef(null);

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalData, setModalData] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    const fetchStatistics = async () => {
        try {
            const response = await apiHandler.get('/bill/list-all');
            setData(response.data);
            // console.log(response.data);
        } catch (error) {
            // console.error('Lỗi khi lấy dữ liệu:', error);
            setError(`Lỗi khi lấy dữ liệu: ${error}`);
        } finally {
            // setLoading(false);
        }
    }

    const onFromDateChange = (date) => {
        if (toDate && date >= toDate) {
            setError("Ngày bắt đầu phải trước ngày kết thúc.");
        } else {
            setError("");
            setFromDate(date);
            setShowFromCalendar(false);
        }
    };

    const onToDateChange = (date) => {
        if (fromDate && date <= fromDate) {
            setError("Ngày kết thúc phải sau ngày bắt đầu.");
        } else {
            setError("");
            setToDate(date);
            setShowToCalendar(false);
        }
    };

    const handleClickOutside = event => {
        if (
            fromCalendarRef.current &&
            !fromCalendarRef.current.contains(event.target) &&
            toCalendarRef.current &&
            !toCalendarRef.current.contains(event.target)
        ) {
            setShowFromCalendar(false);
            setShowToCalendar(false);
        }
    };

    useEffect(() => {
        fetchStatistics()
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
        // item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // item.email.toLowerCase().includes(searchTerm.toLowerCase())

        item.account?.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const getInitials = (name) => {
        const initials = name.split(" ").map(n => n[0]).join("");
        return initials;
    };

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

    const handleOpenModal = (item) => {
        setModalData(item); // Cập nhật dữ liệu cho modal
        setShowModal(true);  // Mở modal
    };
}