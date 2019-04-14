Vue.component('search-article', {
    props: ['search', 'searchOnScreen', 'showSearch', 'showNull', 'foundArticles'],
    data() {
        return {
            userId: ''
        }
    },
    created() {
        this.userId = localStorage.getItem('')
    },
    template: `
    <div id="search-article" class="container" style="max-width: 1340px;">
    <div class="row">
        <div class="mx-auto">
            <h4 class="text-light mb-5 mt-2" v-if="showSearch">{{ searchOnScreen }}</h4>
        </div>
    </div>
    <div class="row">
        <div class="mx-auto">
            <h4 class="text-light mb-5 mt-2" v-if="showNull">not Found.</h4>
        </div>
    </div>
    
    <div class="card-columns text-dark">

        <div v-for="(post, index) in foundArticles" :key="index">
            <div class="card card-sm">
                <div class="row card-profile head-margin">
                    <div class="col col-sm-2">
                        <div class="image float-left fit-img-sm">
                            <img class="card-img"
                                src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                                alt="...">
                        </div>
                    </div>
                    <div class="col">
                        <p class="bold card-title search-head">{{ post.userId.name }}</p>
                    </div>
                </div>
                <img 
                    v-if="post.photo"
                    :src="post.photo"
                    class="card-img-top no-border" alt="..."
                >
                <div class="card-body">
                    <p class="bold card-title pt-2 pr-3">{{ post.title }}</p>
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
                    <div class="row">
                        <div class="col">
                            <p class="card-text text-muted float-left">
                                {{ post.like }} likes
                            </p>
                            <a href v-if="post.userId._id === userId" @click.prevent="$emit('edit-post', post._id)">
                                <p class="card-text float-right">
                                    <i class="fas fa-cog fa-lg setting"></i>
                                </p>
                            </a>
                            <a href>
                                <p class="card-text float-right mr-3">
                                    <i class="fas fa-share fa-lg share"></i>
                                </p>
                            </a>
                            <a href>
                                <p class="card-text float-right mr-3">
                                    <i class="fas fa-heart fa-lg like"></i>
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `
})