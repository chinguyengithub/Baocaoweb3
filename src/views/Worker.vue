<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Nhân viên
                <i class="fas "></i>
            </h4>
            <WorkerList
                v-if="filteredWorkersCount > 0"
                :workers="filteredWorkers"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có thực đơn nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-warning" @click="refreshList()">
                    <i class="fas fa-redo"></i> 
                </button>

                <button class="btn btn-sm btn-info" @click="goToAddWorker">
                    <i class="fas fa-plus"></i>
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllWorkers"
                >
                    <i class="fas fa-trash"></i> 
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeWorker">
                <h4>
                    Thông tin về Nhân viên
                    <i class="fas fa-edit"></i>
                </h4>
                <WorkerDetail :worker="activeWorker" />
                <router-link
                    :to="{
                        name: 'worker.edit',
                        params: { id: activeWorker.id },
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
import WorkerDetail from "@/components/WorkerDetail.vue";
import InputSearch from "@/components/InputSearch.vue";
import WorkerList from "@/components/WorkerList.vue";
import WorkerService from "@/services/worker.service";

export default {
    components: {
        WorkerDetail,
        InputSearch,
        WorkerList,
    },
    data() {
        return {
            workers: [],
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
        // Chuyển các đối tượng worker thành chuỗi để tiện cho tìm kiếm.
        workerStrings() {
            return this.workers.map((worker) => {
                const { name, price, processingtime, image } = worker;
                return [name, price, processingtime, image].join("");
            });
        },
        // Trả về các worker có chứa thông tin cần tìm kiếm.
        filteredWorkers() {
            if (!this.searchText) return this.workers;
            return this.workers.filter((worker, index) =>
                this.workerStrings[index].includes(this.searchText)
            );
        },
        activeWorker() {
            if (this.activeIndex < 0) return null;
            return this.filteredWorkers[this.activeIndex];
        },
        filteredWorkersCount() {
            return this.filteredWorkers.length;
        },
    },
    methods: {
        async retrieveWorkers() {
            try {
                this.workers = await WorkerService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveWorkers();
            this.activeIndex = -1;
        },

        async removeAllWorkers() {
            if (confirm("Bạn muốn xóa tất cả nhân viên?")) {
                try {
                    await WorkerService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddWorker() {
            this.$router.push({ name: "worker.add" });
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