<template>
  <div class="row mb-4">
    <div id="form_grid_layouts" class="col-lg-10">
      <div class="seperator-header">
        <h4 class="">{{ $t("menu_new_form_edit") }}</h4>
      </div>
    </div>
    <div id="form_grid_layouts" class="col-lg-2">
      <div class="seperator-header" style="text-align: center;"  @click="backToNews()">
        <button class="btn btn-primary additem _effect--ripple waves-effect waves-light">{{ $t("menu_new_back") }}</button>
      </div>
    </div>
    <div class="form-group mb-4">
      <label for="formGroupExampleInput">{{ $t("menu_new_title") }}</label>
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="ຫົວຂໍ້ຂ່າວ *"
        v-model="store.formDataNewsEdit.news_title" :class="{
          'border-red-500 focus:border-red-500': v$.news_title.$error,
          'border-[#42d392] ': !v$.news_title.$invalid,
        }" @change="v$.news_title.$touch" maxlength="100">
     <div v-if="locale == 'la'">
        <span v-if="v$.news_title.$error" class="text-xs text-red-500" style="color: red">
          ຕ້ອງໃສ່ຊ່ອງຫົວຂໍ້ຂ່າວ</span>
      </div>

      <div v-if="locale == 'en'">
        <span v-if="v$.news_title.$error" class="text-xs text-red-500" style="color: red">
          The News Title field is required</span>
      </div>

      <div v-if="locale == 'th'">
        <span v-if="v$.news_title.$error" class="text-xs text-red-500" style="color: red">ต้องระบุฟิลด์หัวข้อ</span>
      </div>

    </div>

   
    <div class="form-group mb-4">
      <label for="exampleFormControlTextarea1">{{ $t("menu_new_detail") }}</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" :class="{
        'border-red-500 focus:border-red-500': v$.news_description.$error,
        'border-[#42d392] ': !v$.news_description.$invalid,
      }" @change="v$.news_description.$touch" v-model="store.formDataNewsEdit.news_description">
               </textarea>
               
               <span class="text-xs text-red-500" style="color:red" v-if="v$.news_description.$error">{{
                 v$.news_description.$errors[0].$message
               }}</span>

<div v-if="locale == 'la'">
        <span v-if="v$.news_description.$error" class="text-xs text-red-500" style="color: red">
          ຕ້ອງມີຊ່ອງລາຍລະອຽດຂ່າວ</span>
      </div>

      <div v-if="locale == 'en'">
        <span v-if="v$.news_description.$error" class="text-xs text-red-500" style="color: red">
          The News Description field is required</span>
      </div>

      <div v-if="locale == 'th'">
        <span v-if="v$.news_description.$error" class="text-xs text-red-500"
          style="color: red">ต้องระบุฟิลด์รายละเอียด</span>
      </div>
    </div>


    <div class="form-group mb-4">
      <label for="formGroupExampleInput">{{ $t("menu_new_link") }}</label>
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="ວິດີໂອ *"
        v-model="store.formDataNewsEdit.news_video" maxlength="100">
    </div>

 <div v-if="locale == 'la'" >
      <span v-if="v$.news_cover.$error" class="text-xs text-red-500"
        style="color: red" >
        ອັບໂຫຼດຮູບ.</span>
  </div>

  <div v-if="locale == 'en'" >
      <span v-if="v$.news_cover.$error" class="text-xs text-red-500"
        style="color: red" >
        Upload photo.</span>
  </div>

  <div v-if="locale == 'th'" >
      <span v-if="v$.news_cover.$error" class="text-xs text-red-500"
        style="color: red" >อัพโหลดรูปภาพ</span>
  </div>
          <div class="form-group mb-4 mt-3">
      <label for="exampleFormControlFile1">{{ $t("menu_new_cover") }}</label> 
      <!-- <span class="text-xs text-red-500"
        style="color:red" v-if="store.imageReq == true"> Invalid file selected</span> <span style="color: red;">{{
          $t("menu_page_new_tra_recomend_size") }}</span> -->
      <input type="file" class="form-control-file" id="exampleFormControlFileCorver"  @change="onFileChangeCorver"
        ref="fileupload" accept="image/*">
    </div>
    <div class="border p-2 mt-3">
      <p>{{ $t("menu_new_display_img") }}:</p>
 
     <template v-if="store.formDataNewsEdit.news_cover">
          <div class="row">
            <div id="image-container" class="col-md-3 col-sm-4 col-6">
              <div class="image-wrapper">
                <img  :src="coverimage(store.formDataNewsEdit.news_cover)" class="img-fluid" />
                <button @click="removeImageConver()" class="delete-button"><i class="bi bi-x-lg"></i></button>
              </div>
            </div>
          </div>
        </template>
    </div>

    <div class="form-group mb-4 mt-3">
      <label for="exampleFormControlFile1">{{ $t("menu_new_image") }}</label><span class="text-xs text-red-500" style="color:red" v-if="store.imageReq == true"> Image field is required</span>
      <span style="color: red;">{{ $t("menu_page_new_tra_recomend_size") }}</span>
      <input type="file" class="form-control-file" id="exampleFormControlFile1" multiple @change="onFileChange"
        ref="fileupload">
    </div>

    <p style="color: red;" v-if="store.getFile === true">File size exceeds the limit 2 MB. </p>

    <div class="border p-2 mt-3">
      <p>{{ $t("menu_new_display_img") }}:</p>
      <template v-if="store.formDataNewsEdit.images_list.length">
        <div class="row">
          <div id="image-container" class="col-md-3 col-sm-4 col-6" v-for="item, index in store.formDataNewsEdit.images_list" :key="index">
            <div class="image-wrapper">
              <img :src="CoverImage(item.ni_path_file)" class="img-fluid" />
              <button @click="removeImage(item.ni_id)" class="delete-button"><i class="bi bi-x-lg"></i></button>
            </div>
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
import { newTransportStore } from '@/store/newstransport'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { UploadStore } from '@/store/upload'; // import the auth store we just created
import { AlertStore } from '@/store/alert'; // import the auth store we just created
import { ref } from "vue";
import { useToast } from 'vue-toastification'
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import ApiService from '../../services/api.service';
const { locale, setLocale } = useI18n();

const toast = useToast()
const router = useRouter();
const store = newTransportStore()
const storeupload = UploadStore()
const storealert = AlertStore()



const { Clear } = AlertStore(); // use  action
const { UpdateFormNews } = newTransportStore(); // use  action
const { getFormEditNews } = newTransportStore();
const { getAlertFile } = storeToRefs(store);
const { Saveimages } = UploadStore(); // use authenticateUser action from  auth store



storealert.Clear()
store.imageReq = false;

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
     news_cover: {
      required: helpers.withMessage(
        "The  Image  field is required",
        required
      ),
      minLength: minLength(1),
    },
  };
});


const backToNews = async () => {
  router.go(-1);
}

////////////////ใส่ Url///////////



function CoverImage(i) {
  let im =  ApiService.image(i);
  return im;
}

const v$ = useVuelidate(rules, getFormEditNews);

const removeImage = async (remove) => {
//  store.formDataNewsEdit.images_list.splice(remove, 1)
  const objWithIdIndex = store.formDataNewsEdit.images_list.findIndex((obj) => obj.ni_id === remove);
  store.formDataNewsEdit.images_list.splice(objWithIdIndex, 1);
  await store.deleteimageNew(remove);

//  storeupload.formi.splice(remove, 1)
//  storeupload.data_list_image.splice(remove, 1)

}



const edit = async () => {

  v$.value.$validate();


  if (!v$.value.$error) {
    await toast.warning("ລໍຖ້າຈັກໜ່ອຍ",{
  timeout: 2000,
    });
    try {
   await store.fetchNewsIdUpload();
 await store.UploadfileNewCoverEdit();

   await store.UpdateFormNewsEdit();
   await toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ')

      setTimeout(() => {
      router.push('/news/transport');
    }, 2000);
    } catch (e) {
      await toast.error('ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ')
    }
  }
}


const onFileChange = async (event) => {

        Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    },
  });
  var input = event.target;
  var count = input.files.length;
  var index = 0;
  for (let i = 0; i < count; i++) {
   const file = event.target.files[i];
   const idxDot = file.name.lastIndexOf(".") + 1;
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
const extFile = file.name.substr(idxDot, file.name.length).toLowerCase();
if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
  store.selectedFiles.push(event.target.files[i])
} else {
          


}



  }



  await store.UploadImageNewEdit();
  await store.SaveEditNewImage();
  await store.fetchNewsIdUpload()
  v$.value.$reset();
input.value = '';

store.selectedFiles = [];
  setTimeout(() => Swal.close(), 500);

}




// const onFileChange = async (event) => {

//   var input = event.target;
//   var count = input.files.length;
//   var index = 0;
//   const maxSize = 1024 * 1024; // 2 MB in bytes

//   for (let x = 0; x < count; x++) {
//     if (event.target.files[x].size > maxSize) {    ///////////////////////File size ดักก่อน ///////////
//       store.getFile = true;
//       await toast.error('Can not Upload File')
//       const input = document.querySelector('input[type="file"]');
//       input.value = '';
//       return false;
//     }
//     store.getFile = false; ///////////////////////ถ้า ผ่านข้างบนให้ปิด alert ///////////
//   }

//   for (let i = 0; i < count; i++)     ///////////////////////เก็บ data ไปไว้ใน state ///////////
//   {
//     storeupload.formi.push(event.target.files[i]);
//   }

//   const formData = new FormData();
//   for (const i of Object.keys(storeupload.formi)) {
//     setTimeout(function (scope) {
//       formData.append('files', storeupload.formi[i])
//     }, 500);
//   }


//   // await Saveimages();

  
//   if (input.files) {
//     console.log(input.files)
//     while (count--) {
//       var reader = new FileReader();
//       console.log(reader)
      
//       reader.onload = (e) => {
        
//         storeupload.preview_list.push(e.target.result); ///////////////////////จับ Data ใส่ array ///////////
//         let a = { ni_name_file: e.target.result, ni_path_file: e.target.result }
//         storeupload.data_list_image.push(a);
       
//       }
//       storeupload.image_list.push(input.files[index]); ///////////////////////จับ Data ใส่ array ///////////
//       reader.readAsDataURL(input.files[index]); ///////////////////////อ่านไฟล์ภาพ ///////////
//       index++;
//     }
//   }
  
// }


function coverimage(i) {
  let result = i.slice(0, 6);
  if (result === "static") {
    let im = ApiService.image(i);
    return im;
  } else {
    return i;
  }
}



const onFileChangeCorver = async (event) => {
  var input = event.target;
  const file = event.target.files[0];
  const idxDot = file.name.lastIndexOf(".") + 1;
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
const extFile = file.name.substr(idxDot, file.name.length).toLowerCase();

if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            //TO DO
            const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formDataNewsEdit.news_cover = reader.result;
    };
    store.imageconver = input.files[0];
    
    reader.readAsDataURL(file);
} else {
          
  const input = document.querySelector('input[type="file"]');
  input.value = "";
    Swal.fire({
      text: 'Upload File Image PNG JPG!',
      icon: 'error',
    });
 }

};

const removeImageConver = async (remove) => {
  store.formDataNewsEdit.news_cover = ""
   store.imageconver = null
    const input = document.querySelector('input[type="file"]');
  input.value = "";

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