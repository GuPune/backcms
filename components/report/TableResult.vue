<template>

  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <input id="t-text" type="text" name="txt" placeholder="ຊອກຫາ" class="form-control"
      v-model="store.search" @keyup="searchData" />
    </div>
  

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      <select class="form-select form-select" aria-label="Default select example" @change="selectshowdata($event)">
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
    </div>
  </div>
  <div class="table-responsive">
    <table id="example" class="table table-bordered" style="width:100%">
      <thead>
        <tr>

         
          <th>
            {{ $t("table_result_score") }}
          </th>
            <th>
              {{ $t("table_result_type") }}
          </th>
            <th>
              {{ $t("table_result_status") }}
          </th>
            <th>
              {{ $t("table_result_name") }}
          </th>
            <th>
              {{ $t("table_result_phone") }}
          </th>
            <th>
              {{ $t("table_result_iden") }}
          </th>
          
            <!-- <th>
        user_img
          </th> -->

        </tr>
      </thead>
      <tbody>
     
        <tr v-for="result in store.reportresult">
        <td>
          {{result.mr_score}}
        </td>
         <td>
          {{result.mr_learn_type}}
        </td>
         <td>
          {{result.mr_status}}
        </td>
         <td>
          {{result.user_firstname}} {{result.user_lastname}}
        </td>
         <td>
          {{result.user_phone}}
        </td>
         <td>
          {{result.identification_number}}
        </td>
        
       
         <!-- <td>
          {{user.user_img}}
        </td> -->
      </tr>
      
      </tbody>
    </table>
    <div>
      <div class="dt--pagination" v-if="store.total_page > 1" >
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
              <a href="#" aria-controls="zero-config" data-dt-idx="1" tabindex="0" class="page-link"  :class="{ bgc: page === store.formreport.page }"  @click="setCurrentPageclick(page)">
                {{ page }}</a>
            </li>
            <li class="paginate_button page-item next" id="zero-config_next">
              <a href="#" aria-controls="zero-config"
                data-dt-idx="4" tabindex="0" class="page-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24"
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
</template>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import Paginate from "vuejs-paginate-next";
import { useToast } from 'vue-toastification'
import moment from "moment-timezone";
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();

const store = ReportStore();








const searchData = async () => {
 // await store.fetchUsers()
 store.page = 1;

   await store.FitterResult()
};

const selchk = async (x) => {
  await selectone(x);
};

const selectAll = async () => {
  await selectall();
};

const setCurrentPageclick = async (page) => {
  store.page = 1;
  await store.setCurrentPage(page)
  await store.FitterResult()
};
const format = (time) => {
  return moment(time).format("DD/MM/YYYY HH:mm");
};

const selectshowdata = async (x) => {
  store.formreport.page = 1;
  await store.selectentires(x.target.value);
  await store.FitterResult()
};

const selecttype = async (item) => {
  await selecttypes(item.target.value);
  await store.FitterResult()
};

const sortList = async (sortBy) => {
  await sortLists(sortBy)

};

function coverttime(date) {
  const datetime = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedDatetime = datetime.toLocaleString(undefined, options);

  return formattedDatetime;

}




</script>
<style>.dt--pagination {
  float: right;
}
.bgc{
 
  color: #0a58ca;
}
</style>