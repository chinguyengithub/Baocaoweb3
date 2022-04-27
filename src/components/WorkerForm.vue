<template>
    <Form
        @submit="$emit('submit:worker', workerLocal)"
        :validation-schema="workerFormSchema"
    >
        <div class="form-group">
            <label for="name">Tên</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="workerLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Địa chỉ</label>
            <Field
                name="price"
                type="text"
                class="form-control"
                v-model="workerLocal.price"
            />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="processingtime">Số điện thoại</label>
            <Field
                name="processingtime"
                type="text"
                class="form-control"
                
                v-model="workerLocal.processingtime"
            />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        

    

        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button
                v-if="workerLocal.id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="$emit('delete:worker', workerLocal.id)"
            >
                Xóa
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:worker", "delete:worker"],
    props: {
        worker: { type: Object, required: true }
    },
    data() {
        const workerFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(100, "Tên có nhiều nhất 100 ký tự."),
            price: yup
                .string()
                .required("giá tiền phải có giá trị.")
                .min(2, "giá tiền phải ít nhất 2 ký tự.")
                .max(100, "giá tiền có nhiều nhất 100 ký tự."),
            processingtime: yup
                .string()
                .required("thời gian chế biến phải có giá trị.")
                .min(2, "thời gian chế biến phải ít nhất 20 ký tự.")
                .max(100, "thời gian chế biến có nhiều nhất 500 ký tự."),
            image: yup
                .string()
                .required("Ảnh phải có giá trị(đường link ảnh).")
        });
        return {
            workerLocal: this.worker,
            workerFormSchema,
        };
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>