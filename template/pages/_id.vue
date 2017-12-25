{{{{raw}}}}
<template>
    <section class="container">
        <h1 class="title">
            Example
        </h1>
        <h2 class="info">
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
.title {
    margin-top: 30px;
}
.info {
    font-weight: 300;
    color: #9aabb1;
    margin: 0;
    margin-top: 10px;
}
.button {
    margin-top: 30px;
}
</style>
