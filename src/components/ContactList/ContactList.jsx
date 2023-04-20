import { useDispatch, useSelector } from "react-redux";

import { deleteContact } from "../../redux/contactsSlice";
import ContactListItem from "../ContactListItem/ContactListItem";
import css from "./ContactList.module.css";

export default function ContactList() {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.items);
    const filter = useSelector(state => state.contacts.filter);

    const deleteContactHandler = contactId => {
        dispatch(deleteContact(contactId));
    };

    const filterValueLowerCase = filter?.toLowerCase();

    const visibleContacts = contacts.filter(contact => {
        return contact.name?.toLowerCase().includes(filterValueLowerCase);
    });

    return (
        <ul className={css.contactList__list}>
            {visibleContacts.map(({ id, name, number }) => (
                <ContactListItem
                    key={id}
                    id={id}
                    name={name}
                    number={number}
                    onDeleteContact={deleteContactHandler}
                />
            ))}
        </ul>
    );
}
