<template>
  <div class="row mb-4">
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">{{ $t("menu_new_form_edit_civic") }}</h4>
      </div>
    </div>
    <div id="form_grid_layouts" class="col-lg-2">
      <div class="seperator-header" style="text-align: center;"  @click="backToNews()">
        <button class="btn btn-primary additem _effect--ripple waves-effect waves-light">{{ $t("menu_new_back") }}</button>
      </div>
    </div>
    <div class="form-group mb-4">
      <label for="formGroupExampleInput">{{ $t("menu_new_title") }}</label>
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="หัวข้อ *"
        v-model="store.formDataNewsEdit.news_title" :class="{
          'border-red-500 focus:border-red-500': v$.news_title.$error,
          'border-[#42d392] ': !v$.news_title.$invalid,
        }" @change="v$.news_title.$touch">
      <span class="text-xs text-red-500" style="color:red" v-if="v$.news_title.$error">{{
        v$.news_title.$errors[0].$message
      }}</span>
    </div>
    <div class="form-group mb-4">
      <label for="exampleFormControlTextarea1">{{ $t("menu_new_detail") }}</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" :class="{
        'border-red-500 focus:border-red-500': v$.news_description.$error,
        'border-[#42d392] ': !v$.news_description.$invalid,
      }" @change="v$.news_description.$touch" v-model="store.formDataNewsEdit.news_description">
               </textarea><span class="text-xs text-red-500" style="color:red" v-if="v$.news_description.$error">{{
                 v$.news_description.$errors[0].$message
               }}</span>
    </div>
    <div class="form-group mb-4 mt-3">
      <label for="exampleFormControlFile1">{{ $t("menu_new_image") }}</label>
      <input type="file" class="form-control-file" id="exampleFormControlFile1" multiple @change="onFileChange"
        ref="fileupload">
    </div>

    <p style="color: red;" v-if="store.getFile === true">File size exceeds the limit 2 MB. </p>
    <div class="border p-2 mt-3">
      <p>{{ $t("menu_new_display_img") }}:</p>
      <template v-if="storeupload.preview_list.length">
        <div class="row">
          <div class="col-3" v-for="item, index in storeupload.preview_list" :key="index">
            <img :src="CoverImage(item)" class="img-fluid" />
            <button @click="removeImage(index)">{{ $t("menu_new_image_del") }}</button>
          </div>
        </div>
      </template>
    </div>
    <div>

    </div>
  </div>
  <button type="button" class="btn btn-primary" @click="edit()">{{ $t("menu_new_save") }}</button>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { newCivilStore } from '@/store/newcivil'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { UploadStore } from '@/store/upload'; // import the auth store we just created
import { AlertStore } from '@/store/alert'; // import the auth store we just created
import { ref } from "vue";
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter();
const store = newCivilStore()
const storeupload = UploadStore()
const { UpdateFormNews } = newCivilStore(); // use  action
const { getFormEditNews } = newCivilStore();
const { getAlertFile } = storeToRefs(store);
const { Saveimages } = UploadStore(); // use authenticateUser action from  auth store

await store.fetchNewsId(router.currentRoute.value.params.id)

const rules = computed(() => {
  return {
    news_title: {
      required: helpers.withMessage('The News Title field is required', required),
      minLength: minLength(6),
    },
    news_description: {
      required: helpers.withMessage('The News Description is required', required),
      minLength: minLength(6),
    },

  };
});

const backToNews = async () => {
  router.go(-1);
}
////////////////ใส่ Url///////////

const CoverImage = (img) => {
  let result = img.slice(0, 6);
  if (result === "static") {
    return 'https://oasapi.iddriver.com/media_file/file/?f=' + img;
  } else {
    return img;
  }
}

const v$ = useVuelidate(rules, getFormEditNews);
const removeImage = async (remove) => {
  storeupload.preview_list.splice(remove, 1)
  storeupload.formi.splice(remove, 1)
  storeupload.data_list_image.splice(remove, 1)

}
const edit = async () => {

  v$.value.$validate();
  if (!v$.value.$error) {
    await toast.warning("ລໍຖ້າຈັກໜ່ອຍ", {
      timeout: 2000,
    });
    try {
      await UpdateFormNews();
      await toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ')

      setTimeout(() => {
        router.push('/news/civil');
      }, 2000);
    } catch (e) {
      await toast.error('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ')
    }
  }
}

const onFileChange = async (event) => {

  var input = event.target;
  var count = input.files.length;
  var index = 0;
  const maxSize = 1024 * 1024; // 2 MB in bytes

  for (let x = 0; x < count; x++) {
    if (event.target.files[x].size > maxSize) {    ///////////////////////File size ดักก่อน ///////////
      store.getFile = true;
      await toast.error('Can not Upload File')
      const input = document.querySelector('input[type="file"]');
      input.value = '';
      return false;
    }
    store.getFile = false; ///////////////////////ถ้า ผ่านข้างบนให้ปิด alert ///////////
  }

  for (let i = 0; i < count; i++)     ///////////////////////เก็บ data ไปไว้ใน state ///////////
  {
    storeupload.formi.push(event.target.files[i]);
  }

  const formData = new FormData();
  for (const i of Object.keys(storeupload.formi)) {
    setTimeout(function (scope) {
      formData.append('files', storeupload.formi[i])
    }, 500);
  }


  // await Saveimages();


  if (input.files) {

    while (count--) {
      var reader = new FileReader();
  
      reader.onload = (e) => {

        storeupload.preview_list.push(e.target.result); ///////////////////////จับ Data ใส่ array ///////////
        let a = { ni_name_file: e.target.result, ni_path_file: e.target.result }
        storeupload.data_list_image.push(a);

      }
      storeupload.image_list.push(input.files[index]); ///////////////////////จับ Data ใส่ array ///////////
      reader.readAsDataURL(input.files[index]); ///////////////////////อ่านไฟล์ภาพ ///////////
      index++;
    }
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

 