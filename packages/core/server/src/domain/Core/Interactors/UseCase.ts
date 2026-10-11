export interface UseCase<Response> {
	execute(): Promise<Response>
}