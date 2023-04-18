import { useDispatch, useSelector } from "react-redux";

import { filterContacts } from "redux/filterSlice";
import { addContact, deleteContact } from "redux/contactsSlice";

import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import css from "./App.module.css";

export default function App() {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.items);
    const filter = useSelector(state => state.filter);

    const deleteContactHandler = contactId => {
        dispatch(deleteContact(contactId));
    };

    // в даній функції знаки питання після значень перевіряють чи існує таке значення перед викликом toLowerCase()
    const newContactAudit = newContact => {
        return contacts.filter(
            contact =>
                contact.name?.toLowerCase() === newContact.name?.toLowerCase()
        );
    };

    const contactFormSubmitHandler = newContact => {
        if (newContactAudit(newContact).length > 0) {
            alert(`${newContact.name} is already in contacts.`);
            return false;
        } else {
            dispatch(addContact(newContact));
            return true;
        }
    };

    const contactFilter = event => {
        dispatch(filterContacts(event.target.value));
    };

    const filterValueLowerCase = filter?.toLowerCase();

    const visibleContacts = contacts.filter(contact => {
        return contact.name?.toLowerCase().includes(filterValueLowerCase);
    });

    return (
        <div className={css.app__container}>
            <h1>Phonebok</h1>
            <ContactForm onSubmit={contactFormSubmitHandler} />

            <h2>Contacts</h2>
            <Filter onChange={contactFilter} />
            <ContactList
                onDeleteContact={deleteContactHandler}
                contacts={visibleContacts}
            />
        </div>
    );
}
