import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_form/private_tag_form_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_form/private_tag_form_event.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_list/private_tag_list_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_list/private_tag_list_event.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/tag_form/tag_form_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/tag_form/tag_form_event.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/create_tag_dto.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/tag_list/tag_list_bloc.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/tag_list/tag_list_event.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/translation/tag_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';

class TagBlocEventDispatcher {
  static _Translation translation = _Translation();
  static _Tag tag = _Tag();
}

class _Translation {
  void getTagTranslation(TranslationBloc<TagPageTranslation> bloc, LanguageModel language) {
    bloc.add(
      GetTranslationEvent<TagPageTranslation>(
        namespace: TagPageTranslation.namespaceStatic,
        languageModel: language,
        constructor: (translationStringList) =>
            TagPageTranslation(translationStringList: translationStringList),
      ),
    );
  }
}

class _Tag {
  void getPublicTagList(TagListBloc bloc, FilterListDTO filterList) {
    bloc.add(GetPublicTagList(filterList));
  }

  void getPrivateTagList(PrivateTagListBloc bloc) {
    bloc.add(GetPrivateTagList());
  }

  void deleteTag(TagListBloc bloc, String tagId) {
    bloc.add(DeleteTag(tagId));
  }

  void deletePrivateTag(PrivateTagListBloc bloc, String tagId) {
    bloc.add(DeletePrivateTag(tagId));
  }

  void updatePrivateTag(PrivateTagFormBloc bloc, CreateTagDTO tag) {
    bloc.add(UpdatePrivateTag(tag));
  }

  void createPrivateTag(PrivateTagFormBloc bloc, CreateTagDTO tag) {
    bloc.add(CreatePrivateTag(tag));
  }

  void getTag(TagFormBloc bloc, String tagId) {
    bloc.add(GetTag(tagId));
  }

  void updateTag(TagFormBloc bloc, CreateTagDTO tag) {
    bloc.add(UpdateTag(tag));
  }

  void createTag(TagFormBloc bloc, CreateTagDTO tag) {
    bloc.add(CreateTag(tag));
  }
}
