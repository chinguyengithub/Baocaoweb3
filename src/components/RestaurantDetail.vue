<script>
export default {
    props: {
        restaurant: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ restaurant.name }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ restaurant.address }}
        </div>
        <div class="p-1">
            <strong>SDT:</strong>
            {{ restaurant.phone }}
        </div>
        <div class="p-1">
            <strong>Website: </strong>
            {{ restaurant.website }}
        </div>
    </div>
</template>
