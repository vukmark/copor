import 'package:copor_core/src/modules/deletion_requests/bloc/deletion_requests_bloc.dart';
import 'package:copor_core/src/modules/deletion_requests/bloc/deletion_requests_event.dart';

class DeletionRequestsBlocEventDispatcher {
  static void requestAccountDeletion(DeletionRequestsBloc bloc) {
    bloc.add(const RequestAccountDeletion());
  }

  static void cancelAccountDeletion(DeletionRequestsBloc bloc) {
    bloc.add(const CancelAccountDeletion());
  }
}
