{{{{raw}}}}
<template>
    <section>
        <h1>
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
export default {
    async asyncData ({ app, error }) {
        let data = await app.$axios.$get('/api/examples');

        return {
            examples: data
        };
    },
    head () {
        return {
            title: 'examples'
        };
    }
};
</script>

<style scoped>
.examples {
    list-style: none;
    margin: 0;
    padding: 0;
}
.example {
    margin: 10px 0;
}
</style>
