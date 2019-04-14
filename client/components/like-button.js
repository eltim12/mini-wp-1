Vue.component('like-btn', {
    props: ["articleId"],
    methods: {
        likeunlike() {
            axios
                .patch(`${baseURL}/articles/like/${this.articleId}`, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(liked => {
                    this.$emit('liked')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    template: `
    <a href @click.prevent="likeunlike">
        <p class="card-text float-right mr-3">
            <i class="fas fa-heart fa-lg like"></i>
        </p>
    </a>   

    `
})