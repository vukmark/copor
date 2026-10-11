# VuMeet Module — Use Cases

## Overview

VuMeet is the in-app messaging system. It supports chats and group chats, real-time typing indicators, file/media sharing, video calling via Jitsi, message search, a contact picker, and an AI assistant bot powered by DeepSeek. Real-time updates are delivered via WebSocket.

All roles listed below reflect the current state of the `role_permission` table. Roles are: **USER, ADMIN**.

---

## Use Cases

### UC-1: View Chat List

- **Description:** User sees a list of all their chats (private and group), ordered by most recent message. Each item shows the chat name, last message preview, unread count, and timestamp. List is searchable by name. Updates in real time via WebSocket (`CHAT_LIST_UPDATED`, `NEW_MESSAGE_NOTIFICATION` events).
- **Endpoint:** `GET /vu-meet/user-chats/:prompt` or `GET /vu-meet/user-chats/`
- **Permission:** `vu_meet.canGetUserChatList`
- **Allowed roles:** ALL roles (USER, ADMIN)
- **Frontend location:** `presentation/components/chat_list/chat_list.dart`, `logic/chat/chat_list/chat_list_bloc.dart`, `data/data_source/chat_list/chat_list_remote_source.dart`

---

### UC-2: Get Contacts for New Chat

- **Description:** User opens the "New Chat" screen and sees a searchable list of people they can message (contacts derived from their user groups and role). Used to select recipients when starting a private or group chat.
- **Endpoint:** `GET /vu-meet/contacts/:prompt` or `POST /vu-meet/contacts`
- **Permission:** `vu_meet.canGetVuMeetContactList`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/pages/create_chat/create_chat_screen.dart`, `presentation/components/vu_meet_contact_picker.dart` (core `UserPickerList`)

---

### UC-3: Create Private Chat

- **Description:** User selects one contact from the list and initiates a chat. If a chat with that user already exists, the existing chat is returned. The frontend calls "get or create" via `POST /vu-meet/chat/user`.
- **Endpoint:** `POST /vu-meet/chat/`
- **Permission:** `vu_meet.canCreateChat`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/pages/create_chat/create_chat_screen.dart`, `logic/chat/chat_list/chat_list_bloc.dart` (`CreateChat` event), `data/data_source/chat_list/chat_list_remote_source.dart` (`getNewChatId`)

---

### UC-4: Get or Find Private Chat by User

- **Description:** User navigates to an existing private chat with another specific user. The frontend posts both user IDs to resolve the chat ID before opening the conversation.
- **Endpoint:** `POST /vu-meet/chat/user`
- **Permission:** `vu_meet.canGetChatWithUser`
- **Allowed roles:** ALL roles
- **Frontend location:** `data/data_source/chat_list/chat_list_remote_source.dart` (`getNewChatId`)

---

### UC-5: Open / View Private Chat

- **Description:** User opens a private chat and sees the full message feed. Messages are loaded in pages. Shows sender avatar, name, message content, timestamp, and seen status.
- **Endpoint:** `GET /vu-meet/chat/:id`
- **Permission:** `vu_meet.canGetChat`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/chat/conversation_view.dart`, `presentation/components/chat/message_feed.dart`, `presentation/components/message/`

---

### UC-6: Create Group Chat

- **Description:** User selects multiple contacts, enters a group name, and creates a group chat. The creator becomes the admin. Members are validated on creation.
- **Endpoint:** `POST /vu-meet/group-chat/`
- **Permission:** `vu_meet.canCreateGroupChat`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/pages/create_chat/create_chat_screen.dart` (group mode toggle), `logic/chat/chat_list/chat_list_bloc.dart` (`CreateChat` event)

---

### UC-7: Open / View Group Chat

- **Description:** User opens a group chat and sees the message feed. Only members of the group can view it (membership is validated server-side in addition to the permission check).
- **Endpoint:** `GET /vu-meet/group-chat/:id`
- **Permission:** `vu_meet.canGetGroupChat`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/chat/conversation_view.dart`, `presentation/components/chat/message_feed.dart`

---

### UC-8: Update Group Chat (Edit Members / Name)

- **Description:** Group admin opens the edit modal to rename the group or add/remove members. After saving, new members receive a `CHAT_LIST_UPDATED` WebSocket notification and removed members receive a `REMOVED_FROM_GROUP_CHAT` notification.
- **Endpoint:** `PATCH /vu-meet/group-chat/`
- **Permission:** `vu_meet.canUpdateGroupChat`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/modals/edit_group_modal.dart`, `presentation/components/chat/chat_info.dart`, `logic/chat/add_members/edit_group_cubit.dart`

---

### UC-9: Get Chat Info (Members List)

- **Description:** User views the info panel of a private or group chat — shows all member names, avatars, and roles within the chat. Used as the sidebar/panel when a chat is open.
- **Endpoint:** `GET /vu-meet/chat/info/:id`
- **Permission:** `vu_meet.canGetChatInfo`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/chat/chat_info.dart`, `logic/chat/chat_info/chat_info_bloc.dart`, `data/data_source/chat_info/chat_info_remote_source.dart`

---

### UC-10: Update Private Chat (Edit Members)

- **Description:** User edits a private chat's member list (e.g. converting to a group or adjusting participants). Restricted — only ADMIN in the current permission configuration.
- **Endpoint:** `PATCH /vu-meet/chat/`
- **Permission:** `vu_meet.canUpdateChat`
- **Allowed roles:** ADMIN only (all other roles DENY)
- **Frontend location:** `data/data_source/chat_list/chat_list_remote_source.dart` (`editChat`), `logic/chat/chat_list/chat_list_bloc.dart` (`EditChat` event)

---

### UC-11: Send Private Message (Text)

- **Description:** User types a message and sends it in a private chat. The message is stored and pushed to the other participant via WebSocket/push notification.
- **Endpoint:** `POST /vu-meet/private-message/`
- **Permission:** `vu_meet.canCreateMessage`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/chat/message_input.dart`, `logic/message/vu_meet_message/vu_meet_message_bloc.dart`, `data/data_source/vu_meet_message/vu_meet_message_remote_source.dart` (`sendMessage`)

---

### UC-12: Send Private Message (File / Image)

- **Description:** User attaches a file or image and sends it in a private chat. The file is uploaded via multipart form. File size is validated server-side.
- **Endpoint:** `POST /vu-meet/private-message/` (multipart)
- **Permission:** `vu_meet.canCreateMessage`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/chat/message_input.dart`, `logic/message/vu_meet_media_message/vu_meet_media_message_bloc.dart`, `data/data_source/vu_meet_message/vu_meet_message_remote_source.dart` (`sendFileMessage`)

---

### UC-13: Get Private Message List

- **Description:** User scrolls through paginated message history in a private chat. Only participants in the chat can load messages.
- **Endpoint:** `POST /vu-meet/private-message/list`
- **Permission:** `vu_meet.canGetMessageList`
- **Allowed roles:** ALL roles
- **Frontend location:** `data/data_source/vu_meet_message/vu_meet_message_remote_source.dart` (`getVuMeetMessage`), `data/data_source/private_message_list/`

---

### UC-14: Download / View Message File

- **Description:** User taps a file or image in the message feed to download and view it. The file is fetched as raw bytes. Currently restricted to ADMIN only.
- **Endpoint:** `GET /vu-meet/private-message/file/:id`
- **Permission:** `vu_meet.canGetVuMeetFile`
- **Allowed roles:** ADMIN only (all other roles DENY)
- **Frontend location:** `presentation/components/message/message_media.dart`, `presentation/components/message/image_message_bubble.dart`, `data/data_source/vu_meet_message/vu_meet_message_remote_source.dart` (`getVuMeetMessageFile`)

---

### UC-15: Send Group Message

- **Description:** User types and sends a message in a group chat. Message is stored and broadcast to all group members.
- **Endpoint:** `POST /vu-meet/group-message/`
- **Permission:** `vu_meet.canCreateGroupMessage`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/chat/message_input.dart`, `logic/message/vu_meet_message/vu_meet_message_bloc.dart`

---

### UC-16: Get Group Message List

- **Description:** User scrolls through paginated message history in a group chat.
- **Endpoint:** *(consumed via group chat view — uses `canGetGroupMessageList`)*
- **Permission:** `vu_meet.canGetGroupMessageList`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/chat/message_feed.dart`

---

### UC-17: Send Typing Status (Private Chat)

- **Description:** While typing, the app sends a typing indicator to the other participant. The recipient sees a typing animation bubble in real time.
- **Endpoint:** `POST /vu-meet/chat/typing-status`
- **Permission:** `vu_meet.canSendTypingStatus`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/chat/typing_indicator.dart`, `data/data_source/vu_meet_message/vu_meet_message_remote_source.dart` (`changeTypingStatus`), `helpers/typing_data.dart`

---

### UC-18: Send Typing Status (Group Chat)

- **Description:** While typing in a group chat, the app sends a typing indicator to all other group members.
- **Endpoint:** `POST /vu-meet/group-chat/typing-status`
- **Permission:** `vu_meet.canSendTypingStatus`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/chat/typing_indicator.dart`

---

### UC-19: Mark Private Chat Messages as Seen

- **Description:** When a user opens a private chat, all unread messages are marked as seen. The unread count in the chat list resets to zero.
- **Endpoint:** `GET /vu-meet/chat/mark-seen/:chatId`
- **Permission:** `vu_meet.canMarkMessagesSeen`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/chat/conversation_view.dart`, `presentation/components/message/message_seen_status.dart`

---

### UC-20: Mark Group Chat Messages as Seen

- **Description:** When a user opens a group chat, all unread messages are marked as seen.
- **Endpoint:** `GET /vu-meet/group-chat/mark-seen/:id`
- **Permission:** `vu_meet.canMarkGroupChatMessagesSeen`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/chat/conversation_view.dart`

---

### UC-21: Search All Messages

- **Description:** User uses the global search bar to find messages across all their chats. Results show the matching message with context (chat name, sender, content snippet).
- **Endpoint:** `GET /vu-meet/search/:prompt` or `GET /vu-meet/search`
- **Permission:** `vu_meet.canSearchAllMessages`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/chat/vu_meet_chats_and_users.dart`

---

### UC-22: Search Messages in Private Chat

- **Description:** User searches for messages within a specific private chat conversation.
- **Endpoint:** `POST /vu-meet/private-message/search`
- **Permission:** `vu_meet.canSearchMessagesInChat`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/chat/conversation_view.dart`

---

### UC-23: Search Messages in Group Chat

- **Description:** User searches for messages within a specific group chat conversation.
- **Endpoint:** `POST /vu-meet/group-message/search`
- **Permission:** `vu_meet.canSearchMessagesInGroupChat`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/chat/conversation_view.dart`

---

### UC-24: Start / Answer Video Call (Private)

- **Description:** User initiates or answers a video call in a private chat. The caller sends a call action that triggers a push notification to the other participant. The call is conducted via Jitsi Meet. The server records a call event message in the chat.
- **Endpoint:** `POST /vu-meet/chat/call`
- **Permission:** `vu_meet.canStartPrivateCall`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/call/outgoing_call_screen.dart`, `presentation/components/call/talkie_jitsi.dart`, `presentation/components/call/call_action_buttons.dart`, `logic/call/call/call_bloc.dart`, `data/data_source/call/call_remote_source.dart` (`makeVideoCallAction`), `data/data_source/vu_meet_message/vu_meet_message_remote_source.dart` (`makeVideoCall`)

---

### UC-25: Decline / Cancel Call (Private)

- **Description:** User declines an incoming call. A decline notification is sent to the caller. If all participants have declined, a terminate notification is sent. A call-event message is saved in the chat.
- **Endpoint:** `POST /vu-meet/chat/decline-call`
- **Permission:** No permission check — any authenticated user can decline a call (the controller does not use a validator).
- **Allowed roles:** ALL roles (no restriction)
- **Frontend location:** `logic/call/call/call_bloc.dart` (`CallDeclined` event), `data/data_source/call/call_remote_source.dart` (`declineCall`), `logic/call/declined_calls_qubit.dart`

---

### UC-26: Start Group Video Call

- **Description:** User initiates a video call in a group chat. The user must be a member of the group. A Jitsi room is created for the group session.
- **Endpoint:** `POST /vu-meet/group-chat/call`
- **Permission:** `vu_meet.canStartGroupCall`
- **Allowed roles:** ALL roles
- **Frontend location:** `presentation/components/call/talkie_jitsi.dart`, `presentation/components/call/call_action_buttons.dart`, `logic/call/call/call_bloc.dart`

---

### UC-27: Ask AI Bot

- **Description:** User opens the AI assistant chat and sends messages. The bot (powered by DeepSeek) answers questions about the app's features using a knowledge base tailored to the user's role. Topics include cloud files, contacts, search, todo, and more. No permission check is applied — any authenticated user can use the bot.
- **Endpoint:** `POST /vu-meet/bot/`
- **Permission:** No permission check — open to all authenticated users.
- **Allowed roles:** ALL roles (no restriction)
- **Frontend location:** *(bot UI not found in the VuMeet frontend module — likely in a separate module or accessed via the chat interface)*
- **Backend:** `client/src/VuMeet/AiBot/CreateAiBotMessage/CreateAiBotMessageController.ts`, `Documentation/KnowledgeBase/`

---

## Permission Summary Table

| # | Use Case | Permission | Allowed Roles |
|---|----------|-----------|---------------|
| 1 | View chat list | vu_meet.canGetUserChatList | All |
| 2 | Get contacts | vu_meet.canGetVuMeetContactList | All |
| 3 | Create chat | vu_meet.canCreateChat | All |
| 4 | Find chat by user | vu_meet.canGetChatWithUser | All |
| 5 | Open chat | vu_meet.canGetChat | All |
| 6 | Create group chat | vu_meet.canCreateGroupChat | All |
| 7 | Open group chat | vu_meet.canGetGroupChat | All |
| 8 | Update group chat | vu_meet.canUpdateGroupChat | All |
| 9 | Get chat info / members | vu_meet.canGetChatInfo | All |
| 10 | Update private chat | vu_meet.canUpdateChat | ADMIN only |
| 11 | Send private message (text) | canCreatePrivateMessage | All |
| 12 | Send private message (file) | canCreatePrivateMessage | All |
| 13 | Get private message list | canGetPrivateMessageList | All |
| 14 | Download message file | vu_meet.canGetVuMeetFile | ADMIN only |
| 15 | Send group message | vu_meet.canCreateGroupMessage | All |
| 16 | Get group message list | vu_meet.canGetGroupMessageList | All |
| 17 | Typing status (private) | vu_meet.canSendTypingStatus | All |
| 18 | Typing status (group) | vu_meet.canSendTypingStatus | All |
| 19 | Mark private messages seen | canMarkPrivateMessagesSeen | All |
| 20 | Mark group messages seen | vu_meet.canMarkGroupChatMessagesSeen | All |
| 21 | Search all messages | vu_meet.canSearchAllMessages | All |
| 22 | Search in chat | vu_meet.canSearchMessagesInChat | All |
| 23 | Search in group chat | vu_meet.canSearchMessagesInGroupChat | All |
| 24 | Start/answer private call | vu_meet.canStartPrivateCall | All |
| 25 | Decline call | *(no check)* | — | All |
| 26 | Start group call | vu_meet.canStartGroupCall | All |
| 27 | Ask AI bot | *(no check)* | — | All |
