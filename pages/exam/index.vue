


<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { ExamStore } from '@/store/exam'
import { useAuthStore } from '@/store/auth'
import ExamList from '@/components/exam/ExamList.vue'
import ExamCreate from '@/components/exam/ExamCreate.vue'
import ExamEdit from '@/components/exam/ExamEdit.vue'
import { useToast } from 'vue-toastification';
import { required, email, sameAs, minLength, helpers, } from '@vuelidate/validators';
import Loading from 'vue-loading-overlay';import 'vue-loading-overlay/dist/css/index.css';


definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2],
})


const toast = useToast()
const store = ExamStore()
await store.isLoading == true;
const auth = useAuthStore()
const profile = await auth.getProfile();

store.ResetFetch();
store.formexam.user_id = auth.user_id
store.formexamedit.user_id = auth.user_id
store.user_id = auth.user_id


const { GetopenModal } = storeToRefs(store); //Get Getter
const { GetopenModalCreate } = storeToRefs(store); //Get Getter
const { OpenFormInser } = ExamStore();//Action
const { GetExamDelId } = storeToRefs(store); //Get Getter
const { deleteExam } = ExamStore();//Action



const closeModal = async () => {
    await store.closeModal()
    store.isOpen = false;
};

const Deleteexam = async (item) => {
    const a = await deleteExam(item);
    await store.fetchExamlist()

    toast.success("ລຶບຂໍ້ມູນສຳເລັດ");
};


</script>

<template>
       <loading v-model:active="store.isLoading" :can-cancel="true" 
                />
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="page-meta">
                <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">{{ $t("menu_page_exam") }} </a></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ $t("menu_page_exam_all") }}</li>
                    </ol>
                </nav>
            </div>
         

            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <div class="widget-header">
                                <!-- <div class="row">
                                    <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                        <button class="btn btn-primary mb-2 me-4" @click="OpenFormInsert()">{{ $t("menu_exam_add") }}</button>
                                    </div>
                                </div> -->
                            </div>
                            <ExamList></ExamList>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div v-if="GetopenModal" class="modal">
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
                <h5 class="modal-title" id="exampleModalLabel">{{ $t("delete_record") }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="">{{ $t("delete_record_t") }}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn" data-bs-dismiss="modal" @click="closeModal">{{ $t("delete_record_cancel") }}</button>
                <button type="button" class="btn btn-danger" data-remove="task"
                    @click="Deleteexam(GetExamDelId)">{{ $t("delete_record_modal") }}</button>
            </div>
        </div>
    </div>
    <ExamCreate></ExamCreate>
    <ExamEdit></ExamEdit>
</template>

<style></style>