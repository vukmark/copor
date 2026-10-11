import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:equatable/equatable.dart';
import 'package:copor_core/src/error/failure.dart';

class MediaPickerState extends Equatable {
  final List<MediaFileModel> uploads;
  final bool isLoading;
  final Failure? failure;

  const MediaPickerState({this.uploads = const [], this.isLoading = false, this.failure});

  MediaPickerState copyWith({List<MediaFileModel>? uploads, bool? isLoading, Failure? failure}) {
    return MediaPickerState(
      uploads: uploads ?? this.uploads,
      isLoading: isLoading ?? this.isLoading,
      failure: failure,
    );
  }

  @override
  List<Object?> get props => [uploads, isLoading, failure];
}
