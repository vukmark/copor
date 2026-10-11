export interface SaveAlarmDTO {
	id: string;
	alarmableId: string;
	alarmableType: AlarmableType;
	alarmTime: Date;
	repeatFrequency: AlarmRepeatFrequency;
	alarmStatus: AlarmStatus;
	actorId: string;
}

export enum AlarmableType {
	PRIVATE_TODO = 0,
	GROUP_TODO = 1
}

export enum AlarmRepeatFrequency {
	NONE = 0,
	DAILY = 1,
	WEAKLY = 2,
	MONTHLY = 3,
	YEARLY = 4
}

export enum AlarmStatus {
	ACTIVE = 0,
	DISMISSED = 1,
	SNOOZED = 2
}