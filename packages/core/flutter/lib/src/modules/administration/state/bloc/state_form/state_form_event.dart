import 'package:copor_core/src/modules/administration/state/data/model/create_state_dto.dart';
import 'package:copor_core/src/modules/administration/state/data/model/state_model.dart';
import 'package:equatable/equatable.dart';

sealed class StateFormEvent extends Equatable {
  const StateFormEvent();

  @override
  List<Object?> get props => [];
}

class GetState extends StateFormEvent {
  final String stateId;
  const GetState(this.stateId);
}

class GetPublicState extends StateFormEvent {
  final String stateId;
  const GetPublicState(this.stateId);
}

class CreateState extends StateFormEvent {
  final CreateStateDTO stateToCreate;
  const CreateState(this.stateToCreate);
}

class UpdateState extends StateFormEvent {
  final StateModel stateToUpdate;
  const UpdateState(this.stateToUpdate);
}
