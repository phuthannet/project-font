import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [startPage, setStartPage] = useState(1);
  const maxPages = 5;

  const handleShowMore = () => {
    if (startPage + maxPages <= totalPages) {
      setStartPage(startPage + 1);
    }
  };

  const handleShowLess = () => {
    if (startPage > 1) {
      setStartPage(startPage - 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (
      let i = startPage;
      i <= Math.min(startPage + maxPages - 1, totalPages);
      i++
    ) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <nav className="flex justify-center mt-4">
      <ul className="grid grid-cols-6 gap-2">
        {startPage > 1 && (
          <li
            className="bg-gray-200 text-gray-700 border rounded-md px-3 py-2 cursor-pointer hover:bg-blue-400"
            onClick={handleShowLess}
          >
            <LeftOutlined />
          </li>
        )}
        {renderPageNumbers().map((number) => (
          <li
            key={number}
            className={`${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } border rounded-md px-3 py-2 cursor-pointer hover:bg-blue-400 text-center`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
        {startPage + maxPages - 1 < totalPages && (
          <li
            className="bg-gray-200 text-gray-700 border rounded-md px-3 py-2 cursor-pointer hover:bg-blue-400"
            onClick={handleShowMore}
          >
            <RightOutlined />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
