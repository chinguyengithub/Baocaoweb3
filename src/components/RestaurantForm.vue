<template>
    <Form
        @submit="$emit('submit:restaurant', restaurantLocal)"
        :validation-schema="restaurantLocalFormSchema"
    >
        <div class="form-group">
            <label for="name">Tên</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="restaurantLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field
                name="address"
                type="text"
                class="form-control"
                v-model="restaurantLocal.address"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">SDT</label>
            <Field
                name="phone"
                type="text"
                class="form-control"
                v-model="restaurantLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="website">Website</label>
            <Field
                name="website"
                type="tel"
                class="form-control"
                v-model="restaurantLocal.website"
            />
            <ErrorMessage name="image" class="error-feedback" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button
                v-if="restaurantLocal.id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="$emit('delete:restaurant', restaurantLocal.id)"
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
    emits: ["submit: restaurant", "delete:restaurant"],
    props: {
        restaurant: { type: Object, required: true }
    },
    data() {
        const restaurantLocalFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(100, "Tên có nhiều nhất 100 ký tự."),
            address: yup
                .string()
                .required("Địa chỉ phải có giá trị.")
                .min(2, "Địa chỉ phải ít nhất 2 ký tự.")
                .max(100, "Địa chỉ có nhiều nhất 100 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
            website: yup
                .string()
                .required("Link phải có giá trị.")
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            //  để liên kết với các input trên form
            restaurantLocal: this.restaurant,
            restaurantLocalFormSchema,
        };
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>