document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById('contact-form');
    const contactNameInput = document.getElementById('contact-name');
    const contactPhoneInput = document.getElementById('contact-phone');
    const contactList = document.getElementById('contact-list');

    let contacts = [];

    //  Load contacts from localStorage


    const loadContacts = () => {

        const storedContacts = localStorage.getItem('contacts');
        if (storedContacts) {
            contacts = JSON.parse(storedContacts);
            renderContacts();
        }
    };


    // Save contacts to localStorage

    const saveContacts = () => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    };

    // Render contacts to the UI

    const renderContacts = () => {

        contactList.innerHTML = '';
        contacts.forEach((contact, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
    ${contact.name} (${contact.phone})
    <button onclick = "deleteContact(${index})"
    `;
            contactList.appendChild(li);
        });
    };

    // Add new contact

    contactForm.addEventListener('submit', (e) => {

        e.preventDefault();
        const name = contactNameInput.value.trim();
        const phone = contactPhoneInput.value.trim();


        if (name && phone) {
            contacts.push({ name, phone });
            saveContacts();
            renderContacts();
            contactForm.reset();
        }
    });


    // Delete contact

    window.deleteContact = (index) => {

        contacts.splice(index, 1);
        saveContacts();
        renderContacts();

    };


    // Load contacts on page load 

    loadContacts();

});