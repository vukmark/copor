import 'package:equatable/equatable.dart';

sealed class ContractEvent extends Equatable {
  const ContractEvent();

  @override
  List<Object?> get props => [];
}

class GetContract extends ContractEvent {
  final String contractRoute;
  const GetContract(this.contractRoute);
}
