import React from "react";
import { Pagination } from "react-bootstrap";
import "./PagingNumber.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paging: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Pagination>
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </Pagination>
  );
};

export default Paging;
