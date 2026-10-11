export const vuMeet = `
🔹 FEATURE: VuMeet

Description:
Internal real-time messaging system. Users can send text and media messages in 1:1 chats and group conversations, manage chats, and start outgoing video calls.

Available actions:

    Conversation list:
        -Open a chat
        -Start a new 1:1 chat
        -Create a group chat
        -View last message preview, timestamp, unread count, and avatars
    
    Messaging:
        -Send text messages
        -Attach files or media (camera, gallery, file system)
        -View typing indicators
        -Load older messages
    
    Calls & info:
        -Start a video call (Only on mobile, web not supported)
    
    Group management:
        -Edit group name
        -Manage members
    
    Additional notes:    
        -"Chat", "messages", "messaging", and "VuMeet" all refer to the same feature
        -Supports both 1:1 and group conversations
        -Notifications for messages are managed in: My Account → Preferences → Notifications
        - Video calls are mobile only
        
Synonyms:
    chat = conversation, thread
    message = text, chat message
    vuMeet = chat, messaging
    group chat = group, conversation
    attach = upload, send file
    call = video call

Paths:
    ---0---/vu-meet---0--- Main vuMeet chat view

--------------------------------------------------
`;
