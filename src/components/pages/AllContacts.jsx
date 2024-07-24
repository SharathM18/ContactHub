import { useState } from "react";
import Contact from "../pages/Contact";
import "../../assets/style/allcontact.css";
import SearchBar from "../SearchBar";
import PageLoading from "../../../utils/PageLoading";
import Pagination from "../Pagination";

const AllContacts = () => {
  const [fetchedContact, setFetchedContact] = useState([
    { id: 1, name: "Alex", email: "alex@alex.com", phone: "9876543210" },
    {
      id: 2,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "2345678901",
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "3456789012",
    },
    {
      id: 5,
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      phone: "4567890123",
    },
    {
      id: 6,
      name: "Chris Lee",
      email: "chris.lee@example.com",
      phone: "5678901234",
    },
    {
      id: 7,
      name: "Anna White",
      email: "anna.white@example.com",
      phone: "6789012345",
    },
    {
      id: 8,
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "7890123456",
    },
    {
      id: 9,
      name: "Emma Davis",
      email: "emma.davis@example.com",
      phone: "8901234567",
    },
    {
      id: 10,
      name: "Sophia Martinez",
      email: "sophia.martinez@example.com",
      phone: "9012345678",
    },
    {
      id: 11,
      name: "Liam Thompson",
      email: "liam.thompson@example.com",
      phone: "1112233445",
    },
    {
      id: 12,
      name: "Olivia Harris",
      email: "olivia.harris@example.com",
      phone: "2223344556",
    },
    {
      id: 13,
      name: "Noah Lewis",
      email: "noah.lewis@example.com",
      phone: "3334455667",
    },
    {
      id: 14,
      name: "Ava Walker",
      email: "ava.walker@example.com",
      phone: "4445566778",
    },
    {
      id: 15,
      name: "Mason Hall",
      email: "mason.hall@example.com",
      phone: "5556677889",
    },
    {
      id: 16,
      name: "Isabella Young",
      email: "isabella.young@example.com",
      phone: "6667788990",
    },
    {
      id: 17,
      name: "Lucas Allen",
      email: "lucas.allen@example.com",
      phone: "7778899001",
    },
    {
      id: 18,
      name: "Mia King",
      email: "mia.king@example.com",
      phone: "8889900112",
    },
    {
      id: 19,
      name: "Elijah Wright",
      email: "elijah.wright@example.com",
      phone: "9990011223",
    },
    {
      id: 20,
      name: "Amelia Scott",
      email: "amelia.scott@example.com",
      phone: "0001122334",
    },
    {
      id: 21,
      name: "James Green",
      email: "james.green@example.com",
      phone: "1231231234",
    },
    {
      id: 22,
      name: "Charlotte Adams",
      email: "charlotte.adams@example.com",
      phone: "2342342345",
    },
    {
      id: 23,
      name: "Benjamin Baker",
      email: "benjamin.baker@example.com",
      phone: "3453453456",
    },
    {
      id: 24,
      name: "Harper Nelson",
      email: "harper.nelson@example.com",
      phone: "4564564567",
    },
    {
      id: 25,
      name: "Henry Carter",
      email: "henry.carter@example.com",
      phone: "5675675678",
    },
  ]);
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);

  return (
    <>
      {loading ? (
        <PageLoading />
      ) : fetchedContact.length === 0 ? (
        <p className="no_contact_found_msg container">
          Looks like your contact list is empty. Add some friends to get
          started!
        </p>
      ) : (
        <div>
          <SearchBar
            setContactList={setContactList}
            fetchedContact={fetchedContact}
          />

          <div className="container table_container">
            <table className="contactlist_table">
              <thead>
                <tr className="table_row">
                  <th className="name-column">Name</th>
                  <th className="email-column">Email</th>
                  <th className="phone-column">Phone Number</th>
                  <th className="action-column">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts &&
                  contacts.map((contact) => (
                    <Contact
                      key={contact.id}
                      name={contact.name}
                      email={contact.email}
                      phone={contact.phone}
                    />
                  ))}
              </tbody>
            </table>
          </div>

          <Pagination contactList={contactList} setContacts={setContacts} />
        </div>
      )}
    </>
  );
};

export default AllContacts;
