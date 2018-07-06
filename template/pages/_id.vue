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
import { examples } from '~/assets/examples.json';

export default {
    name: 'id',
    asyncData ({ params }) {
        return {
            example: examples[params.id]
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
