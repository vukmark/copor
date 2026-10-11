export const contacts = `
🔹 FEATURE: Contacts

Description:
Directory of people in your organization. Users can browse and search contacts, view full contact details, and generate/share contact data via QR code or vCard.

Available actions:

    Browsing:
        -Search contacts
        -Scroll through contacts
        -Open a contact to view details

    Contact details:
        -View full contact information (name, role, picture, address, email, phone, etc.)
        -Generate QR code with contact (vCard data)
        -Export/share contact as vCard file

    Additional notes:
        -Used for finding contact info (phone, email, address)
        -Not used for messaging → use VuMeet instead
        -Contact detail page is limited info — full user profile is in /profile/:id

Synonyms:
    contact = person, user, colleague
    search = find, lookup
    contact details = info, information

Paths:
    ---0---/contacts---0--- Main contacts view

--------------------------------------------------
`;
