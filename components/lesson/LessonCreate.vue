<template>
  <div v-if="store.GetopenModalCreate" class="modal">
    <div
      class="modal-content modal-dialog modal-xl"
      id="deleteConformationLabel"
    >
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
          {{ $t("lesson_head") }}
        </h5>
      </div>

      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">
              {{ $t("lesson_qui") }}:</label
            >

            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="ຄໍາຖາມ *"
              :class="{
                'border-red-500 focus:border-red-500': v$.cs_name.$error,
                'border-[#42d392] ': !v$.cs_name.$invalid,
              }"
              @change="v$.cs_name.$touch"
              v-model="store.formcreatelesson.cs_name"
              maxlength="250"
              @input="filterInputT"
            >
            </textarea>

            <span
              v-if="v$.cs_name.$error"
              class="text-xs text-red-500"
              style="color: red"
            >
              ຕ້ອງໃສ່ຂໍ້ຄວາມ.</span
            >
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label"
              >{{ $t("lesson_ans") }}:</label
            >

            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="ຄໍາຕອບ *"
              :class="{
                'border-red-500 focus:border-red-500': v$.cs_description.$error,
                'border-[#42d392] ': !v$.cs_description.$invalid,
              }"
              @change="v$.cs_description.$touch"
              v-model="store.formcreatelesson.cs_description"
              maxlength="500"
              @input="filterInputTdes"
            >
            </textarea>

            <span
              v-if="v$.cs_description.$error"
              class="text-xs text-red-500"
              style="color: red"
            >
              ຕ້ອງໃສ່ຂໍ້ຄວາມ.</span
            >
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label"
              >{{ $t("lesson_yout") }}:</label
            >

            <input
              type="text"
              class="form-control"
              id="recipient-name"
              v-model="store.formcreatelesson.cs_video"
              placeholder="https://youtu.be/DCh2jlZzC1g *"
              maxlength="100"
            />
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label"
              >{{ $t("lesson_group") }}:</label
            >

            <v-select
              v-model="store.myselect_group"
              :options="store.group"
              label="cg_name_lo"
              placeholder="ເລືອກ"
              @change="changedLabelCounrt($event)"
            ></v-select>

            <span
              v-if="v$.cg_id.$error"
              class="text-xs text-red-500"
              style="color: red"
            >
              ຕ້ອງໃສ່ຂໍ້ຄວາມ.</span
            >
          </div>

          <div class="mb-3">
            <label for="message-text" class="col-form-label"
              >{{ $t("lesson_pic") }}:</label
            >
            <input
              type="file"
              class="form-control-file"
              id="exampleFormControlFile1"
              @change="onFileChange"
              accept=".jpg, .jpeg, .png"
              ref="fileupload"
            />
          </div>
          <div class="border p-2 mt-3">
            <p>{{ $t("menu_exam_display_p") }}:</p>

            <template v-if="store.formcreatelesson.cs_cover">
              <div class="row">
                <div class="col-3">
                  <img
                    :src="store.formcreatelesson.cs_cover"
                    class="img-fluid"
                  />
                  <button @click="removeImage()">
                    {{ $t("menu_exam_display_del") }}
                  </button>
                </div>
              </div>
            </template>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button
          class="btn btn btn-light-dark"
          data-bs-dismiss="modal"
          @click="closeModal()"
        >
          <i class="flaticon-cancel-12"></i> {{ $t("menu_exam_modal_close") }}
        </button>
        <button type="button" class="btn btn-primary" @click="save()">
          {{ $t("menu_exam_modal_save") }}
        </button>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { LessonStore } from "@/store/lesson";
import ExamList from "@/components/exam/ExamList.vue";
import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";

import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";

const { locale, setLocale } = useI18n();

const toast = useToast();
const store = LessonStore();
const router = useRouter();

const { FormLesson } = storeToRefs(store);

store.formcreatelesson.cs_cover = "";

const closeModal = async () => {
  store.GetopenModalCreate = false;
};

const rules = computed(() => {
  return {
    cs_name: {
      required: helpers.withMessage("Exam code field is required", required),
      minLength: minLength(1),
    },
    cs_description: {
      required: helpers.withMessage("Exam code field is required", required),
      minLength: minLength(1),
    },
    cg_id: {
      required: helpers.withMessage("Exam code field is required", required),
      minLength: minLength(1),
    },
  };
});
const v$ = useVuelidate(rules, FormLesson);
const save = async () => {
  ///////////// บันทึก

  if (store.myselect_group) {
    store.formcreatelesson.cg_id = store.myselect_group.cg_id;
  }

  v$.value.$validate(); ///////////ดัก req

  if (!v$.value.$error) {
    let uploadfile = await store.UploadfileLesson();
    let save = await store.saveformLesson();

    if (save === true) {
      const lessonlist = await store.fetchLessonlist();
      await toast.success("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ");
      await store.ResetForm();
      store.formcreatelesson.cs_cover = "";
      store.myselect_group = null;
      store.GetopenModalCreate = false;
      v$.value.$reset();
    } else {
      await toast.error("ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ");
    }
  }
};

const onFileChange = async (event) => {
  var input = event.target;
  const file = event.target.files[0];
  const idxDot = file.name.lastIndexOf(".") + 1;
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  const extFile = file.name.substr(idxDot, file.name.length).toLowerCase();

  if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
    //TO DO

    store.imageReq = false;
    const reader = new FileReader();
    reader.onload = () => {
      store.formcreatelesson.cs_cover = reader.result;
    };
    store.imagelist = input.files[0];
    reader.readAsDataURL(file);
  } else {
    const input = document.querySelector('input[type="file"]');
    input.value = "";
    Swal.fire({
      text: "Upload File Image PNG JPG!",
      icon: "error",
    });
  }

  // if (file && allowedTypes.includes(file.type)) {

  //   store.imageReq = false;
  //   const reader = new FileReader();
  //   reader.onload = () => {

  //     store.formcreatelesson.cs_cover = reader.result;
  //   };
  //   store.imagelist = input.files[0];
  //   reader.readAsDataURL(file);
  // } else {

  //   const input = document.querySelector('input[type="file"]');
  // input.value = "";
  //   Swal.fire({

  //     text: 'Upload File Image PNG JPG!',
  //     icon: 'error',

  //   });
  // }
};

const removeImage = async () => {
  store.formcreatelesson.cs_cover = "";
  store.imageReq = false;
  store.imagelist = null;
  const input = document.querySelector('input[type="file"]');
  input.value = "";
};

const changedLabelCounrt = async (event) => {
  console.log(event.target.value);
};

const filterInputT = async (event) => {
  const key = event.data;
  store.formcreatelesson.cs_name = event.target.value.replace(
    /[!@#$%^&*(),.?":{}|<>]/g,
    ""
  );
};

const filterInputTdes = async (event) => {
  const key = event.data;
  store.formcreatelesson.cs_description = event.target.value.replace(
    /[!@#$%^&*(),.?":{}|<>]/g,
    ""
  );
};
</script>


