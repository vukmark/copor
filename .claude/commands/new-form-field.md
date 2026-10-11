# Add a New Dynamic Form Field Type

Use this when none of the existing field types in `packages/core/server/src/client/Core/Form/` cover a new UI requirement and a brand new type needs to be added end-to-end.

Ask for the field type name (e.g., `TimeRange`) and what value it should submit if not provided.

For using existing field types when building a form presenter, see `docs/dev_documentation/dynamic_forms_field_reference.md`.

---

## 5 files to touch, in order

### 1. Client — add enum value
`packages/core/server/src/client/Core/Form/FormFieldType.ts`
```typescript
MY_FIELD_TYPE = 'MY_FIELD_TYPE',
```

### 2. Client — create the field class
Add to the appropriate subdirectory under `packages/core/server/src/client/Core/Form/`:
- `text_inputs/` — text, number, password, hidden, disabled, HTML
- `drop_down/` — dropdowns, publish status
- `bool_inputs/` — boolean toggles
- `date_inputs/` — date pickers
- (or create a new subdirectory for genuinely new categories)

Extend the correct base and implement `getLabel()`, `getName()`, `getFieldType()`, `getCurrentValue()`. Implement `RequiredField` if mandatory:

```typescript
export class MyField extends TextField implements RequiredField {
    getRequiredMessage(): string { return 'MY_FIELD_IS_REQUIRED'; }
    protected getLabel(): string { return 'MY_LABEL'; }
    protected getName(): string { return 'myFieldName'; }
    // Override getFieldType() if not inheriting the right type from base
}
```

### 3. Frontend — add FieldType enum value
`packages/core/flutter/lib/src/modules/forms/data/model/copor_form_dto.dart`
```dart
myFieldType,
```
Also add to the `FieldType.fromJson()` mapping in the same file.

### 4. Frontend — add case to FormHelper
`packages/core/flutter/lib/src/modules/forms/presentation/utils/form_helper.dart`
```dart
case FieldType.myFieldType:
  return MyFieldInput(
    label: field.label,
    name: field.name,
    requiredMessage: field.requiredMessage,
    currentValue: field.currentValue?.text ?? '',
  );
```

### 5. Frontend — create the InputFieldModel subclass
`packages/core/flutter/lib/src/modules/forms/data/model/input_field_model.dart`

Extend `InputFieldModel<T>` and implement:
- `getValue()` — returns the value that goes into the submission map
- `isValid(BuildContext context)` — returns false and shows error if required and empty
- `build(BuildContext context)` — renders the widget using a `ValueNotifier` controller

```dart
class MyFieldInput extends InputFieldModel<String> {
  MyFieldInput({required super.label, required super.name, super.requiredMessage, String currentValue = ''})
      : super(controller: ValueNotifier(currentValue));

  @override
  dynamic getValue() => controller.value;

  @override
  bool isValid(BuildContext context) {
    if (requiredMessage != null && controller.value.isEmpty) {
      // show error
      return false;
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder(
      valueListenable: controller,
      builder: (context, value, _) => MyWidget(value: value, onChanged: (v) => controller.value = v),
    );
  }
}
```

---

## Reference implementations

- Simplest: `packages/core/server/src/client/Core/Form/text_inputs/TextField.ts` + `DTTextInput` in `input_field_model.dart`
- Dropdown with options: `packages/core/server/src/client/Core/Form/drop_down/DropDownField.ts` + `DTDropdownInput`
- Complex with side effects: `CountryField` (`CountryInput` reloads the state list on change)
