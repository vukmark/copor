interface MultipartRequest {
	body?: Record<string, unknown>;
}

export class CloudFileUploadFields {
	static description(request: MultipartRequest): string | undefined {
		const value = request.body?.description;

		return typeof value === 'string' && value.length > 0 ? value : undefined;
	}

	static notifyReceivers(request: MultipartRequest): boolean {
		const value = request.body?.notifyReceivers;

		return value !== false && value !== 'false' && value !== '0';
	}
}
