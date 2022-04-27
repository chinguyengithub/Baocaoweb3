<template>
    <div v-if="restaurant" class="page">
        <h4>Hiệu chỉnh nhà hàng</h4>
        <RestaurantForm
            :restaurant="restaurant"
            @submit:restaurant="updateRestaurant"
            @delete:restaurant="deleteRestaurant"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import RestaurantForm from "@/components/RestaurantForm.vue";
import RestaurantService from "@/services/restaurant.service";

export default {
    components: {
        RestaurantForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            restaurant: null,
            message: "",
        };
    },
    methods: {
        async getRestaurant(id) {
            try {
                this.restaurant = await RestaurantService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },

        async updateRestaurant(data) {
            try {
                await RestaurantService.update(this.restaurant.id, data);
                this.message = "Nhà Hàng được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },

        async deleteRestaurant() {
            if (confirm("Bạn muốn xóa nhà hàng này?")) {
                try {
                    await RestaurantService.delete(this.restaurant.id);
                    this.$router.push({ name: "restaurant" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getRestaurant(this.id);
        this.message = "";
    },
};
</script>