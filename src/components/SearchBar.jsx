import { useEffect, useState } from "react";
import "../assets/style/searchbar.css";

const SearchBar = ({ setContactList, fetchedContact }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const searchedContacts = fetchedContact.filter(
      (contact) =>
        searchTerm.toLowerCase().trim() === "" ||
        contact.name
          .toLocaleLowerCase()
          .trim()
          .includes(searchTerm.toLocaleLowerCase().trim()) ||
        contact.email
          .toLocaleLowerCase()
          .trim()
          .includes(searchTerm.toLocaleLowerCase().trim()) ||
        contact.phone
          .toLocaleLowerCase()
          .trim()
          .includes(searchTerm.toLocaleLowerCase().trim())
    );

    setContactList(searchedContacts);
  }, [searchTerm]);

  return (
    <div className="container search">
      <input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search contacts..."
      />
    </div>
  );
};

export default SearchBar;
