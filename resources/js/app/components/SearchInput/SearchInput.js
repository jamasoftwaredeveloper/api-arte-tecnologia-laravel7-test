export default {
    name: "SearchInput",
    props: {
      // Opción para pasar el tiempo de debounce
      debounceTime: {
        type: Number,
        default: 300, // tiempo en milisegundos
      },
    },
    data() {
      return {
        searchTerm: "", // Término de búsqueda
        timeout: null,  // Variable para el temporizador de debounce
      };
    },
    methods: {
      onSearch() {
        // Cancela el temporizador previo si existe
        if (this.timeout) clearTimeout(this.timeout);
        
        // Inicia un nuevo temporizador
        this.timeout = setTimeout(() => {
          this.$emit("search", this.searchTerm); // Emite el evento al padre
        }, this.debounceTime);
      },
    },
  };