<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import Lessonlist from '@/components/lesson/LessonList.vue'
import LessonCreate from '@/components/lesson/LessonCreate.vue'
import LessonEdit from '@/components/lesson/LessonEdit.vue'
import { useAuthStore } from '@/store/auth'
import { LessonStore } from '@/store/lesson'
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2],
})
const router = useRouter();
const auth = useAuthStore()



const store = LessonStore()

let lesson = await store.fetchLessonId(router.currentRoute.value.params.id)





store.formcreatelesson.user_id = auth.user_id
store.user_id = auth.user_id


const OpenFormInsert = async () => {
  await store.OpenFormInser()
};

const dele = async () => {
  store.GetopenModal = false;
await store.deletelessId()
await store.fetchLessonId(router.currentRoute.value.params.id)
};

const closeModal = async () => {
  store.GetopenModal = false;

};

const backtoLean = async () => {
  await router.push('/learning');
};




</script>

<template>

    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="page-meta">
                <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">{{ $t("title_lesson") }} </a></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ $t("title_lesson_t") }}</li>
                    </ol>
                </nav>
            </div>


            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
                          <div class="widget-header">                                
                                    <div class="row">
                                        <div class="col-xl-10 col-md-10 col-sm-10 col-10">
                                            <h4>ບົດຮຽນ</h4>
                                        </div>
                                        <div class="col-xl-2 col-md-2 col-sm-12 col-2" style="text-align: center;">
                                          <button type="button" class="btn btn-primary additem _effect--ripple waves-effect waves-light" @click="backtoLean()">
      {{ $t("backto_lean") }}
    </button>   
   </div> 
  </div>
                                </div>
                            <Lessonlist></Lessonlist>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>




    <div v-if="store.GetopenModal" class="modal">

    <div class="modal-content modal-dialog modal-xl" id="deleteConformationLabel">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">ຕ້ອງການລຶບບົດຮຽນນີ້ບໍ?</h5>
      </div>

      <div class="modal-footer">
        <button class="btn btn btn-light-dark" data-bs-dismiss="modal" @click="closeModal()">
          <i class="flaticon-cancel-12"></i> {{ $t("cancel") }}</button>
        <button type="button" class="btn btn-primary" @click="dele()">{{ $t("delete") }}</button>
      </div>
    </div>
    </div>

    <LessonCreate></LessonCreate>
    <LessonEdit></LessonEdit>
   
</template>


<style></style>