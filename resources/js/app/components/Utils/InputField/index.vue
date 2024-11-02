<template>
    <div>
        <label :for="inputId" class="form-label"><b>{{ label }}</b></label>
        <input :id="inputId" :type="type" :value="modelValue" @input="updateValue($event.target.value)"
            :placeholder="placeholder" :class="{ 'form-control is-invalid': hasError,  'form-control': !hasError }" :min="min" :max="max" />
        <span v-if="hasError" class="error-message">{{ errorMessage }}</span>
    </div>
</template>
<script src="./inputField.js"></script>
<style src="./inputField.css" scoped></style>
