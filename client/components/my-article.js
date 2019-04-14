Vue.component('my-article', {
    props: ["myArticle", "userInfo"],
    data() {
        return {
            myInfo: "",
            myArticles: []
        }
    },
    created() {
        this.myArticles = []
        axios
            .get(`${baseURL}/articles/user/${localStorage.getItem("userId")}`)
            .then(userData => {
                if (userData.data[0]) {
                    this.myArticles = userData.data.reverse()
                    this.myInfo = userData.data[0].userId
                } else {
                    this.myInfo = userData.data
                }
            })
            .catch(err => {
                console.log(err)
            })
    },
    template: `
    <div id="user-article" class="container">
        <div class="row justify-content" id="user-content">
            <div class="col col-lg-8" v-if="myArticle.length !== 0">
                <div class="container text-dark" v-for="(post, index) in myArticle" :key="index">
                    <div class="row">
                        <div class="col text-light">
                            <div class="image float-right fit-img">
                                <img src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1  ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                                    class="card-img-top" alt="Profile Photo">
                            </div>
                        </div>
                        <div class="col">
                            <div class="card mb-3">
                                <p class="bold card-title pt-2 pl-3"> {{ post.title }} </p>
                                <img 
                                    :src="post.photo" 
                                    class="card-img-top no-border" 
                                    alt="..."
                                    v-if="post.photo"
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
                                        <small class="text-muted">{{ post.createdAt.slice(0,10) }} </small>
                                    </p>
                                    <div class="row">
                                        <div class="col">
                                            <p class="card-text text-muted float-left">
                                                {{ post.like }} likes
                                            </p>
                                            <a href @click.prevent="$emit('edit-post', post._id)">
                                                <p class="card-text float-right mr-2">
                                                    <i class="fas fa-cog fa-lg setting"></i>
                                                </p>
                                            </a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="col col-lg-8 mx-auto" v-else>
                <h1> You currently have no Post. </h1>
                <button type="button" class="btn btn-submit mt-2 no-shadow height" @click.prevent="$emit('add-post')">add a post?</button>
                
            </div>
    
            <div class="col col-lg-3 pl">
                <div id="tag-list" class="container">
                    <h5>{{ myInfo.name }}</h5>
                    <hr>
                    <a href @click.prevent="position = 'tag-list'">
                        <tr>
                            <div class="row">
    
                                <div class="col bold">
                                    Email
                                </div>
                                <div class="col">
                                    <p class="float-right mb-off">
                                        {{ myInfo.email }}
                                    </p>
                                </div>
    
                            </div>
                        </tr>
                    </a>
                    <hr>
                    <a href @click.prevent="position = 'tag-list'">
                        <tr>
                            <div class="row">
    
                                <div class="col bold">
                                    Posts
                                </div>
                                <div class="col">
                                    <p class="float-right mb-off">
                                        {{ myArticle.length }}
                                    </p>
                                </div>
    
                            </div>
                        </tr>
                    </a>
                    <hr>
                </div>
            </div>
        </div>
    </div>
    `
})

// ${baseURL}/articles?userId=5cadfb6dabeaa61e2759c470