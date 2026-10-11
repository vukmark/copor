import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/modules/my_account/bloc/user_account_info/user_account_info_bloc.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_bloc.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_event.dart';
import 'package:copor_core/src/modules/my_account/data/model/update_account_info_dto.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';

import '../user_account_info/user_account_info_event.dart';

class MyAccountBlocEventDispatcher {
  static final _Translation translation = _Translation();
  static final _AccountInfo accountInfo = _AccountInfo();
  static final _UserAccountInfo userAccountInfo = _UserAccountInfo();
}

class _Translation {
  void getMyAccountTranslation(
    TranslationBloc<MyAccountPageTranslation> bloc,
    LanguageModel language,
  ) {
    bloc.add(
      GetTranslationEvent<MyAccountPageTranslation>(
        namespace: MyAccountPageTranslation.namespaceStatic,
        languageModel: language,
        constructor: (translationStringList) =>
            MyAccountPageTranslation(translationStringList: translationStringList),
      ),
    );
  }

  void getMyAccountTranslationIfNotLoaded(
    TranslationBloc<MyAccountPageTranslation> bloc,
    LanguageModel language,
  ) {
    bloc.addIfNotLoaded(
      GetTranslationEvent<MyAccountPageTranslation>(
        namespace: MyAccountPageTranslation.namespaceStatic,
        languageModel: language,
        constructor: (translationStringList) =>
            MyAccountPageTranslation(translationStringList: translationStringList),
      ),
    );
  }
}

class _AccountInfo {
  void getAccountInfo(AccountInfoBloc bloc) {
    bloc.add(GetAccountInfo());
  }

  void updateAccountInfo(AccountInfoBloc bloc, UpdateAccountInfoDTO updateData) {
    bloc.add(UpdateAccountInfo(updateData));
  }
}

class _UserAccountInfo {
  void getUserAccountInfo(UserAccountInfoBloc bloc, String id) {
    bloc.add(GetUserAccountInfo(id));
  }
}
