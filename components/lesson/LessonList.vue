<template>
  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto">

    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th class="text-center" scope="col">{{ $t("lesson_qui") }}</th>
                <th class="text-center" scope="col">{{ $t("lesson_ans") }}</th>
                <th class="text-center" scope="col">{{ $t("lesson_pic") }}</th>
              
                <th class="text-center" scope="col">{{ $t("less_ac") }}</th>
            </tr>
        </thead>


        <tbody> 
            <tr  v-for="(item,index) in store.lesson" :key="item.cs_id">
                <td>{{ (store.formlesson.page * store.formlesson.per_page) - (store.formlesson.per_page -  index) +  1 }}</td>
                
                <td>
                  <span class="table-inner-text">
                    {{item.cs_name}}
                  </span>
                </td>
                <td>
                  <span class="table-inner-text">
                    {{item.cs_description}}
                  </span>
                </td>
                <td class="text-center">
            
            <img :src="image(item.cs_cover)" class="img-fluid" width="80" height="80" v-if="item.cs_cover">
                  <img src="../../assets/images/no_photo.jpg" class="img-fluid" width="80" height="80" v-else>
          </td>
          
          <td>    
             <div class="action-btns">
     
                <a
                  href="javascript:void(0);"
                  class="action-btn btn-delete bs-tooltip"
                  @click="del(item.cs_id)"
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

    <div>
      
      <div class="dt--pagination" v-if="store.total_page > 1">
        <div class="dataTables_paginate paging_simple_numbers" id="zero-config_paginate">
          <ul class="pagination">
            <li class="paginate_button page-item previous" id="zero-config_previous">
              <a href="#" aria-controls="zero-config" data-dt-idx="0" tabindex="0" class="page-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="feather feather-arrow-left">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg></a>
            </li>
            <li class="paginate_button page-item " v-for="page in store.total_page" :key="page">
              <a href="#" aria-controls="zero-config" data-dt-idx="1" tabindex="0" class="page-link"  @click="setCurrentPageclick(page)"
              >
                {{ page }}</a>
            </li>
            <li class="paginate_button page-item next" id="zero-config_next"><a href="#" aria-controls="zero-config"
                data-dt-idx="4" tabindex="0" class="page-link"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                  height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg></a></li>
          </ul>
        </div>
      </div>
    </div>
</div>


            <!-- pageinate -->

</template>


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { LessonStore } from "@/store/lesson";
import { useToast } from "vue-toastification";
import ApiService from '../../services/api.service';
import moment from "moment-timezone";
const router = useRouter();

const toast = useToast();
const store = LessonStore();
const auth = useAuthStore()



const del = async (item) => {

  store.GetopenModal = true
  store.course_del = router.currentRoute.value.params.id
await store.selectlessId(item)
//await store.fetchLessonId(router.currentRoute.value.params.id)
};
const edit = async (item) => {

  store.GetopenModalEdit = true
  await store.fetchLessonIdedit(item)
};



const setCurrentPageclick = async (page) => {
  await store.setCurrentPage(page)
  await store.fetchLessonId(router.currentRoute.value.params.id)
  
//  await store.fetchNewTransport()
};


 

function goToPage(page) {

}


function coverttime(date) {
  const datetime = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDatetime = datetime.toLocaleString(undefined, options);

  return formattedDatetime;
}

function image(i) {

  let im =  ApiService.image(i);
  return im;
}
</script>
<style>
.dt--pagination {
  float: right;
}


/* .modal-content {
  background-color: white;
  padding: 20px;
  width: 70%;
} */

/* @media only screen and (min-width: 576px) {

.modal-content {
background-color: white;
padding: 20px;
width: 100%;
}
} */

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
}

</style>