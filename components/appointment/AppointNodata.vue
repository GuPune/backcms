<template>
  <div class="row p-3">
    <div class="row d-flex justify-content-end mb-2 gap-2 filter">
      <div class="col-xl-2 col-lg-4 col-sm-4"></div>
      <div class="col-xl-2 col-lg-4 col-sm-4"></div>
    </div>
    <table class="table">
      <thead>
        <tr>
      <td style="text-align:center">  
      {{ $t("user_app_nodata") }}
      </td>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
    <div></div>
  </div>

  <!-- <div v-if="store.isDelAP" class="modal">
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
        <button type="button" class="btn" data-bs-dismiss="modal" @click="closeModal">Cancel</button>
        <button type="button" class="btn btn-danger" data-remove="task" @click="deletel()">Delete</button>
      </div>
    </div>
  </div> -->
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { AppointStore } from "@/store/appoint"; // import the auth store we just created
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment-timezone";
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();

const toast = useToast();
const router = useRouter();
const store = AppointStore();

const date = ref(new Date());

const { selectentiresap } = AppointStore(); //Action

const backToUser = async () => {
  router.go(-1);
};

const searchData = async () => {
  await store.FetchAP();
};

const selectshowdata = async (x) => {
  await selectentiresap(x.target.value);
  await store.FetchAP();
};

const del = async (item) => {
  store.ardel_id = item.ar_id;
  (store.del_ap = item.ap_id),
    (store.deluser_id = item.user_id),
    (store.isDelUser = true);
};


</script>

<style>
.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
}
#image-container img {
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
.selectFilter {
}
.searchBar {
}
.filter {
  flex-wrap: wrap;
}

.dt--pagination {
  float: right;
}
</style>
