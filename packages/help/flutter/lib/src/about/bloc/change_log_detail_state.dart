import 'package:copor_help/src/about/data/model/change_log_models.dart';

sealed class ChangeLogDetailState {
  const ChangeLogDetailState();
}

class ChangeLogDetailInitial extends ChangeLogDetailState {
  const ChangeLogDetailInitial();
}

class ChangeLogDetailLoading extends ChangeLogDetailState {
  const ChangeLogDetailLoading();
}

class ChangeLogDetailLoaded extends ChangeLogDetailState {
  final ParsedChangeLog data;

  const ChangeLogDetailLoaded(this.data);
}

class ChangeLogDetailError extends ChangeLogDetailState {
  const ChangeLogDetailError();
}
