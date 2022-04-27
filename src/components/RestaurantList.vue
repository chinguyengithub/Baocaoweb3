<script>
export default {
    props: {
        restaurants: { type: Array, default: [] },
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
            v-for="(restaurant, index) in restaurants"
            :key="restaurant.id"
            :class="{ active: index === activeIndex }"
            @click="select(index)"
        >
            {{ restaurant.name }}
        </li>
    </ul>
</template>