Vue.component('list-article', {
    props: ["article-list", "top-articles"],
    data() {
        return {
            userId: '',
        }
    },
    async created() {
        this.userId = localStorage.getItem('userId')
    },
    methods: {
    },
    template: `
        <div id="list-article" class="container">
            <div class="row justify-content" id="content">
                <div class="col col-lg-8">
                    <div class="container text-dark" v-for="(post, index) in articleList" :key="index">
                        <div class="row">
                            <div class="col text-light">
                                <div class="image float-right fit-img">
                                    <img src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                                        class="card-img-top" alt="Profile Photo">
                                </div>
                            </div>
                            <div class="col">
                                <div class="card mb-3">
                                    <p class="bold card-title pt-2 title"> {{ post.title }} </p>
                                    <img 
                                        v-if="post.photo"   
                                        :src="post.photo" 
                                        class="card-img-top no-border" 
                                        alt="..."
                                    >
                                    <div class="card-body">
                                        <p class="card-text" v-html="post.content"></p>
                                        <p class="card-text">
                                            <a href 
                                                v-for="(tag, index) in post.tags" 
                                                :key="index"
                                                @click.prevent="$emit('search-tag', tag.tagName)"
                                            >
                                                <small class="text-muted"> #{{ tag.tagName }} </small>
                                            </a>
                                        </p>
                                        <p class="card-text">
                                            <small class="text-muted bold">@{{ post.userId.name }} </small>
                                        </p>
                                        <p class="card-text">
                                            <small class="text-muted">{{ post.createdAt.slice(0,10) }} </small>
                                        </p>
        
                                        <div class="row">
                                            <div class="col">
                                                <p class="card-text text-muted float-left">
                                                    {{ post.like }} likes
                                                </p>
                                                <a href v-if="post.userId._id === userId"
                                                    @click.prevent="$emit('edit-post', post._id)">
                                                    <p class="card-text float-right">
                                                        <i class="fas fa-cog fa-lg setting"></i>
                                                    </p>
                                                </a>
                                                <a href>
                                                    <p class="card-text float-right mr-3">
                                                        <i class="fas fa-share fa-lg share"></i>
                                                    </p>
                                                </a>
                                                <like-btn
                                                    :article-id="post._id"
                                                    @liked="$emit('liked')"
                                                >
                                                </like-btn>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col col-lg-3 pl">
                    <div id="tag-list" class="container s-text">
                        <h5>Most Liked</h5>
                        <div v-for="(post, index) in topArticles" :key="index">
                            <hr>
                            <a href @click.prevent="$emit('top-list', post._id)">
                                <tr>
                                    <div class="row s-text">
                                        <div class="col col-sm-12 bold mb">
                                            <p>
                                            {{ post.title }}
                                            </p>
                                        </div>
                                        <div class="col col-sm-12">
                                            <p class="float-right mb-off text-muted">
                                                @{{ post.userId.name }}
                                            </p>
                                        </div>
                                    </div>
                                </tr>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})