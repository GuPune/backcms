<template>

    <loading v-model:active="store.isLoaddingsave" :can-cancel="true" 
                    />


                    <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <h4 class="">{{$t('course_subjects')}}</h4>
    </div>
  </div>

  <div class="row layout-top-spacing">
    <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
 <button type="button" class="btn btn-primary" style="width: 100%; height: 100%; margin-top: auto;
" @click="ShowModalAdd">{{$t('course_subject_add')}}</button>
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
     
      
    </div>

    <div class="col-xl-1 col-lg-3 col-md-3 col-sm-3 mb-4">
    
    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
     
    </div>

  </div>
      <div class="row mb-4 g-3">
        <div class="table-responsive">
    <table class="table table-hover table-bordered" v-if="stores.mycondition.length > 0">
        <thead>
            <tr>
                <th class="checkbox-area" scope="col">
                    <div class="form-check form-check-primary">
                       #
                    </div>
                </th>
                <th scope="col">{{$t('course_subject')}}</th>
                <th scope="col">{{$t('course_num_lesson')}}</th>
                <th scope="col">{{$t('course_num_question')}} </th>

                <th scope="col"> - </th>
            </tr>
        </thead>
        <tbody>
      
            <tr v-for="(item, index) in stores.mycondition" :key="item.cg_id">
              <td>{{ index + 1 }}</td>
              
                <td>{{ item.cg_id }} - {{item.cg_name}}</td>
                <td>{{item.cc_value_a}}</td>
                <td>{{item.cc_value_b}}</td>
                <td>
                  <div class="action-btns"><a
      href="javascript:void(0);"
      class="action-btn btn-delete bs-tooltip"
      @click="removecondition(item)"
      data-toggle="tooltip"
      data-placement="top"
      aria-label="Delete"
      data-bs-original-title="Delete"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-trash-2"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        ></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </a>
  </div></td>
            </tr>
        </tbody>
    </table>

    <table class="table table-hover table-bordered" v-else>
        <thead>
            <tr>
                <th class="checkbox-area" scope="col" style="text-align: center;">
                    <div class="form-check form-check-primary">
                       <span >ບໍ່ມີເນື້ອໃນອົງປະກອບ</span>
                    </div>
                </th>
            </tr>
        </thead>
      
    </table>
</div>


     </div>


 
    
      
    </template>
    <script setup lang="ts">
    import { storeToRefs } from "pinia";
    import { defineComponent } from "vue";
    import { CourseStore } from "@/store/course"; // import the auth store we just created
    import { LessonStore } from "@/store/lesson";
    import { useVuelidate } from "@vuelidate/core";
    import ApiService  from "../../services/api.service";
    
    import Swal from 'sweetalert2';
    import {
      required,
      email,
      sameAs,
      minLength,
      helpers,
    } from "@vuelidate/validators";
    import { useToast } from "vue-toastification";
    import { useI18n } from "vue-i18n";
    import Loading from 'vue-loading-overlay';import 'vue-loading-overlay/dist/css/index.css';
    const { locale, setLocale } = useI18n();
    
    const toast = useToast();
    const router = useRouter();
    const store = LessonStore();
    const stores = CourseStore();
 

    
const { selectentireslesson } = LessonStore(); //Action
const { selectentiresentires } = LessonStore(); //Action

await stores.paginatedItems();
const selectshowdata = async (sel) => {
  await selectentiresentires(sel.target.value);
  await store.fetchLessonlist();
};

const searchData = async () => {
//  await store.fetchLessonlist();
await store.paginatedItemsSeleteFitter()
};
const selectAllRows = async () => {
    await store.SeleectAllLessonlist();
};

const remove = async (item) => {
    await store.RemoveSelect(item);
     await store.paginatedItemsSeleteFitter()
     await store.ManageSelectRemove()
 await store.fetchLessonlist() 
 //  await store.paginatedItemsCourse()
};

const removecondition = async (item) => {


const index = stores.mycondition.indexOf(item);
      if (index !== -1) {
        stores.mycondition.splice(index, 1); // Remove value if already present
      } else {
        
      }
}

const deleteSelect = async () => {
 
  if(store.selected.length == 0){
    toast.error('ບໍ່ມີບົດຮຽນ')
  }else {
    await store.deleteSelecte()
  await store.paginatedItemsSeleteFitter() 
await store.ManageSelectRemove()
 await store.fetchLessonlist() 
  toast.success("ຍົກເລີກສຳເລັດ");

  }

};




const Previou = async () => {

if(store.formselect.page == 1){

}else {
  
  await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  store.formselect.page -= 1
  await store.paginatedItemsSeleteFitter() 
}
};
const Nextu = async () => {
if(store.formselect.page == store.formselect.total_page){

}else {
  await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  store.formselect.page += 1
   await store.paginatedItemsSeleteFitter() 
}


};

const selectshowdata_ch = async (cg) => {
   store.formselect.page = 1;
if(cg.target.value == 0){
store.formselect.cg_name = ""
}
if(cg.target.value != 0){
  store.formselect.cg_name = cg.target.value
}




await store.paginatedItemsSeleteFitter()
// await store.fetchLessonlist() 
};




const ShowModalAdd = async () => {

stores.openModalCreateCon = true;
}
const validatePNumberSelect = async (evt) => {
  
  const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const keyPressed: string = evt.key;
  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault()
  
  }



  if (store.formselect.page == "") {
    store.selectlesson_form.page = 1;
  //  await store.fetchLessonlist();
 await store.paginatedItemsSeleteFitter()
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else if(store.formselect.page > store.formselect.total_page){
    store.formselect.page = store.formselect.total_page;

     await store.paginatedItemsSeleteFitter()
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }else {

    store.pending = true;
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
   await store.paginatedItemsSeleteFitter()
  }
 // await stores.paginatedItems() 
}
 
    

    function coverimage(i) {
      let result = i.slice(0, 6);
      if (result === "static") {
        let im = ApiService.image(i);
        return im;
      } else {
        return i;
      }
    }
    
    function image(i) {
      var x = null;
      if (i) {
        const usingSplit = i.split(",");
        var x = usingSplit[0];
      } else {
        var x = "static/upload/2023/9/files-riRE6hEnHI.jpg";
      }
      let im =  ApiService.image(x);
      return im;
    }
    
    
    </script>
    <style>
    
    
    .video-container {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%; /* 16:9 aspect ratio (change this value as per your video's aspect ratio) */
    }
    
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    
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
    
    