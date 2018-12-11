import controller from './controller';

const component = {
  controller,
  bindings: {
    inputGroupClass: '@',
  	inputType: '@',
  	icon: '@',
  	value: '<',
  	isDisabled: '@'
  },
  template: `
    <!-- TODO: 1. Replace this hardcoded class with class passed from parent -->
<div class="{{ $ctrl.inputGroupClass }}">
  <div class="input-group-prepend">
    <span class="input-group-text">
      <!-- TODO: 2. Replace this hardcoded icon with icon passed from parent -->
      <i class="{{ $ctrl.icon }}"></i>
    </span>
  </div>
  <!-- TODO: 3. Replace this hardcoded type with type passed from parent -->
  <!-- TODO: 4. Replace this hardcoded value with value passed from parent -->
  <!-- TODO: 5. Replace this hardcoded disabled with value passed from parent -->
  <input type="{{ $ctrl.inputType }}" class="form-control" value="{{ $ctrl.value }}" disabled="{{ $ctrl.isDisabled }}" />
  `,
};

export default component;
