import {useContext} from "react";
import {ContactContext} from "../App.jsx";
import ContactListItem from "./ContactListItem.jsx";

function ContactList() {
  const { contacts } = useContext(ContactContext);
  return (
    <>
      <div>
        <ul className="contact-list">
          {contacts.map((contact, index) => (
            <li key={index}>
              <ContactListItem contact={contact} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ContactList;