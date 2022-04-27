<template>
	<div class="page">
		<div>
			<h4>Thêm Nhà Hàng</h4>
			<RestaurantForm
				:restaurant="{}"
				:resetAfterSubmit="false"
				@submit:restaurant="saveRestaurant"
			/>
		</div>
	</div>
</template>

<script>
import RestaurantForm from "@/components/RestaurantForm.vue";
import RestaurantService from "@/services/restaurant.service";

export default {
	components: {
		RestaurantForm,
	},
	methods: {
		async saveRestaurant(data) {
			try {
				await RestaurantService.create(data);
				swtoast.success({
					text: "Nhà hàng được thêm thành công.",
				});
			} catch (error) {
				console.log(error);
				swtoast.error({
					text: "Đã có lỗi xảy ra.",
				});
			}
		},
	},
};
</script>
