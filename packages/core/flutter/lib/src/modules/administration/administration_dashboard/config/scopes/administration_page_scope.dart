import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/config/router/utils/scope_builder.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_bloc.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_dto_converter.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/config/administration_page_wrapper.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_state.dart';
import 'package:copor_core/src/modules/table/bloc/table_bloc.dart';
import 'package:copor_core/src/modules/table/bloc/table_event.dart';
import 'package:copor_core/src/modules/table/bloc/table_state.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class AdministrationPageScope extends ScopeBuilder {
  final List<BlocProvider> Function()? additionalProvidersBuilder;
  final bool isModal;

  const AdministrationPageScope({
    super.key,
    required super.id,
    required super.child,
    this.additionalProvidersBuilder,
    this.isModal = false,
  });

  @override
  Widget buildScope(BuildContext context, Widget child) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (context) => getIt<CoporFormBloc>()),
        BlocScopeRegistry.provider<TableBloc>(id),
        BlocScopeRegistry.provider<FilterBloc>(id),
        if (additionalProvidersBuilder != null) ...additionalProvidersBuilder!(),
      ],
      child: Builder(
        builder: (context) {
          return MultiBlocListener(
            listeners: [
              CoporFormListener(
                additionalLogic: (context) {
                  final filterListDto = FilterDtoConverter.fromState(
                    context.read<FilterBloc>().state,
                  );
                  context.read<TableBloc>().add(
                    GetTable(id, filterListDto, TableGetType.formUpdate),
                  );
                },
              ),
              FilterListener(
                additionalLogic: (context, filters) {
                  context.read<TableBloc>().add(GetTable(id, filters, TableGetType.filter));
                },
              ),
              ItemDeletionListener<TableBloc, TableState>(
                additionalLogic: (context) {
                  final filterListDto = FilterDtoConverter.fromState(
                    context.read<FilterBloc>().state,
                  );
                  context.read<TableBloc>().add(GetTable(id, filterListDto, TableGetType.delete));
                },
              ),
              ItemToggledListener<TableBloc, TableState>(
                additionalLogic: (context) {
                  final filterListDto = FilterDtoConverter.fromState(
                    context.read<FilterBloc>().state,
                  );
                  context.read<TableBloc>().add(GetTable(id, filterListDto, TableGetType.filter));
                },
              ),
              FailureListener<TableBloc, TableState>(failureKey: '${id}_table_failure'),
              LoadingListener<TableBloc, TableState>(
                loadingKey: 'table_loading',
                listenWhen: (previous, current) => current.tableGetType != TableGetType.loadMore,
              ),
              FailureListener<CoporFormBloc, CoporFormState>(
                failureKey: '${id}_copor_form_failure',
              ),
              if (isModal) CoporFormInitialLoadFailureListener(),
              if (!isModal)
                LoadingListener<CoporFormBloc, CoporFormState>(loadingKey: 'form_loading'),
              FailureListener<FilterBloc, FilterState>(failureKey: '${id}_copor_filter_failure'),
            ],
            child: AdministrationPageWrapper(namespace: id, child: child),
          );
        },
      ),
    );
  }
}
