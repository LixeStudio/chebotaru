<template>
  <label :for="id" class="filters-catalog__label checkbox">
    <input
      :id="id"
      type="checkbox"
      class="filters-catalog__checkbox"
      :value="value"
      :checked="modelValue.includes(value)"
      @change="onChange"
    />
    <span class="checkbox__custom"></span>
    {{ labelText }}
  </label>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  labelText: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number, Boolean],
    default: false,
  },
  modelValue: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const onChange = (event) => {
  const checked = event.target.checked;
  const current = [...props.modelValue];

  if (checked && !current.includes(props.value)) {
    emit("update:modelValue", [...current, props.value]);
  } else if (!checked) {
    emit(
      "update:modelValue",
      current.filter((v) => v !== props.value)
    );
  }
};
</script>
