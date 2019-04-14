Vue.component("add-article-template", {
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
            background: 'https://cdn.dribbble.com/users/122051/screenshots/5749053/dribbble_1.gif',
            tagId: [],
            tagInfo: [],
            deletePath: ''
        }
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
                    alert('Error, see console')
                })
        },
        addNewPost() {
            console.log(this.selectedTags)

            axios.post(`${baseURL}/articles`, {
                deletePath: this.deletePath,
                image: this.fileInput,
                content: this.contentInput,
                title: this.titleInput,
                selectedTags: this.selectedTags
            },{
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(addedPost => {
                    this.$emit('added-post')
                    console.log(addedPost)
                })
                .catch(err => {
                    console.log(err)
                })
        },
    },
    template: `
    <div id="form-add" class="container kecil text-center">
        <form class="border-shark-form container px-5 py-3 bulet text-center bg-light" @submit.prevent="addNewPost">
            <h3>What's on your mind?</h3>
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
                        <picture-input
                            accept="image/gif,image/jpeg,image/png"
                            removeButtonClass="btn btn-secondary button secondary"
                            @change="onChange"
                            :custom-strings="{
                                upload: '<h1>Bummer!</h1>',
                                drag: 'Upload Photo'
                              }"
                        >
                        </picture-input>
                    </div>
                    <div class="custom-file">
                        <input 
                            type="file"
                            class="custom-file-input" 
                            id="inputGroupFile01" 
                            ref="file"
                            @change="onChange"
                        >
                    </div>
                </div>
                <div class="form-group col-6">
                    <tags-input     
                        element-id="tags" 
                        v-model="selectedTags" 
                        :existing-tags="existTags"
                        :typeahead="true">
                    </tags-input>
                </div>
                <div class="form-group">
                    <wysiwyg v-model="contentInput"></wysiwyg>
                </div>
                <div class="form-group col mx-auto">
                    <button type="submit" class="btn btn-submit tengah">Submit</button>
                </div>
            </div>
        </form>
    </div>
    `
})