<template>
    <div v-if="worker" class="page">
        <h4>Cập Nhật thông tin nhân viên</h4>
        <WorkerForm
            :worker="worker"
            @submit:worker="updateWorker"
            @delete:worker="deleteWorker"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import WorkerForm from "@/components/WorkerForm.vue";
import WorkerService from "@/services/worker.service";

export default {
    components: {
        WorkerForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            worker: null,
            message: "",
        };
    },
    methods: {
        async getWorker(id) {
            try {
                this.worker = await WorkerService.get(id);
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

        async updateWorker(data) {
            try {
                await WorkerService.update(this.worker.id, data);
                this.message = "Nhân viên được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },

        async deleteWorker() {
            if (confirm("Bạn muốn xóa nhân viên này?")) {
                try {
                    await WorkerService.delete(this.worker.id);
                    this.$router.push({ name: "worker" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getWorker(this.id);
        this.message = "";
    },
};
</script>