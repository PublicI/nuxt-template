{{{{raw}}}}
<template>
    <section class="container">
        <h1 class="title">
            EXAMPLES
        </h1>
        <ul class="examples">
            <li v-for="(example, index) in examples" :key="index" class="example">
                <nuxt-link :to="{ name: 'id', params: { id: index }}">
                    {{ example.name }}
                </nuxt-link>
            </li>
        </ul>
    </section>
</template>
{{{{/raw}}}}

<script>
import axios from '~/plugins/axios'

export default {
    async asyncData () {
        let { data } = await axios.get('/api/examples')
        return { examples: data }
    },
    head () {
        return {
            title: 'examples'
        }
    }
}
</script>

<style scoped>
.title {
    margin: 30px 0;
}
.examples {
    list-style: none;
    margin: 0;
    padding: 0;
}
.example {
    margin: 10px 0;
}
</style>
