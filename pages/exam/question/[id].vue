


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { ExamquestionStore } from "@/store/examquestion";
import { useToast } from "vue-toastification";
import ExamqList from "@/components/examquestion/ExamqList.vue";
import ExamqPage from "@/components/examquestion/ExamqPag.vue";
import { useAuthStore } from '@/store/auth'
import ApiService from '../../../services/api.service';
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { useRoute } from "vue-router";
import Loading from "@/components/layout/Success.vue";
import Swal from 'sweetalert2';
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2],
})


const toast = useToast();
const store = ExamquestionStore();
const auth = useAuthStore()
store.user_id = auth.user_id


const { GetopenModalDelete } = storeToRefs(store); //Get Getter
const { deleteExamq } = ExamquestionStore(); //Action
const { Pending } = storeToRefs(store); //Get Getter

const route = useRoute();
const router = useRouter();


store.em_id = route.params.id;


store.eq = null;
  store.total_page = null;
  store.choicelist = [];

  Swal.fire({
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    },
  });  
const Examlistq = await store.fetchExamquestionlist();

if(Examlistq == true){
  setTimeout(() => Swal.close(), 500);
}else {
  setTimeout(() => Swal.close(), 500);
}

const em_id = localStorage.getItem('em_id');

if(!em_id){
  router.push("/exam");
}



const goToCreatePage = async () => {
 // localStorage.setItem("em_id", store.exam[0].em_id);
 // localStorage.setItem("em_name", store.exam[0].em_name);
  router.push("/exam/question/create/");
};

const goToCreatePageNew = async () => {
  
  localStorage.setItem("em_id", store.exam[0].em_id);
 localStorage.setItem("em_name", store.exam[0].em_name);
  router.push("/exam/question/create/");
};

const goToEditPage = async () => {
  localStorage.setItem("em_id", store.exam[0].em_id);
  localStorage.setItem("em_name", store.exam[0].em_name);

  localStorage.setItem("cachedData", JSON.stringify(store.eq));
  localStorage.setItem("choice", JSON.stringify(store.choicelist));

  router.push("/exam/question/edit/");
};
const goToExmPage = async () => {
  router.push("/exam");
};

const deleteItem = async (item) => {
  store.modaldelete = true;
};
const closedeleteItem = async () => {
  store.modaldelete = false;
};
const DeleteEq = async (item) => {
  const del = await deleteExamq(item);
  await toast.success("ລຶບຂໍ້ມູນສຳເລັດ");
  store.modaldelete = false;
  await store.fetchExamquestionlist();
};
function image(i) {

  let im =  ApiService.image(i);

  return im;
}
</script>

<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
         <li class="breadcrumb-item"><a href="#">{{ $t("menu_page_exam") }} </a></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ $t("menu_exam_all_bt_edit_exam") }}</li>
          </ol>
        </nav>
      </div>

      <div class="middle-content container-xxl p-0">
        <div class="row invoice layout-top-spacing layout-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <div class="widget-content widget-content-area br-8 p-3">
              <ExamqList></ExamqList>
            </div>
          </div>

          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="doc-container">
              <div class="row">
                <div class="col-xl-9" v-if="store.eq">
                  <div class="invoice-container">
                    <div class="invoice-inbox">
                      <div id="ct" class="">
                        <div class="invoice-00001">
                          <div class="content-section" v-if="store.eq">
                            <div class="inv--head-section inv--detail-section">
                              <div class="row">
                                <div class="col-sm-6 col-12 mr-auto">
                                  <div class="d-flex">
                                    <img class="company-logo"  v-if="store.eq.eq_image" :src="image(store.eq.eq_image)" alt="company" />
                                    <h3 class="in-heading align-self-center">
                                      {{ $t("menu_exam_proposition") }} {{ store.eq.eq_name }}
                                    </h3>
                                  </div>
                                </div>

                                <div class="col-sm-6 text-sm-end">
                                  <p class="inv-list-number mt-sm-3 pb-sm-2 mt-4">
                                    <span class="inv-title">{{ $t("menu_exam_answer") }}  : </span>
                                    <span class="inv-number">{{
                                      store.eq.eq_answer
                                    }}</span>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="inv--detail-section inv--customer-detail-section">
                              <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 align-self-center"
                                  v-for="(exams, x) in store.exam" :key="x">
                                  <p class="inv-to">
                                    
ຫຼັກສູດ : {{ exams.em_name }}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="inv--product-table-section">
                              <div class="table-responsive" v-if="store.choicelist">
                                <table class="table">
                                  <thead class="">
                                    <tr>
                                      <th scope="col">{{ $t("menu_exam_index") }}</th>
                                      <th scope="col">{{ $t("menu_exam_content") }}</th>
                                      <th class="text-end" scope="col">
                                        {{ $t("menu_exam_picture") }}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(item, index) in store.choicelist" :key="index">
                                      <td>{{ index + 1 }}</td>
                                      <td>{{ item.ec_name }}</td>
                                      <td class="text-end" v-if="item.ec_image">
                                   
                                        <img :src="image(item.ec_image)" class="img-fluid" width="80" height="80" />
                                      </td>
                                         <td class="text-end" v-else>
              
                                          <img src="../../../assets/images/no_photo.jpg" class="img-fluid" width="80" height="80" >
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div class="no-d" v-else>No data</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3" v-if="store.total_page > 0">
                  <div class="invoice-actions-btn">
                    <div class="invoice-action-btn">
                      <div class="row">
                        <div class="col-xl-12 col-md-3 col-sm-6">
                          <a class="btn btn-success btn-send" @click="goToExmPage()">{{ $t("menu_exam_back") }}</a>
                        </div>
                        <div class="col-xl-12 col-md-3 col-sm-6">
                          <a class="btn btn-primary btn-print" @click="goToCreatePageNew()">{{ $t("menu_exam_add_ex") }}</a>
                        </div>
                        <div class="col-xl-12 col-md-3 col-sm-6">
                          <a class="btn btn-dark btn-download" @click="goToEditPage()">{{ $t("menu_exam_edit") }}</a>
                        </div>
                        <div class="col-xl-12 col-md-3 col-sm-6">
                          <a class="btn btn-danger btn-edit" @click="deleteItem()">{{ $t("menu_exam_del") }}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-12" v-else>
                  <div class="invoice-actions-btn">
                    <div class="invoice-action-btn">
                      <div class="row">
                        <div class="col-xl-12 col-md-3 col-sm-6">
                          <a href="javascript:void(0);" class="btn btn-danger btn-send"
                            @click="goToExmPage()">{{ $t("menu_exam_back") }}</a>
                        </div>
                        <div class="col-xl-12 col-md-3 col-sm-6">
                          <a class="btn btn-primary btn-print" @click="goToCreatePage()">{{ $t("menu_exam_add_ex_form") }}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
          

   

            <!-- <div class="col-xl-9 col-lg-9 col-sm-9 layout-spacing">
            <div class="widget-content widget-content-area br-8 p-3">
              <ExamqPage></ExamqPage>
            </div>
          </div>
             -->
        </div>
      </div>
    </div>
  </div>

  

  <div v-if="GetopenModalDelete" class="modal">
    <div class="modal-content" id="deleteConformationLabel">
      <div class="modal-header">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-trash-2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </div>
        <h5 class="modal-title" id="exampleModalLabel">Delete the task?</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p class="">
          If you delete the task it will be gone forever. Are you sure you want
          to proceed?
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-bs-dismiss="modal" @click="closedeleteItem">
          {{ $t("cancel") }}
        </button>
        <button type="button" class="btn btn-danger" data-remove="task" @click="DeleteEq(store.eq)">
          {{ $t("delete") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.no-d {
  text-align: center;
  border: 3px solid green;
}
</style>