<template>
 <div>
      <label>{{ $t("dlt_fitter") }}:</label>
      <select class="form-control" v-model="store.dlt_code">
        <option :value="dlt_i.dlt_code" v-for="(dlt_i,index) in storeapp.dlt">
        
          <span v-if="locale == 'la'" >{{dlt_i.dlt_code}} : {{dlt_i.dlt_description_loas}}</span>
      <span v-if="locale == 'en'" >{{dlt_i.dlt_code}} : {{dlt_i.dlt_description_english}}</span>
 
        </option>
      </select>
    </div>

</template>
<script setup lang="ts">

import { th } from 'date-fns/locale';
import { storeToRefs } from 'pinia';
import { defineComponent,ref, computed } from 'vue';
import { ReportStore } from '@/store/report'; // import the auth store we just created
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useToast } from 'vue-toastification';
import { doesNotReject } from 'assert';
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();
import Swal from 'sweetalert2';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'




const toast = useToast()
const router = useRouter();
const store = ReportStore();
const storeapp = AppointStore()


const startDate = ref("");
    const endDate = ref("");
    const minEndDate = ref(""); 



    const date = ref();

// For demo purposes assign range from the current date
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
})

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `Selected date is ${day}/${month}/${year}`;
}

const search = () => {

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
</style>
