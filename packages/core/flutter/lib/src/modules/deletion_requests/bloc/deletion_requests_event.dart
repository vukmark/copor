import 'package:equatable/equatable.dart';

sealed class DeletionRequestsEvent extends Equatable {
  const DeletionRequestsEvent();

  @override
  List<Object?> get props => [];
}

class RequestAccountDeletion extends DeletionRequestsEvent {
  const RequestAccountDeletion();
}

class CancelAccountDeletion extends DeletionRequestsEvent {
  const CancelAccountDeletion();
}
