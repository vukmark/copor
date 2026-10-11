import 'dart:async';

import 'package:flutter/material.dart';
import 'package:copor_core/src/components/presence_avatar.dart';
import 'package:copor_core/src/components/user_picker/selected_users_row.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/data/model/user_picker/user_picker_item_model.dart';
import 'package:copor_core/src/data/repository_impl/user_picker/user_picker_repository.dart';
import 'package:copor_core/src/data/repository_impl/user_picker/user_picker_repository_impl.dart';
import 'package:copor_theme/copor_theme.dart';

typedef UserPickerTileBuilder =
    Widget Function(BuildContext context, UserPickerItemModel user, bool isSelected, VoidCallback onTap);

/// Search bar + paged list of the users a module's picker route ([path], e.g.
/// `/cloud/recipients`) returns for the actor; the next page loads when the
/// list is scrolled near its end. Fills its parent, so the parent must give it
/// a finite height (e.g. `DTFloatingLayout.expandedChild`, an `Expanded`).
///
/// The caller owns the selection: [isSelected] tells whether a user is picked,
/// [onTap] is called on tap. With [selectedUsers] the picked users are shown
/// above the search bar ([SelectedUsersRow], after [selectedUsersLeading]).
/// [tileBuilder] replaces the default checkbox tile ([UserPickerTile]).
class UserPickerList extends StatefulWidget {
  final String path;
  final bool Function(UserPickerItemModel user) isSelected;
  final ValueChanged<UserPickerItemModel> onTap;
  final String searchLabel;
  final String noUsersLabel;
  final List<UserPickerItemModel>? selectedUsers;
  final Widget? selectedUsersLeading;
  final UserPickerTileBuilder? tileBuilder;
  final double? itemExtent;

  const UserPickerList({
    super.key,
    required this.path,
    required this.isSelected,
    required this.onTap,
    required this.searchLabel,
    required this.noUsersLabel,
    this.selectedUsers,
    this.selectedUsersLeading,
    this.tileBuilder,
    this.itemExtent,
  });

  @override
  State<UserPickerList> createState() => _UserPickerListState();
}

class _UserPickerListState extends State<UserPickerList> {
  static const double _loadMoreThreshold = 200;

  final UserPickerRepository _repository = getIt<UserPickerRepository>();
  final TextEditingController _searchController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  List<UserPickerItemModel> _users = const [];
  bool _isLoading = false;
  bool _isLoadingMore = false;
  bool _hasMore = false;
  Timer? _searchDebounce;
  // Bumped by every new search, so a page that arrives for an older query is dropped.
  int _searchGeneration = 0;

  @override
  void initState() {
    super.initState();
    _search();
  }

  @override
  void dispose() {
    _searchDebounce?.cancel();
    _searchController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  Future<void> _search() async {
    final generation = ++_searchGeneration;
    setState(() {
      _isLoading = true;
      _isLoadingMore = false;
    });

    final page = await _loadPage(offset: 0);
    if (!mounted || generation != _searchGeneration) return;

    setState(() {
      _isLoading = false;
      _users = page ?? const [];
      _hasMore = page != null && page.length >= UserPickerRepositoryImpl.pageSize;
    });
    if (_scrollController.hasClients) _scrollController.jumpTo(0);
  }

  Future<void> _loadMore() async {
    if (_isLoading || _isLoadingMore || !_hasMore) return;

    final generation = _searchGeneration;
    setState(() => _isLoadingMore = true);

    final page = await _loadPage(offset: _users.length);
    if (!mounted || generation != _searchGeneration) return;

    setState(() {
      _isLoadingMore = false;
      _users = [..._users, ...?page];
      _hasMore = page != null && page.length >= UserPickerRepositoryImpl.pageSize;
    });
  }

  // Null on failure.
  Future<List<UserPickerItemModel>?> _loadPage({required int offset}) async {
    final result = await _repository.searchUsers(widget.path, _searchController.text.trim(), offset: offset);
    return result.fold((_) => null, (success) => success.data);
  }

  void _onSearchChanged(String _) {
    _searchDebounce?.cancel();
    _searchDebounce = Timer(const Duration(milliseconds: 300), _search);
  }

  bool _onScroll(ScrollNotification notification) {
    final metrics = notification.metrics;
    if (metrics.axis == Axis.vertical && metrics.pixels >= metrics.maxScrollExtent - _loadMoreThreshold) {
      _loadMore();
    }
    return false;
  }

  @override
  Widget build(BuildContext context) {
    final selectedUsers = widget.selectedUsers;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        if (selectedUsers != null) ...[
          SelectedUsersRow(
            leading: widget.selectedUsersLeading,
            users: selectedUsers,
            onRemove: widget.onTap,
          ),
          const DTDivider.subtle(height: 16),
        ],
        DTSearchBar(
          title: widget.searchLabel,
          controller: _searchController,
          onSearchChanged: _onSearchChanged,
        ),
        const SizedBox(height: 8),
        Expanded(child: _buildList()),
      ],
    );
  }

  Widget _buildList() {
    if (_isLoading && _users.isEmpty) return const Center(child: DTRingLoader());

    if (_users.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: DTEmptyState(icon: DTIcons.noResults, title: widget.noUsersLabel),
        ),
      );
    }

    final tileBuilder = widget.tileBuilder ?? _defaultTile;

    return NotificationListener<ScrollNotification>(
      onNotification: _onScroll,
      child: ListView.builder(
        controller: _scrollController,
        itemExtent: widget.itemExtent,
        itemCount: _users.length + (_isLoadingMore ? 1 : 0),
        itemBuilder: (context, index) {
          if (index >= _users.length) return const Center(child: DTRingLoader.inline());

          final user = _users[index];
          return KeyedSubtree(
            key: ValueKey(user.id),
            child: tileBuilder(context, user, widget.isSelected(user), () => widget.onTap(user)),
          );
        },
      ),
    );
  }

  static Widget _defaultTile(BuildContext context, UserPickerItemModel user, bool isSelected, VoidCallback onTap) =>
      UserPickerTile(user: user, isSelected: isSelected, onTap: onTap);
}

/// The default [UserPickerList] tile: avatar, name (inactive users in
/// brackets), checkbox.
class UserPickerTile extends StatelessWidget {
  final UserPickerItemModel user;
  final bool isSelected;
  final VoidCallback onTap;

  const UserPickerTile({super.key, required this.user, required this.isSelected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(coporBorderRadius),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 10),
        child: Row(
          children: [
            PresenceAvatar(
              userId: user.id,
              userFullName: user.fullName,
              picture: user.picture,
              radius: 20,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                user.isActive == false ? '[${user.fullName}]' : user.fullName,
                style: dt.text.body,
                overflow: TextOverflow.ellipsis,
                maxLines: 1,
              ),
            ),
            Checkbox(value: isSelected, onChanged: (_) => onTap()),
          ],
        ),
      ),
    );
  }
}
