<template>
	<div class="page">
		<div>
			<h4>Thêm nhân viên</h4>
			<WorkerForm
				:worker="{}"
				:resetAfterSubmit="false"
				@submit:worker="saveWorker"
			/>
		</div>
	</div>
</template>

<script>
import WorkerForm from "@/components/WorkerForm.vue";
import WorkerService from "@/services/worker.service";

export default {
	components: {
		WorkerForm,
	},
	methods: {
		async saveWorker(data) {
			try {
				await WorkerService.create(data);
				swtoast.success({
					text: "Món ăn được thêm thành công.",
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
