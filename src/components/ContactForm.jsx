import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ContactContext} from "../App.jsx";
import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps';


function ContactForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { contacts, addContact } = useContext(ContactContext);
  const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    gender: '',
    email: '',
    jobTitle: '',
    latitude: null,
    longitude: null, 
    favouriteColour: '#FFFFFF',
    profileImage: ''
  });

  useEffect(() => {
    // Check if the 'id' exists
    if (id) {
      // Find the contact from the 'contacts' array where the 'id' matches
      const foundContact = contacts.find(contact => contact.id === Number(id));
      if (foundContact) {
        setContact(foundContact);
      } else {
        console.log('Contact not found');
      }
    }
  }, [id, contacts]);
  
  const handleSubmit = () => {
    addContact(contact);
    navigate("/");
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact(prevContact => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleMapClick = (e) => {
    setContact((prevContact) => ({
      ...prevContact,
      latitude: e.detail.latLng.lat,
      longitude: e.detail.latLng.lng,
    }));
  };
  
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        onChange={handleInputChange}
        value={contact.firstName}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        onChange={handleInputChange}
        value={contact.lastName}
      />

      <label htmlFor="street">Street</label>
      <input
        type="text"
        id="street"
        name="street"
        onChange={handleInputChange}
        value={contact.street}
      />

      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        name="city"
        onChange={handleInputChange}
        value={contact.city}
      />

      <label htmlFor="gender">Gender</label>
      <input
        type="text"
        id="gender"
        name="gender"
        onChange={handleInputChange}
        value={contact.gender}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={handleInputChange}
        value={contact.email}
      />

      <label htmlFor="jobTitle">Job Title</label>
      <input
        type="text"
        id="jobTitle"
        name="jobTitle"
        onChange={handleInputChange}
        value={contact.jobTitle}
      />

      <label htmlFor="favouriteColour">Favourite Colour</label>
      <input
        type="color"
        id="favouriteColour"
        name="favouriteColour"
        onChange={handleInputChange}
        value={contact.favouriteColour}
      />

      <label htmlFor="profileImage">Profile Image URL</label>
      <input
        type="url"
        id="profileImage"
        name="profileImage"
        onChange={handleInputChange}
        value={contact.profileImage}
      />

      <APIProvider apiKey={googleMapsKey} onLoad={() => console.log('Maps API has loaded.')}>
        <Map
          mapId={'boolean'}
          style={{width: '205%', height: '250px'}}
          defaultCenter={{lat: 59.911491, lng: 10.757933}}
          defaultZoom={4}
          gestureHandling={'cooperative'}
          disableDefaultUI={false}
          onClick={handleMapClick}
        >
          <AdvancedMarker location={{ lat: 59.911491, lng: 10.757933 }} />
          {contact.latitude && contact.longitude && (
            <AdvancedMarker
              position={{ lat: contact.latitude, lng: contact.longitude }}
            />
          )}
        </Map>
      </APIProvider>
      
      <button type="submit">Submit</button>
    </form>
  )
}

export default ContactForm;