import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import ContactList from "./components/ContactList.jsx";
import ContactForm from "./components/ContactForm.jsx";
import {createContext, useEffect, useState} from "react";
import ContactPage from "./components/ContactPage.jsx";
import confetti from 'canvas-confetti';

export const ContactContext = createContext({});

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const response = await fetch("https://boolean-uk-api-server.fly.dev/eyvmal/contact");
    const jsonData = await response.json();
    setContacts(jsonData);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async (contact) => {
    const response = await fetch("https://boolean-uk-api-server.fly.dev/eyvmal/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
    console.log(response);
    if (response.ok) {
      const addedContact = await response.json();
      setContacts([...contacts, addedContact]);
    }
    
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 45,
      origin: {y: 0.6}
    });
  }
  
  const removeContact = async (contact) => {
    const response = await fetch(`https://boolean-uk-api-server.fly.dev/eyvmal/contact/${contact.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      const updatedContacts = contacts.filter((c) => c.id !== contact.id);
      setContacts(updatedContacts);
    }
    
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 45,
      origin: { y: 0.6 }
    });
  }
  
  return (
    <ContactContext.Provider value={{ contacts, addContact, removeContact }}>
      <header className="app-header">
        <h1>Menu</h1>
        <nav className="navbar">
          <ul>
            <li><Link to="/">Contact List</Link></li>
            <li><Link to="/new">Add New Contact</Link></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<ContactList/>}/>
        <Route path="/new" element={<ContactForm />} />
        <Route path="/edit/:id" element={<ContactForm />} />
        <Route path="/view/:id" element={<ContactPage />} />
      </Routes>
    </ContactContext.Provider>
  );
}

export default App;
