Vue.component("login-form", {
    props: [],
    data() {
        return {
            email: '',
            password: '',
            message: '',
            error: false
        }
    },
    methods: {
        login() {
            axios.post(`${baseURL}/users/login`, {
                email: this.email,
                password: this.password
            })
                .then(loggedin => {
                    this.email = ''
                    this.password = ''
                    console.log(loggedin.data)
                    localStorage.setItem('token', loggedin.data.token)
                    localStorage.setItem('name', loggedin.data.name)
                    localStorage.setItem('userId', loggedin.data.userId)
                    this.$emit('loggedin')
                })
                .catch(err => {
                    this.message = err.response.data.msg
                    this.error = true
                    console.log(err.response.data)
                })
        }
    },
    template: `
            <div class="text-center" style="padding:50px 0">
                <div class="login-form-1">
                     <h1>LOGIN</h1>
                     <form id="login-form" class="text-left" @submit.prevent="login">
                         <div class="login-form-main-message"></div>
                         <div class="main-login-form">
                             <div class="login-group mx-auto">
                                 <div class="form-group">
                                     <label for="lg_username" class="sr-only"></label>
                                     <input 
                                        type="text" 
                                        class="form-control validate" 
                                        id="lg_username" 
                                        name="lg_username"
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
                                        id="lg_password" 
                                        name="lg_password"
                                        placeholder="password" 
                                        onfocus="this.placeholder = ''"
                                        onblur="this.placeholder = 'password'"
                                        v-model="password"
                                    >
                                 </div>
                                 <div class="form-group text-center text-light bg-danger round-border" v-if="error">
                                    <p class="mt-2 mb-2"> {{ message }} </p>
                                 </div>
                                 <div class="form-group">
                                     <button type="submit" class="btn btn-submit mt-2 no-shadow">Login</button>
                                 </div>
                             </div>
                         </div>
                         <div class="etc-login-form">
                             <p>
                                 new user?
                                 <a href class="colorful" @click.prevent="$emit('register')">
                                     create new account
                                 </a>
                             </p>
                         </div>
                         <div class="etc-login-form">
                             <div id="my-signin2"></div>
                         </div>
                     </form>
                 </div>
            </div>
    `
})

