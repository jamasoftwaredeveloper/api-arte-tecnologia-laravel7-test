export default {
    name: "InputField",
    props: {
        label: {
            type: String,
            required: true,
        },
        modelValue: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "text",
        },
        placeholder: {
            type: String,
            default: "",
        },
        hasError: {
            type: Boolean,
            default: false,
        },
        errorMessage: {
            type: String,
            default: "",
        },
        inputId: {
            type: String,
            required: true,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 0,
        },
    },
    emits: ["update:modelValue"],
    mounted() {
        console.log("Props recibidos:", {
            label: this.label,
            modelValue: this.modelValue,
            type: this.type,
            placeholder: this.placeholder,
            hasError: this.hasError,
            errorMessage: this.errorMessage,
            inputId: this.inputId,
            min: this.min,
            max: this.max,
        });
    },
    methods: {
        updateValue(value) {
            this.checkFieldChange(parseInt(value))
            this.$emit("update:modelValue", value);
        },
        checkFieldChange(newValue) {
            // Compara el nuevo valor con el anterior
            if (parseInt(newValue) < 0) {
                this.hasError = true;
                this.localErrorMessage = "El valor mínimo no puede ser menor que cero.";
                console.error(this.localErrorMessage);
            } else {
                this.hasError = false; // Resetea el error si el valor es válido
                this.localErrorMessage = "";
            }
        },
    },
};
