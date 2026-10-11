import 'package:equatable/equatable.dart';

sealed class AllTagsForUserEvent extends Equatable {
  const AllTagsForUserEvent();

  @override
  List<Object?> get props => [];
}

class GetAllTagsForUser extends AllTagsForUserEvent {
  const GetAllTagsForUser();
}
