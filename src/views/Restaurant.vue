<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Nhà Hàng
                <i class="fas "></i>
            </h4>
            <RestaurantList
                v-if="filteredRestaurantsCount > 0"
                :restaurants="filteredRestaurants"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có nhà hàng nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-warning" @click="refreshList()">
                    <i class="fas fa-redo"></i> 
                </button>

                <button class="btn btn-sm btn-info" @click="goToAddRestaurant">
                    <i class="fas fa-plus"></i> 
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllRestaurants"
                >
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeRestaurant">
                <h4>
                    Thông tin về nhà hàng
                    <i class="fas fa-cutlery"></i>
                </h4>
                <RestaurantDetail :restaurant="activeRestaurant" />
                <router-link
                    :to="{
                        name: 'restaurant.edit',
                        params: { id: activeRestaurant.id },
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i>Sửa</span
                    >
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import RestaurantDetail from "@/components/RestaurantDetail.vue";
import InputSearch from "@/components/InputSearch.vue";
import RestaurantList from "@/components/RestaurantList.vue";
import RestaurantService from "@/services/restaurant.service";

export default {
    components: {
        RestaurantDetail,
        InputSearch,
        RestaurantList,
    },
    data() {
        return {
            restaurants: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        //  Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng restaurant thành chuỗi để tiện cho tìm kiếm.
        restaurantStrings() {
            return this.restaurants.map((restaurant) => {
                const { name, address, phone, website } = restaurant;
                return [name, address, phone, website].join("");
            });
        },
        // Trả về các restaurant có chứa thông tin cần tìm kiếm.
        filteredRestaurants() {
            if (!this.searchText) return this.restaurants;
            return this.restaurants.filter((restaurant, index) =>
                this.restaurantStrings[index].includes(this.searchText)
            );
        },
        activeRestaurant() {
            if (this.activeIndex < 0) return null;
            return this.filteredRestaurants[this.activeIndex];
        },
        filteredRestaurantsCount() {
            return this.filteredRestaurants.length;
        },
    },
    methods: {
        async retrieveRestaurants() {
            try {
                this.restaurants = await RestaurantService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveRestaurants();
            this.activeIndex = -1;
        },

        async removeAllRestaurants() {
            if (confirm("Bạn muốn xóa nhà hàng đã tìm?")) {
                try {
                    await RestaurantService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddRestaurant() {
            this.$router.push({ name: "restaurant.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width:750px;
}

</style>