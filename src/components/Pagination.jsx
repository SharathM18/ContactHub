import { useState, useEffect } from "react";
import "../assets/style/pagination.css";

const pagination = ({ contactList, setContacts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pagePerContact] = useState(7);

  useEffect(() => {
    const lastPageIndex = currentPage * pagePerContact;
    const firstPageIndex = lastPageIndex - pagePerContact;

    const currentPageContacts = contactList.slice(
      firstPageIndex,
      lastPageIndex
    );
    setContacts(currentPageContacts);
  }, [contactList, currentPage]);

  const lastPages = Math.ceil(contactList.length / pagePerContact);

  return (
    <>
      <div className="container pagination_container">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination_btn"
        >
          Previous
        </button>
        <span className="display_page_no">
          {currentPage} - {lastPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === lastPages}
          className="pagination_btn"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default pagination;
