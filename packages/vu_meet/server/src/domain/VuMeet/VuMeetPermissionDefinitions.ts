import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {VuMeetFeature} from '@copor/vu_meet/domain/VuMeet/VuMeetFeature';
import {VuMeetPermission} from '@copor/vu_meet/domain/VuMeet/VuMeetPermission';

export const vuMeetPermissionDefinitions: PermissionDefinitionDTO[] = [
	{
		key: VuMeetPermission.canGetChatInfo,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetChat]
	},
	{
		key: VuMeetPermission.canStartGroupCall,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetGroupChat]
	},
	{
		key: VuMeetPermission.canStartPrivateCall,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetChat]
	},
	{
		key: VuMeetPermission.canCreateChat,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetUserChatList]
	},
	{
		key: VuMeetPermission.canCreateGroupChat,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetUserChatList]
	},
	{
		key: VuMeetPermission.canCreateMessage,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetMessageList]
	},
	{
		key: VuMeetPermission.canCreateGroupMessage,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetGroupMessageList]
	},
	{
		key: VuMeetPermission.canGetGroupMessageList,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetGroupChat]
	},
	{
		key: VuMeetPermission.canGetMessageList,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetChat]
	},
	{
		key: VuMeetPermission.canUpdateGroupChat,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetGroupChat]
	},
	{
		key: VuMeetPermission.canGetUserChatList,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canViewVuMeetFeature]
	},
	{
		key: VuMeetPermission.canSendTypingStatus,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetUserChatList]
	},
	{
		key: VuMeetPermission.canGetGroupChat,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetUserChatList]
	},
	{
		key: VuMeetPermission.canGetChat,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetUserChatList]
	},
	{
		key: VuMeetPermission.canGetVuMeetContactList,
		feature: VuMeetFeature.VU_MEET,
		requiresScope: true,
		dependsOn: [VuMeetPermission.canViewVuMeetFeature]
	},
	{
		key: VuMeetPermission.canGetChatWithUser,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetVuMeetContactList]
	},
	{
		key: VuMeetPermission.canSearchAllMessages,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetUserChatList]
	},
	{
		key: VuMeetPermission.canSearchMessagesInChat,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetMessageList]
	},
	{
		key: VuMeetPermission.canSearchMessagesInGroupChat,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetGroupMessageList]
	},
	{
		key: VuMeetPermission.canMarkMessagesSeen,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetMessageList]
	},
	{
		key: VuMeetPermission.canMarkGroupChatMessagesSeen,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetGroupMessageList]
	},
	{
		key: VuMeetPermission.canGetVuMeetFile,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetMessageList]
	},
	{
		key: VuMeetPermission.canUpdateChat,
		feature: VuMeetFeature.VU_MEET,
		dependsOn: [VuMeetPermission.canGetChat]
	},
	{
		key: VuMeetPermission.canViewVuMeetFeature,
		feature: VuMeetFeature.VU_MEET
	}
];
