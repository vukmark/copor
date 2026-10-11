import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';

export class GetStateDTOHelper {
	public static toNameAndIdDTO(states: GetStateDTO[]): NameAndIdDTO[] {
		return states.map((state) => ({
			id: state.id,
			name: state.name
		}));
	}
}