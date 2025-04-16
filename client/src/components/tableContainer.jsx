import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Input, Row, Table } from "reactstrap";

const TableContainer = ({
  columns = [],
  data = [],
  isAddButton,
  isPagination,
  handleUserClick,
  text,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const filteredData = data.filter((row) =>
    columns.some((col) =>
      String(row[col.accessorKey])
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Fragment>
      <Row className="mb-2 align-items-center justify-content-between">
        <Col sm={2}>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="form-select"
            style={{ width: "auto" }}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </Col>
        <Col sm={6} className="d-flex justify-content-center">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: "400px" }}
          />
        </Col>
        {isAddButton && (
          <Col sm={2} className="d-flex justify-content-end">
            <Button color="primary" onClick={handleUserClick}>
              Add {text}
            </Button>
          </Col>
        )}
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col.cell
                      ? col.cell({ row, rowIndex })
                      : row[col.accessorKey]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </Table>
      {isPagination && (
        <Row className="mt-3 d-flex justify-content-between align-items-center">
          <Col sm={4}>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
          </Col>
          <Col sm={12} md={1} className="d-flex justify-content-end">
            <div className="dataTables_paginate paging_simple_numbers pagination-rounded">
              <ul className="pagination">
                <li
                  className={`paginate_button page-item previous ${
                    currentPage === 1 ? "disabled" : ""
                  }`}
                >
                  <Link
                    to="#"
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    {"<"}
                  </Link>
                </li>

                <li className="paginate_button page-item active">
                  <span className="page-link">{currentPage}</span>
                </li>

                <li
                  className={`paginate_button page-item next ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <Link
                    to="#"
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    {">"}
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default TableContainer;
