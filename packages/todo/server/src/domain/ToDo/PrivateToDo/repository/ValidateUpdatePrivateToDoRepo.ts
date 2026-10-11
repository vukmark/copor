import {IsInvalidToDoRepo} from '../../ToDoItem/repository/IsInvalidToDoRepo';
import {IsInvalidTagRepo} from '@copor/core/domain/Components/Tag/repository/IsInvalidTagRepo';

export interface ValidateUpdatePrivateToDoRepo extends
	IsInvalidTagRepo,
	IsInvalidToDoRepo {
}
