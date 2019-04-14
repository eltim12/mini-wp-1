Vue.component("navbar-template", {
    props: [],
    data() {
        return {
            query: ''
        }
    },
    methods: {
        submitSearch() {
            this.$emit('search', this.query)
            this.query = ''
        }
    },
    template: `
            <nav id="navbar-template" class="navbar navbar-light fixed-top bg-dark">
                <div class="flex">
                    <a class="navbar-brand text-light" href @click.prevent="$emit('list-article')">blogr</a>
                    <form id="search-bar" class="form" @submit.prevent="submitSearch">
                        <input 
                            class="form-control search-bar mr-sm-2" 
                            type="search" 
                            placeholder="Search"
                            v-model="query"
                        >
                    </form>
                </div>

                <div class="actions">
                    <a href @click.prevent="$emit('to-user-article')">
                        <i class="fas fa-user fa-lg navbar-nav right"></i>
                    </a>
                    <a href @click.prevent="$emit('add-article')">
                        <i class="fas fa-pen fa-lg navbar-nav right"></i>
                    </a>
                    <a href @click.prevent="$emit('logout')">
                        <i class="fas fa-power-off fa-lg navbar-nav"></i>
                    </a>
                </div>
            </nav>
    `
})