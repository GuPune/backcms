<template>
  <loading v-model:active="store.isLoaddingsave" :can-cancel="true" 
                />

                
  <div class="row mb-4 g-3">
    <div id="form_grid_layouts" class="col-lg-9">
      <div class="seperator-header">
        <h4 class=""> {{ $t("menu_couse_p_edit_title") }} </h4>
      </div>
    </div>
    <div class="col-md-6">
      <label for="inputEmail4" class="form-label">  {{ $t("menu_couse_f_title_code") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input type="text" class="form-control" id="inputEmail4" v-model="store.formDataEditCourse.course_code" :class="{
        'border-red-500 focus:border-red-500': v$.course_code.$error,
        'border-[#42d392] ': !v$.course_code.$invalid,
      }" @change="v$.course_code.$touch"
  
      />
 
 <div v-if="locale == 'la'" >
      <span v-if="v$.course_code.$error" class="text-xs text-red-500"
        style="color: red" >ຕ້ອງມີຊ່ອງຂໍ້ມູນລະຫັດຫຼັກສູດ</span>
  </div>

  <div v-if="locale == 'en'" >
      <span v-if="v$.course_code.$error" class="text-xs text-red-500"
        style="color: red" >The Course Code field is required</span>
  </div>

  <div v-if="locale == 'th'" >
      <span v-if="v$.course_code.$error" class="text-xs text-red-500"
        style="color: red" >ต้องระบุฟิลด์รหัสหลักสูตร</span>
  </div>
    </div>
    <div class="col-md-6">
      <label for="inputPassword4" class="form-label">  {{ $t("menu_couse_f_title_name") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <input type="text" class="form-control" id="inputPassword4" v-model="store.formDataEditCourse.course_name" :class="{
        'border-red-500 focus:border-red-500': v$.course_name.$error,
        'border-[#42d392] ': !v$.course_name.$invalid,
      }" @change="v$.course_name.$touch" 
       maxlength="30"
      />
      <div v-if="locale == 'la'" >
      <span v-if="v$.course_name.$error" class="text-xs text-red-500"
        style="color: red" >ຕ້ອງມີຊ່ອງໃສ່ຊື່ຫຼັກສູດ.</span>
  </div>

  <div v-if="locale == 'en'" >
      <span v-if="v$.course_name.$error" class="text-xs text-red-500"
        style="color: red" >
The Course Name field is required.</span>
  </div>

  <div v-if="locale == 'th'" >
      <span v-if="v$.course_name.$error" class="text-xs text-red-500"
        style="color: red" >ต้องระบุฟิลด์ชื่อหลักสูตร</span>
  </div>
    </div>
    <div class="col-12">
      <label for="inputAddress" class="form-label">  {{ $t("menu_couse_f_title_detail") }}</label><span class="text-xs text-red-500" style="color:red"> * </span>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" :class="{
        'border-red-500 focus:border-red-500': v$.course_description.$error,
        'border-[#42d392] ': !v$.course_description.$invalid,
      }" @change="v$.course_description.$touch" v-model="store.formDataEditCourse.course_description" maxlength="200">
      </textarea>
      <div v-if="locale == 'la'" >
      <span v-if="v$.course_description.$error" class="text-xs text-red-500"
        style="color: red" >
ລາຍລະອຽດຂອງຫຼັກສູດແມ່ນຕ້ອງການ.</span>
  </div>

  <div v-if="locale == 'en'" >
      <span v-if="v$.course_description.$error" class="text-xs text-red-500"
        style="color: red" >
        The Course Description is required.</span>
  </div>

  <div v-if="locale == 'th'" >
      <span v-if="v$.course_description.$error" class="text-xs text-red-500"
        style="color: red" >ต้องระบุฟิลด์รายละเอียด</span>
  </div>
    </div>

    <div class="form-group mb-4 mt-3">
      <label for="exampleFormControlFile1">  {{ $t("menu_couse_f_title_picture") }}</label>
      <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="onFileChangeBack" ref="fileupload" />
    </div>
    <div v-if="locale == 'la'" >
      <span v-if="v$.course_cover.$error" class="text-xs text-red-500"
        style="color: red" >
        ອັບໂຫຼດຮູບ.</span>
  </div>

  <div v-if="locale == 'en'" >
      <span v-if="v$.course_cover.$error" class="text-xs text-red-500"
        style="color: red" >
        Upload photo.</span>
  </div>

  <div v-if="locale == 'th'" >
      <span v-if="v$.course_cover.$error" class="text-xs text-red-500"
        style="color: red" >อัพโหลดรูปภาพ</span>
  </div>

    <div class="border p-2 mt-3">
      <p>  {{ $t("menu_couse_f_title_display_picture") }}:</p>
     <template v-if="store.formDataEditCourse.course_cover">
        <div class="row">
          <div id="image-container" class="col-md-3 col-sm-4 col-6" >
            <div class="image-wrapper">
              <img :src="coverimage(store.formDataEditCourse.course_cover)" class="img-fluid" />
              <button @click="removeImage()" class="delete-button"><i class="bi bi-x-lg"></i></button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div></div>
  </div>

  <!-- <button class="btn btn-dark additem _effect--ripple waves-effect waves-light" @click="addlesson()">
   {{ $t("menu_couse_f_add_lesson") }}
  </button> -->
  <!-- <div class="invoice-detail-items">
    <div class="table-responsive">
      <table class="table item-table">
        <thead>
          <tr>
            <th class=""></th>
                <th>{{ $t("menu_lesson_name_and_detail") }}</th>
            <th class="">{{ $t("menu_lesson_f_title_picture") }}</th>
            <th class="">{{ $t("menu_lesson_f_video") }}</th>
          </tr>
          <tr aria-hidden="true" class="mt-3 d-block table-row-hidden"></tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in store.lessonlist" :key="index">
            <td class="delete-item-row">
              <ul class="table-controls">
                <li>
                  
                  <a href="javascript:void(0);" @click="removelesson(item.cs_id)" class="delete-item"
                    data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"><svg
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="feather feather-x-circle">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg></a>
                </li>
              </ul>
            </td>
            <td class="description">
              <input type="text" class="form-control form-control-sm" placeholder="ຄໍາຖາມ"
                v-model="item.cs_name" />
              <textarea class="form-control" placeholder="ຄໍາຕອບ"
                v-model="item.cs_description">{{ item.cs_description }}</textarea>
            </td>
            <td>
              <input type="file" id="input" @change="handleFiles($event, index)" />
              <img :src="image(item.cs_cover)" class="img-fluid" width="40" height="40" />
            </td>
            <td>

               <input
                type="text"
                class="form-control form-control-sm"
                placeholder="ລິ້ງວິດີໂອ"
                v-model="item.cs_video"
              />
            
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div> -->
  <div class="col-xl-12 col-md-12">
    <button type="button" class="btn btn-success" @click="save()">
    {{ $t("menu_couse_f_save") }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { CourseStore } from "@/store/course"; // import the auth store we just created
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import ApiService  from "../../services/api.service";
import { useI18n } from "vue-i18n";
import Loading from 'vue-loading-overlay';import 'vue-loading-overlay/dist/css/index.css';
import Swal from 'sweetalert2';
const { locale, setLocale } = useI18n();
const toast = useToast();
const router = useRouter();
const store = CourseStore();


const { FormDataCourse } = storeToRefs(store);
const { FormDataEditCourse } = storeToRefs(store);
const { Images } = storeToRefs(store);
const { SaveCourse } = CourseStore();
const { UpdateCourse } = CourseStore();
const { SaveLesson } = CourseStore();
const { ResetForm } = CourseStore();
const { UploadfileCourse } = CourseStore();
const { deletelesson } = CourseStore();
const { Adlesson } = CourseStore();
const { uploadfilecourse } = CourseStore();
const { SaveLessoncluster } = CourseStore();
const { ClearLessoncluster } = CourseStore();


const rules = computed(() => {
  return {
    course_code: {
      required: helpers.withMessage(
        "The Course Code field is required",
        required
      ),
      minLength: minLength(6),
    },
    course_name: {
      required: helpers.withMessage(
        "The Course Name is required",
        required
      ),
      minLength: minLength(6),
    },
    course_cover: {
      required: helpers.withMessage(
        "Course Image is required",
        required
      ),
      minLength: minLength(6),
    },

    course_description: {
      required: helpers.withMessage(
        "The Course cover is required",
        required
      ),
      minLength: minLength(6),
    },
  };
});

const v$ = useVuelidate(rules, FormDataEditCourse);
const save = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    store.isLoaddingsave = true;
    try {
      let updatefile = await UploadfileCourse()
      let updatedata = await UpdateCourse();
      let clearlesson = await ClearLessoncluster();
      let savelesson = await SaveLessoncluster();

      if(updatedata === true){
        await setTimeout(() => {
        toast.success("ແກ້ໄຂສຳເລັດແລ້ວ");
      }, 500);
      store.isLoaddingsave = false;
      await router.push('/learning');
      }
    } catch (error) {
      await toast.error("ແກ້ໄຂບໍ່ສຳເລັດ");
    }

  }
};






const removeImage = async () => {
 
    store.formDataEditCourse.course_cover = null
  const input = document.querySelector('input[type="file"]');
  input.value = "";
};




const onFileChangeBack = async (event) => {
  var input = event.target;
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    // Use FileReader to read the selected image and set it as the source for the <img> tag

    const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formDataEditCourse.course_cover = reader.result;
    };
    store.imagelist = input.files[0];
    reader.readAsDataURL(file);
  } else {
    // Reset the image URL if the selected file is not an image
    //   this.imageUrl = null;
    const input = document.querySelector('input[type="file"]');
  input.value = "";
    Swal.fire({
      text: 'Upload File Image Only!',
      icon: 'error',
    });
  }
};




function coverimage(i) {
   
  let result = i.slice(0, 6);
  if (result === 'static') {
    let im =  ApiService.image(i);
    return im;
  } else {
 
    return i;
  }
}
</script>
<style>
.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
}
#image-container img{
  width: 250px;
  height: 250px;
  object-fit: cover;
}
#image-container .delete-button {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border: none;
  padding: 2.5px 5px;
  cursor: pointer;
}
#image-container .image-wrapper {
  position: relative;
  display: inline-block;
  margin: 10px;
  border: 1px solid;
}
#image-container {
  width: fit-content;
  min-width: 200px;
  min-height: 200px;
  max-width: 300px;
  max-height: 300px;
}


</style>
 