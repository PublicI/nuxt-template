{{{{raw}}}}
<template>
    <section>
        <h1>
            Example
        </h1>
        <h2>
            {{ example.name }}
        </h2>
        <nuxt-link class="button" to="/">
            examples
        </nuxt-link>
    </section>
</template>
{{{{/raw}}}}

<script>
export default {
    name: 'id',
    async asyncData ({ app, params }) {
        let data = await app.$axios.$get('/api/examples/' + params.id);

        return {
            example: data
        };
    },
    head () {
        return {
            title: `example: ${this.example.name}`
        };
    }
};
</script>

<style scoped>
.button {
    margin-top: 30px;
}
</style>
