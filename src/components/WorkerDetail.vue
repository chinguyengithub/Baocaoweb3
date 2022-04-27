<script>
export default {
    props: {
        worker: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        
        <div class="p-1">
            <strong>Tên:</strong>
            {{ worker.name }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ worker.price }}
        </div>
        <div class="p-1">
            <strong>Số điện thoại:</strong>
            {{ worker.processingtime }}
        </div>
    </div>
</template>

<style scoped>
.imgdes {
    width: 150px;
    height: 150px;
}
</style>