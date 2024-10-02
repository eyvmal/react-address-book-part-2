import {useNavigate} from "react-router-dom";
import confetti from "canvas-confetti";

function ContactListItem({ contact }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/view/${contact.id}`);

    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 45,
      origin: { y: 0.6 }
    });
  }
  return (
    <div className="contact-list-item">
      <img
        src={contact.profileImage}
        alt={"pic.jpg"}
        width="50"
        height="50"
        style={{border: `3px solid ${contact.favouriteColour}`}}
      />
      <h4>{contact.firstName} {contact.lastName}</h4>
      <p>{contact.jobTitle}</p>
      <button onClick={handleClick}>View</button>
    </div>
  );
}

export default ContactListItem;