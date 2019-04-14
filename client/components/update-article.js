Vue.component("edit-article-template", {
    props: ["articleData"],
    components: {
        wysiwyg: vueWysiwyg.default.component,
        "tags-input": VoerroTagsInput,
        'picture-input': PictureInput
    },
    data() {
        return {
            file: '',
            titleInput: '',
            contentInput: '',
            tagInput: '',
            fileInput: '',
            selectedTags: [],
            existTags: {},
            background: '',
            tagId: [],
            tagInfo: [],
            deletePath: '',
            articleId: '',
        }
    },
    created() {
        this.titleInput = this.articleData.title
        this.contentInput = this.articleData.content
        this.articleId = this.articleData._id
        if (!this.articleData.photo) {
            this.background = 'http://www.transtarsupply.com/wp-content/uploads/2016/08/image-unavailable.png'
        } else {
            this.background = this.articleData.photo
        }
        this.articleData.tags.map(e => {
            this.selectedTags.push(e.tagName)
        })

    },
    methods: {
        onChange(image) {
            this.fileInput = image
            const payload = {
                image
            }
            axios.post(`${baseURL}/tags/getTags`, payload)
                .then(({ data }) => {
                    let arr = []
                    console.log(data)
                    this.deletePath = data.deleteFilePath
                    this.selectedTags = data.tags
                    // data.tags.map(e => {
                })
                .catch(function (err) {
                    console.log(err)
                })
        },
        update() {
            let updateObj = {}
            if (this.fileInput.length > 0) {
                updateObj = {
                    title: this.titleInput,
                    content: this.contentInput,
                    selectedTags: this.selectedTags,
                    deletePath: this.deletePath,
                    image: this.fileInput,
                }
            } else {
                updateObj = {
                    title: this.titleInput,
                    content: this.contentInput,
                    selectedTags: this.selectedTags,
                    deletePath: 'update',
                    image: 'update',
                }
            }
            axios.patch(`${baseURL}/articles/${this.articleId}`, updateObj, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(addedPost => {
                    this.$emit('updated-post')
                    console.log(addedPost)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deletePost() {
            axios
                .delete(`${baseURL}/articles/${this.articleId}`, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(deleted => {
                    this.$emit('deleted')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    template: `
    <div id="form-add" class="container kecil text-center">
        <form class="border-shark-form container px-5 py-3 bulet text-center bg-light" @submit.prevent="update">
            <h3>Edit Article</h3>
            <div class="form-group">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Title"
                    v-model="titleInput"
                >
            </div>
            <div class="row">
                <div class="form-group col-6 minus-bottom">
                    <div class="imgUp">
                        <img 
                            :src="background" 
                            alt="add new photo below!"
                            class="fit-img-lg"
                        >
                        
                        <picture-input
                            ref="pictureInput"
                            accept="image/jpeg,image/png"
                            removeButtonClass="btn btn-secondary button secondary"
                            @change="onChange"
                            :custom-strings="{
                                upload: '<h1>Bummer!</h1>',
                                drag: 'Drag a new Photo here'
                            }"
                        >
                        </picture-input>
                    </div>
                </div>
                <div class="form-group col-6 text-dark">
                    <tags-input
                        element-id="tags" 
                        v-model="selectedTags" 
                        :existing-tags="existTags"
                        :typeahead="true">
                        @tag-removed="onTagRemoved"
                    </tags-input>
                </div>
                <div class="form-group">
                    <wysiwyg v-model="contentInput"></wysiwyg>
                </div>
                <div class="form-group col mx-auto">
                    <button 
                        type="submit" 
                        class="btn btn-submit tengah"
                    >Submit
                    </button>
                </div>
                <div class="form-group col mx-auto">
                    <button 
                        type="button" 
                        class="btn btn-delete tengah"
                        @click.prevent="deletePost"
                    >
                    Delete Post</button>
                </div>
            </div>
        </form>
    </div>
    `
})

// :prefill = "background"
// :prefillOptions = "{mediaType: 'image/jpeg,image/png'}"