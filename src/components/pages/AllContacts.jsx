import { useState, useEffect } from "react";
import "../../assets/style/allcontact.css";
import SearchBar from "../SearchBar";
import PageLoading from "../../../utils/PageLoading";
import Pagination from "../Pagination";
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { useSelector } from "react-redux";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AllContacts = () => {
  const [fetchedContact, setFetchedContact] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const userDetails = useSelector((state) => state.authSlice.userDetails);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const contactSnapshot = await getDocs(
          query(collection(db, `users/${userDetails.uid}/contacts`))
        );
        const fetchedContacts = contactSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFetchedContact(fetchedContacts);
      } catch (error) {
        console.log("all contacts error: ", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [userDetails]);

  const handleDeleteContact = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, `users/${userDetails.uid}/contacts/${id}`));

      if (imageURL !== "") {
        const imageRef = ref(storage, imageURL);
        await deleteObject(imageRef);
      }

      setContacts((prev) =>
        prev.filter((prevContact) => prevContact.id !== id)
      );
    } catch (error) {
      console.log("contact delete error", error.message);
    }
  };

  const handleEditContact = (contact) => {
    navigate("/addcontact", { state: contact });
  };

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
                    <tr className="table_row" key={contact.id}>
                      <td className="name-column">
                        <div className="photo_name">
                          {contact.imageURL === "" ? (
                            <i
                              className="bi bi-person-circle"
                              style={{
                                fontSize: "2.1em",
                                color: "var(--text-color)",
                              }}
                            ></i>
                          ) : (
                            <img
                              src={contact.imageURL}
                              className="photo"
                              alt=""
                            />
                          )}
                          <p>{contact.name}</p>
                        </div>
                      </td>
                      <td className="email-column">{contact.email}</td>
                      <td className="phone-column">{contact.phone}</td>
                      <td className="action-column">
                        <i
                          className="bi bi-pencil-square"
                          style={{
                            fontSize: "20px",
                            color: "var(--text-color)",
                            padding: "0 10px",
                          }}
                          onClick={() => {
                            handleEditContact(contact);
                          }}
                        ></i>

                        <i
                          className="bi bi-trash3"
                          style={{
                            fontSize: "20px",
                            color: "var(--text-color)",
                            padding: "0 10px",
                          }}
                          onClick={() => {
                            handleDeleteContact(contact.id, contact.imageURL);
                          }}
                        ></i>
                      </td>
                    </tr>
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
