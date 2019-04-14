Vue.component("register-form", {
    data() {
        return {
            fullname: '',
            email: '',
            password: '',
            message: '',
            error: false      
        }
    },
    methods: {
        submitForm() {
            axios.post(`${baseURL}/users` ,{
                name: this.fullname,
                email: this.email,
                password: this.password
            })
            .then(res => {  
                this.$emit('registered')
                console.log(res.data)
            })
            .catch(err => {
                this.message = err.response.data.msg
                this.error = true
                console.log(err.response.data.msg)
            })
        }
    },
    template: `
    <div class="text-center" style="padding:50px 0">
        <div class="login-form-1">
            <h1>REGISTER</h1>
            <form id="register-form" class="text-left" @submit.prevent="submitForm()">
                <div class="login-form-main-message"></div>
                <div class="main-login-form">
                    <div class="login-group mx-auto">
                        <div class="form-group">
                            <label for="lg_name" class="sr-only"></label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="lg_name" 
                                name="lg_name"
                                placeholder="fullname" 
                                onfocus="this.placeholder = ''"
                                onblur="this.placeholder = 'fullname'"
                                v-model="fullname"
                            >
                        </div>
                        <div class="form-group">
                            <label for="lg_email" class="sr-only"></label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="lg_email" 
                                name="lg_email"
                                placeholder="email" 
                                onfocus="this.placeholder = ''"
                                onblur="this.placeholder = 'email'"
                                v-model="email"
                            >
                        </div>
                        <div class="form-group">
                            <label for="lg_password" class="sr-only">Password</label>
                            <input 
                                type="password" 
                                class="form-control" 
                                name="lg_password" 
                                placeholder="password"
                                onfocus="this.placeholder = ''" 
                                onblur="this.placeholder = 'password'"
                                v-model="password"
                            >
                        <div class="form-group text-center text-light bg-danger round-border" v-if="error">
                            <p class="mt-2 mb-2"> {{ message }} </p>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-submit mt-2">register</button>
                        </div>
                    </div>
                </div>
                </div>
                <div class="etc-login-form text-center">
                     <p> already have an account? <br>
                         <a href class="colorful" @click.prevent="$emit('login')">
                             <p>login now</p>
                         </a>
                     </p>
                 </div>
            </form>
        </div>
    </div>
    `
})