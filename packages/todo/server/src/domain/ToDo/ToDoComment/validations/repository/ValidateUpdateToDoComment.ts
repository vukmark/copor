import {IsInvalidToDoRepo} from '../../../ToDoItem/repository/IsInvalidToDoRepo';
import {IsInvalidToDoCommentRepo} from '../../repository/IsInvalidToDoCommentRepo';

export interface ValidateUpdateToDoCommentRepo extends IsInvalidToDoRepo, IsInvalidToDoCommentRepo {}
