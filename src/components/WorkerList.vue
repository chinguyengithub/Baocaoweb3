<script>
export default {
    props: {
        workers: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        select(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>

<template>
    <ul class="list-group">
        <li
            class="list-group-item"
            v-for="(worker, index) in workers"
            :key="worker.id"
            :class="{ active: index === activeIndex }"
            @click="select(index)"
        >
            {{ worker.name }}
        </li>
    </ul>
</template>