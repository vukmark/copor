import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_calendar_entry/src/data/model/calendar_entry_model.dart';

final class CalendarEntryListState extends BaseState<List<CalendarEntryModel>> with DeletableState {
  @override
  final bool isDeleted;
  final String? userId;

  const CalendarEntryListState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.isDeleted = false,
    this.userId,
  });

  const CalendarEntryListState.initial() : this._(result: null);

  const CalendarEntryListState.loading({
    required Result<List<CalendarEntryModel>>? result,
    String? userId,
  }) : this._(result: result, isLoading: true, userId: userId);

  @override
  CalendarEntryListState copyWith({
    Result<List<CalendarEntryModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    bool? isDeleted,
    String? userId,
  }) {
    return CalendarEntryListState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure,
      isDeleted: isDeleted ?? this.isDeleted,
      userId: userId ?? this.userId,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, isDeleted, userId];
}
