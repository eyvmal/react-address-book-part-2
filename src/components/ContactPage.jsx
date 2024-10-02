import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ContactContext} from "../App.jsx";
import confetti from "canvas-confetti";
import {AdvancedMarker, APIProvider, Map} from "@vis.gl/react-google-maps";

function ContactPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { contacts, removeContact } = useContext(ContactContext);
  const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const foundContact = contacts.find((contact) => contact.id === Number(id));
    setContact(foundContact);
  }, [id, contacts])
  
  const handleDelete = () => {
    removeContact(contact);
    navigate("/");

    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 45,
      origin: { y: 0.6 }
    });
  }

  const handleEdit = () => {
    navigate(`/edit/${contact.id}`);

    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 45,
      origin: { y: 0.6 }
    });
  }
  
  if (!contact) return <p>Loading...</p>
  
  return (
    <div className="contact-page">
      <img
        id="profile-picture"
        src={contact.profileImage}
        alt={`${contact.firstName} ${contact.lastName}`}
        width="100"
        height="100"
        style={{border: `3px solid ${contact.favouriteColour}`}}
      />
      <p>Job Title: {contact.jobTitle}</p>
      <h4>{contact.firstName} {contact.lastName}</h4>
      <p>Gender: {contact.gender}</p>
      <p>Email: {contact.email}</p>
      <p>Address: {contact.street}, {contact.city}</p>
      <APIProvider apiKey={googleMapsKey} onLoad={() => console.log('Maps API has loaded.')}>
        <Map
          mapId={'boolean'}
          style={{width: '500px', height: '300px'}}
          defaultCenter={{lat: contact.latitude, lng: contact.longitude}}
          defaultZoom={7}
          gestureHandling={'none'}
          disableDefaultUI={false}
        >
          <AdvancedMarker position={{lat: contact.latitude, lng: contact.longitude}}/>
        </Map>
      </APIProvider>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default ContactPage;