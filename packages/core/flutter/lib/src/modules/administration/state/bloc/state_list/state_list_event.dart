import 'package:equatable/equatable.dart';

sealed class StateListEvent extends Equatable {
  const StateListEvent();

  @override
  List<Object?> get props => [];
}

class GetStateList extends StateListEvent {
  const GetStateList();
}

class DeleteState extends StateListEvent {
  final String stateId;
  const DeleteState(this.stateId);
}

class GetPublicStateByCountry extends StateListEvent {
  final String countryId;
  const GetPublicStateByCountry(this.countryId);
}

class GetStateListByCountry extends StateListEvent {
  final String countryId;
  const GetStateListByCountry(this.countryId);
}
