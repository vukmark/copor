import 'package:copor_core/src/data/model/key_value_pair/key_value_model.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:equatable/equatable.dart';

sealed class CoporFormEvent extends Equatable {
  const CoporFormEvent();

  @override
  List<Object?> get props => [];
}

class GetCoporForm extends CoporFormEvent {
  final String endpoint;

  const GetCoporForm(this.endpoint);
}

class GetPublicCoporForm extends CoporFormEvent {
  final String endpoint;

  const GetPublicCoporForm(this.endpoint);
}

class SubmitFromCoporForm extends CoporFormEvent {
  final String endpoint;
  final Map<String, dynamic> formData;

  const SubmitFromCoporForm(this.endpoint, this.formData);
}

class CreateFromCoporForm extends CoporFormEvent {
  final String endpoint;
  final Map<String, dynamic> formData;

  const CreateFromCoporForm(this.endpoint, this.formData);
}

class UpdateFromCoporForm extends CoporFormEvent {
  final String endpoint;
  final Map<String, dynamic> formData;

  const UpdateFromCoporForm(this.endpoint, this.formData);
}

class UploadPicture extends CoporFormEvent {
  final String endpoint;
  final MediaFileModel image;

  /// Served under a filename derived from the user id, so replacing a picture
  /// reuses this exact url - it has to be evicted from the image cache once the
  /// upload lands, or every view keeps painting the previous bytes.
  final String currentImageUrl;

  const UploadPicture(this.endpoint, this.image, this.currentImageUrl);

  @override
  List<Object?> get props => [endpoint, image, currentImageUrl];
}

class DeletePicture extends CoporFormEvent {
  final String endpoint;
  final String currentImageUrl;

  const DeletePicture(this.endpoint, this.currentImageUrl);

  @override
  List<Object?> get props => [endpoint, currentImageUrl];
}

class ClearCoporForm extends CoporFormEvent {
  const ClearCoporForm();
}

class UpdateSystemSettings extends CoporFormEvent {
  final List<KeyValueModel<dynamic>> formData;

  const UpdateSystemSettings(this.formData);
}

class FilterCommonPasswordsField extends CoporFormEvent {
  final bool blockCommonPasswords;
  final Map<String, dynamic> currentValues;

  const FilterCommonPasswordsField(this.blockCommonPasswords, this.currentValues);
}
