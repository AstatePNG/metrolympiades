<script setup>
defineProps(["team"]);
</script>

<template>
    <article class="card">
        <!-- <header class="author">
            <img :src="post.author.avatarUrl" alt="avatar" id="avatar" />
            <RouterLink :to="{name: 'user', params: {username: post.author.username}}" class="author">{{ post.author.username }}</RouterLink>
        </header>
        <div class="content">
            <p>{{ post.content }}</p>
            <p>{{ post.createdAt.toLocaleString() }}</p>
        </div>

        <footer class="reactions">
            <button class="btn-icon answer" @click="emit('answer', post.id)">
                <ArrowTurnDownRightIcon />
            </button>
            <button class="btn-icon like" @click="emit('like', post.id)">
                <LikeIcon v-if="!post.liked" />
                <SolidLikeIcon v-else class="active" />
            </button>
            <button class="btn-icon delete" @click="emit('delete', post.id)">
                <TrashIcon />
            </button>
        </footer> -->
        <p>EKIP</p>
    </article>
</template>