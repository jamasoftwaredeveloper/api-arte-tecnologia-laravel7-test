export default {
    name:"Register",
    data () {
        return {

            user:{
                name:"",
                email:"",
                password:"",
                confirmedPassword:""
            },
            loading:true,
            classAlert:"",
            message:"",
            alert:false,
            errors:[]

        }
    },

  methods: {
    register() {
      axios
        .post("/api/v1/register",this.user)
        .then((response) => {

            this.loading = false;
            this.alert= true;
            this.message = response.data.message;
            this.classAlert = response.data.classAlert;
            this.$router.push("/login");


            })
            .catch((error) => {
            this.errors = error.response.data.data;
            this.loading = false;
            this.alert= true;
            this.message = error.response.data.message;
            this.classAlert = error.response.data.class;
            console.log(error);
        });
    },

  },

}