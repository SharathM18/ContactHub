import "../../assets/style/contact.css";
import DeleteContact from "../DeleteContact";
import EditContact from "../EditContact";

const Contact = ({ name, email, phone }) => {
  return (
    <>
      <tr className="table_row">
        <td className="name-column">{name}</td>
        <td className="email-column">{email}</td>
        <td className="phone-column">{phone}</td>
        <td className="action-column">
          <EditContact />
          <DeleteContact />
        </td>
      </tr>
    </>
  );
};

export default Contact;
