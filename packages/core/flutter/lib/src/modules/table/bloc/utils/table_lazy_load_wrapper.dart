import 'package:copor_core/src/data/model/filter/bloc/filter_bloc.dart';
import 'package:copor_core/src/modules/table/bloc/table_bloc.dart';
import 'package:copor_core/src/modules/table/bloc/table_event.dart';
import 'package:copor_core/src/modules/table/bloc/table_state.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class TableLazyLoadWrapper extends HookWidget {
  final ScrollController scrollController;
  final String endpoint;
  final Widget child;

  const TableLazyLoadWrapper({
    super.key,
    required this.scrollController,
    required this.endpoint,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    final isRequestingNext = useRef(false);
    final lastScrollOffset = useRef<double?>(null);

    void tryLoadMore({bool forceIfNotScrollable = false}) {
      if (!scrollController.hasClients) return;

      final tableState = context.read<TableBloc>().state;

      if (tableState.failure != null) return;
      if (!tableState.hasMore) return;
      if (tableState.isLoading) return;
      if (isRequestingNext.value) return;

      final pos = scrollController.position;
      final isScrollable = pos.maxScrollExtent > 0;
      final reachedBottom = pos.pixels >= (pos.maxScrollExtent - 140);

      if (!reachedBottom && !(forceIfNotScrollable && !isScrollable)) return;

      isRequestingNext.value = true;
      lastScrollOffset.value = scrollController.offset;

      if (endpoint != '') {
        context.read<TableBloc>().add(LoadMoreTable(endpoint, context.read<FilterBloc>().state));
      }
    }

    useEffect(() {
      void onScroll() {
        tryLoadMore();
      }

      scrollController.addListener(onScroll);

      WidgetsBinding.instance.addPostFrameCallback((_) {
        tryLoadMore(forceIfNotScrollable: true);
      });

      return () => scrollController.removeListener(onScroll);
    }, [scrollController, endpoint]);

    return BlocListener<TableBloc, TableState>(
      listenWhen: (prev, cur) => prev.isLoading && !cur.isLoading,
      listener: (context, state) {
        if (state.failure != null) {
          isRequestingNext.value = false;
          lastScrollOffset.value = null;
          return;
        }

        if (state.tableGetType == TableGetType.formUpdate ||
            state.tableGetType == TableGetType.delete ||
            state.tableGetType == TableGetType.filter) {
          isRequestingNext.value = false;
          lastScrollOffset.value = null;

          WidgetsBinding.instance.addPostFrameCallback((_) {
            if (!scrollController.hasClients) return;
            scrollController.jumpTo(0);

            tryLoadMore(forceIfNotScrollable: true);
          });
          return;
        }

        if (isRequestingNext.value) {
          isRequestingNext.value = false;
          final target = lastScrollOffset.value;
          if (target != null) {
            WidgetsBinding.instance.addPostFrameCallback((_) {
              if (!scrollController.hasClients) return;

              final max = scrollController.position.maxScrollExtent;
              const extraDown = 100.0;

              final desired = target + extraDown;
              final clamped = desired.clamp(0.0, max);

              scrollController.animateTo(
                clamped,
                duration: const Duration(milliseconds: 120),
                curve: Curves.easeOut,
              );
            });
          }
        }

        WidgetsBinding.instance.addPostFrameCallback((_) {
          tryLoadMore(forceIfNotScrollable: true);
        });
      },
      child: child,
    );
  }
}
