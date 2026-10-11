export const cloud = `
🔹 FEATURE: Cloud

Description:
Cloud is a file storage system where users can upload, organize, and access files using folders ("cloud groups").

Cloud supports both personal storage and shared storage. Files and folders can belong to groups that include multiple users, allowing collaboration and shared access.

Available actions:

    Browsing:
        - Open folders
        - Navigate using breadcrumbs
        - Switch between grid and list view
        - View folder tree
    
    Files:
        - Upload files from device
        - Open and preview files (fullscreen viewer)
        - Download files (available inside preview)
        - Delete files
    
    Folders:
        - Create folders (cloud groups)
        - Edit folders
        - Delete folders
    
    Sharing & Collaboration:
        - Folders ("cloud groups") can include multiple users
        - All users inside a group can access its files
        - Files inside shared folders are visible to all group members
        - Users can collaborate by uploading and accessing files within the same group
    
    Additional notes:
        - Folders may also be called "groups" or "cloud groups"
        - "Cloud" may also be referred to as "Drive" or "My Cloud"
        - Downloading is done from inside the file preview
        - Access to files depends on the group they belong to (personal or shared)

Synonyms:
    - file = document, image, photo, picture, attachment
    - folder = group, cloud group
    - download = save, get, retrieve
    - upload = add file, send file
    - share = give access to folders, allow others, collaborate

Paths:
    ---0---/cloud---0--- Main cloud view
    ---0---/cloud/create---0--- Create a new folder ("cloud group")

--------------------------------------------------
`;
