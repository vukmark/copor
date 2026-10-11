
export interface UnexpectedErrorLoggerDTO {
	message: string;
	stack?: string;
	path?: string;
	method?: string;
	actorId?: string;
}


export interface UnexpectedErrorLoggerRepo {
	log(input: UnexpectedErrorLoggerDTO): Promise<void>;
}