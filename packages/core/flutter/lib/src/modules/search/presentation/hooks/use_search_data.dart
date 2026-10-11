import 'package:copor_core/src/modules/administration/user/bloc/user_list/user_list_bloc.dart';
import 'package:copor_core/src/modules/administration/user/data/model/user_model.dart' as admin;
import 'package:copor_core/src/modules/search/bloc/search_bloc.dart';
import 'package:copor_core/src/modules/search/data/model/user_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

String _extractRoleFromTranslationKey(String roleStr) {
  if (roleStr.isEmpty) return '';
  if (roleStr.contains('.')) {
    return roleStr.split('.').last;
  }
  return roleStr.toLowerCase();
}

class SearchData {
  final List<User> usersToShow;
  final List<User> allUsers;

  SearchData({
    required this.usersToShow,
    required this.allUsers,
  });
}

SearchData useSearchData(BuildContext context) {
  final searchState = context.watch<SearchUiBloc>().state;
  final userListState = context.watch<UserListBloc>().state;

  final apiUsers = useMemoized(() => userListState.result?.data ?? <admin.UserModel>[], [
    userListState,
  ]);
  final allUsers = useMemoized(
    () => apiUsers.map((model) {
      final cleanedRole = _extractRoleFromTranslationKey(model.role ?? '');
      return User(
        id: model.id ?? '',
        firstName: model.firstName ?? '',
        lastName: model.lastName ?? '',
        role: cleanedRole,
        picture: model.picturePath ?? '',
      );
    }).toList(),
    [apiUsers],
  );
  final usersToShow = useMemoized(() => allUsers.take(searchState.usersToShowCount).toList(), [
    allUsers,
    searchState.usersToShowCount,
  ]);
  return SearchData(
    usersToShow: usersToShow,
    allUsers: allUsers,
  );
}
