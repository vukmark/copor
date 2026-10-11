export interface IsInvalidAlarmRepo {
	isInvalidAlarm(alarmId: string | undefined): Promise<boolean>;
}
