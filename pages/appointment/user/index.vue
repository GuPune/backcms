<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { AppointStore } from '@/store/appoint'
import { useAuthStore } from '@/store/auth';
import AppointViewUser from '@/components/appointment/AppointViewUser.vue';
import ReserveFitter from '@/components/appointment/ReserveFitter.vue';
import AppointNodata from '@/components/appointment/AppointNodata.vue';

import { useToast } from 'vue-toastification';

import { AlertStore } from '@/store/alert'; // import the auth store we just created
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2],
})


const route = useRoute();
const store = AppointStore()
const auth = useAuthStore()
const toast = useToast()
store.user_id = auth.user_id




// let fetchapp = await store.fetchAppointmentId();
// if(fetchapp == false){
//     toast.error('Information cannot be displayed')
// }

const closeModal = async () => {
await store.closeModal()
 };

 const deletel = async () => {
let delte = await store.deleteRerve()

if(delte == 200){
  await store.FetchAPUser();
store.isDelUser = false;
toast.success('ລຶບຂໍ້ມູນສຳເລັດ');
}
if(delte == 204){
  store.isDelUser = false;
  toast.error('ບໍ່​ສາ​ມາດ​ຖືກ​ລົບ​ໄດ້​ເນື່ອງ​ຈາກ​ວ່າ​ມັນ​ຜ່ານ​ເວ​ລາ​ທີ່​ກໍາ​ນົດ​ໄວ້​.');
}
if(delte == 500){
  store.isDelUser = false;
  toast.error('ຕິດຕໍ່ admin.');
}


//await store.fetchUse();
 };
</script>

<template>
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="page-meta">
                <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                     <li class="breadcrumb-item"><a href="#">{{ $t("menu_app_view") }}</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{ $t("menu_app_view_list") }}</li>
                    </ol>
                </nav>
            </div>
            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                      <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <ReserveFitter></ReserveFitter>
                        </div>
                    </div>
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing" v-if="store.app_user.length > 0">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <AppointViewUser></AppointViewUser>
                        </div>
                    </div>

                      <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing" v-else>
                        <div class="widget-content widget-content-area br-8 p-3">
                            <AppointNodata></AppointNodata>
                        </div>
                    </div>
                   
                </div>

                   
            </div>

        </div>
    </div>

    <div v-if="store.isDelUser" class="modal">
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
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal">
       
        </button>
      </div>
      <div class="modal-body">
        <p class="">{{ $t("delete_record_t") }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-bs-dismiss="modal" @click="closeModal">{{ $t("delete_record_cancel") }}</button>
        <button type="button" class="btn btn-danger" data-remove="task" @click="deletel()">{{ $t("delete_record_modal") }}</button>
      </div>
    </div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  width: 50%;
}

button {
  margin-top: 10px;
}
</style>