import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Header, StatsCards, SearchBar, ContactsList } from './components/ContactsList';
import { ContactForm } from './components/ContactForm';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddContact = () => {
    setEditingContact(null);
    setShowModal(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowModal(true);
  };

  const handleDeleteContact = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      setContacts(contacts.filter(contact => contact.id !== id));
    }
  };

  const handleSaveContact = (formData) => {
    if (editingContact) {
      setContacts(contacts.map(contact =>
        contact.id === editingContact.id ? { ...contact, ...formData } : contact
      ));
    } else {
      const newContact = {
        id: Math.max(0, ...contacts.map(c => c.id)) + 1,
        ...formData
      };
      setContacts([...contacts, newContact]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Header onAddContact={handleAddContact} contactsCount={contacts.length} />
        <StatsCards 
          totalContacts={contacts.length} 
          filteredContacts={filteredContacts.length} 
          searchTerm={searchTerm} 
        />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <ContactsList 
          contacts={filteredContacts} 
          onEditContact={handleEditContact} 
          onDeleteContact={handleDeleteContact}
        />
        <ContactForm 
          isOpen={showModal} 
          onClose={() => {
            setShowModal(false);
            setEditingContact(null);
          }} 
          contact={editingContact} 
          onSave={handleSaveContact}
        />
      </div>
    </div>
  );
};

export default App;