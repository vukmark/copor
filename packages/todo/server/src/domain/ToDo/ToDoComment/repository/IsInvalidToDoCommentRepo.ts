export interface IsInvalidToDoCommentRepo {
	isInvalidToDoComment(ToDoCommentId: string | undefined): Promise<boolean>;
}