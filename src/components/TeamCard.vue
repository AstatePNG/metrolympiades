<script setup>

import { ref } from 'vue'

const props = defineProps(["team", "index"]);

const headerId = ref(`heading${props.index + 1}`);
const collapseId = ref(`collapse${props.index}`);
const ariaCollapseId = ref(`#collapse${props.index}`);

console.log(headerId.value);
</script>

<template>
    <div class="card my-3">
        <header class="card-header" :id="headerId">
            <h2>{{ team.team }}</h2>
        </header>
        <div class="card-body">
            <p>Score : {{ team.points }}</p>
        </div>
    </div>
</template>