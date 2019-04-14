$(".imgAdd").click(function () {
    $(this).closest(".row").find('.imgAdd').before('<div class="col-sm-2 imgUp"><div class="imagePreview"></div><label class="btn btn-primary">Upload<input type="file" class="uploadFile img" value="Upload Photo" style="width:0px;height:0px;overflow:hidden;"></label><i class="fa fa-times del"></i></div>');
});
$(document).on("click", "i.del", function () {
    $(this).parent().remove();
});

$(function () {
    $(document).on("change", ".uploadFile", function () {
        var uploadFile = $(this);
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

        if (/^image/.test(files[0].type)) { // only image file
            var reader = new FileReader(); // instance of the FileReader
            reader.readAsDataURL(files[0]); // read the local file

            reader.onloadend = function () { // set image data as background of div
                //alert(uploadFile.closest(".upimage").find('.imagePreview').length);
                uploadFile.closest(".imgUp").find('.imagePreview').css("background-image", "url(" + this.result + ")");
            }
        }

    });
});

function onSuccess(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;

    // if (localStorage.getItem('token' === null)) {

    axios.post(`${baseURL}/users/g-sign`, {
        token: id_token
    })
        .then(signed => {
            localStorage.setItem('token', signed.data.token)
            localStorage.setItem('name', signed.data.name)
            localStorage.setItem('userId', signed.data.userId)
            app.gSigned()
        })
        .catch(err => {
            console.log('yah erorrrororororo')
            console.log(err)
        })
    // }
}
function onFailure(error) {
    console.log(error);
}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 250,
        'height': 50,
        'longtitle': true,
        'theme': 'light',
        'onsuccess': onSuccess,
        'onfailure': onFailure,
        'text': 'helo'
    });
}
function disconnectGoogle(googleUser) {
    console.log('disconnecting..')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        renderButton()
    });
}

function alert(type, msg) {
    let color = ''
    if (type.toString() === '0') {
        color = '#d43838'
    } else {
        color = '#008148'
    }
    $('#modal-alert').iziModal({
        attached: 'bottom',
        title: msg,
        headerColor: color,
        width: 400,
        timeout: 10000,
        pauseOnHover: true,
        timeoutProgressbar: true,
    });
    $('#modal-alert').iziModal('open');
}

const baseURL = "http://localhost:3000";

function notif(type, msg) {
    Toast.fire({
        type: type,
        title: msg
    })
}

//<!-- -------------------------[L I S T   A R T I C L E]--------------------------- -->

let app = new Vue({
    el: "#app",
    data: {
        serverUrl: '',
        islogin: false,
        position: 'login',
        signedIn: false,
        tags: ["happy", "sad", "funny"],
        tag: 'happy',
        search: '',
        showSearch: false,
        searchOnScreen: '',
        showNull: false,
        showArticleForm: false,
        allArticles: [],
        myArticles: [],
        myInfo: '',
        editArticleData: '',
        foundArticles: [],
        topArticle: [],
        articleList: [],
        topArticles: [],

    },
    computed: {
        hashtagForTags() {
            let tag = ''
            this.tags.map((e, i) => {
                if (i !== 0) {
                    tag += ` #${e}`
                } else {
                    tag += `#${e}`
                }
            })
            return tag
        },
        hastagForTag() {
            return `#${this.tag.toLowerCase()}`
        },
        searchToLowerCase() {
            let split = this.search.split(' ')
            let result = ''
            split.map((e, i) => {
                if (e !== "") {
                    if (i !== split.length - 1) {
                        result += `#${e.toLowerCase()} `
                    } else {
                        result += `#${e.toLowerCase()}`
                    }
                }
            })
            return result
        }
    },
    created() {
        if (localStorage.getItem('token')) {
            this.verifyUser()
        } else {
            this.position = "login"
        }
    },
    methods: {
        verifyUser() {
            axios
                .get(`${baseURL}/users/verify`, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(verified => {
                    console.log(verified)
                    this.islogin = true
                    this.showAllPost()
                    alert('1', 'Welcome Back')
                })
                .catch(err => {
                    console.log(err)
                    this.islogin = false
                    localStorage.clear()
                })
        },
        gSigned() {
            this.islogin = true
            this.showAllPost()
            alert('1', 'Welcome Back')
        },
        loggedin() {
            this.islogin = true
            this.showAllPost()
            alert('1', 'success login')
        },
        logout() {
            disconnectGoogle()
            this.islogin = false
            this.position = "login"
            localStorage.clear()
        },
        submitSearch(search) {
            console.log(search, '===========')
            this.search = search
            if (this.search === '') {
                this.position = "null"
            } else {
                let split = this.search.split(' ')
                let result = ''
                split.map((e, i) => {
                    if (e !== "") {
                        if (i !== split.length - 1) {
                            result += `#${e.toLowerCase()} `
                        } else {
                            result += `#${e.toLowerCase()}`
                        }
                    }
                })
                this.searchOnScreen = result
                axios
                    .get(`${baseURL}/articles/findByTag/?tag=${this.search}`)
                    .then(found => {
                        console.log(found)
                        if (found.data.length === 0) {
                            this.showNull = true
                            this.position = "search-article"

                        } else {
                            this.showNull = false
                            this.showSearch = true
                            this.position = "search-article"
                            this.foundArticles = found.data
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        userArticle() {
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
                    this.position = "user-article"
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addArticle() {
            this.position = 'add-article'
        },
        showAllPost() {
            axios
                .get(`${baseURL}/articles`)
                .then(allArticles => {
                    this.articleList = allArticles.data.reverse()
                    return axios
                        .get(`${baseURL}/articles/mostlikes`)
                })
                .then(topArticles => {
                    this.topArticles = topArticles.data.slice(0, 3)
                    this.position = 'list-article'
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getTopList(id) {
            axios
                .get(`${baseURL}/articles/${id}`)
                .then(topArticle => {
                    console.log(topArticle.data)
                    this.topArticle = topArticle.data
                    this.position = 'top-list'
                })
                .catch(err => {
                    console.log(err)
                })
        },
        findArticle(id) {
            axios
                .get(`${baseURL}/articles/${id}`)
                .then(found => {
                    console.log(found.data)
                    this.editArticleData = found.data
                    this.position = "edit-article"
                })
                .catch(err => {
                    console.log(err)
                })
        },
        updateDone() {
            this.userArticle()
        },
    }
});