Vue.component('top-articles', {
    props: ["articleInfo"],
    data() {
        return {
            userId: ''
        }
    },
    created() {
        this.userId = localStorage.getItem('userId')
    },
    template: `
    <div id="top-article" class="container" style="max-width: 1340px;">
        <div class="row">
            <div class="mx-auto">
                <h4 class="col col-sm-12 text-light mt-2"> {{ articleInfo.title }} </h4>
                <h4 class="col col-sm-12 text-light mb-4 text-muted"> By @{{ articleInfo.userId.name }} </h4>
            </div>
        </div>
        <div class="row">
            <div class="col text-dark mx-auto">
                <div class="card mx-auto large">
                    <p class="bold card-title pt-2 pl-3">blog title</p>
                    <img 
                        v-if="articleInfo.photo"
                        :src="articleInfo.photo" 
                        alt="..." 
                    >
                    <div class="card-body">
                        <p class="card-text" v-html="articleInfo.content"></p>
                        <p class="card-text">
                            <a href 
                                v-for="(tag, index) in articleInfo.tags" 
                                :key="index"
                                @click.prevent="$emit('search-tag', tag.tagName)"
                            >
                                <small class="text-muted"> #{{ tag.tagName }} </small>
                            </a>
                        </p>
                        <p class="card-text">
                            <small class="text-muted bold">@{{ articleInfo.userId.name }} </small>
                        </p>
                        <p class="card-text">
                            <small class="text-muted">{{ articleInfo.createdAt.slice(0,10) }} </small>
                        </p>
                        <div class="row">
                            <div class="col">
                                <p class="card-text text-muted float-left">
                                    {{ articleInfo.like }} likes
                                </p>
                                <a href 
                                    v-if="articleInfo.userId._id === userId"
                                    @click.prevent="$emit('edit-post', articleInfo._id)"
                                >
                                    <p class="card-text float-right">
                                        <i class="fas fa-cog fa-lg setting"></i>
                                    </p>
                                </a>
                                <a href>
                                    <p class="card-text float-right mr-3">
                                        <i class="fas fa-share fa-lg share"></i>
                                    </p>
                                </a>
                                <a href >
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