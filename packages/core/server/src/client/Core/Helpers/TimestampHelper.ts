import {TimestampedEntity} from '../TimstampedEntity';
import {DefaultTimeTransformer} from '@copor/core/domain/Core/Date/DefaultTimeTransformer';

export class TimestampHelper {
	public static getTimestampForCreate(actorId: string): TimestampedEntity {
		const now = new Date();
		const transformer = new DefaultTimeTransformer();

		return {
			createdAt: transformer.toUtc(now),
			createdBy: actorId,
			modifiedAt: transformer.toUtc(now),
			modifiedBy: actorId
		};
	}
	public static getTimestampForUpdate(actorId: string) {
		const now = new Date();
		const transformer = new DefaultTimeTransformer();

		return {
			modifiedAt: transformer.toUtc(now),
			modifiedBy: actorId
		};
	}
}