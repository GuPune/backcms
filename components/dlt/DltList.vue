<template>

  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <input id="t-text" type="text" name="txt" placeholder="ຊອກຫາ" class="form-control" required=""
      v-model="store.searchDa" @keyup="searchData"  maxlength="20"/>
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto">
      <select class="form-select form-select" aria-label="Default select example" @change="selecttype($event)">
        <option value="">

      <span v-if="locale == 'la'" >{{ $t("all") }}</span>
      <span v-if="locale == 'en'" >{{ $t("all") }}</span>
      <span v-if="locale == 'th'" >{{ $t("all") }}</span>
          <span></span>
          </option>
        <option value="1">
      <span v-if="locale == 'la'" >{{ $t("admin") }}</span>
      <span v-if="locale == 'en'" >{{ $t("admin") }}</span>
      <span v-if="locale == 'th'" >{{ $t("admin") }}</span>
        </option>
        <option value="2">
     <span v-if="locale == 'la'" >{{ $t("officer") }}</span>
      <span v-if="locale == 'en'" >{{ $t("officer") }}</span>
      <span v-if="locale == 'th'" >{{ $t("officer") }}</span>
        </option>
        <option value="3">
  <span v-if="locale == 'la'" >{{ $t("population") }}</span>
      <span v-if="locale == 'en'" >{{ $t("population") }}</span>
      <span v-if="locale == 'th'" >{{ $t("population") }}</span>

        </option>
      </select>
    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      <select class="form-select form-select" aria-label="Default select example" @change="selectshowdata($event)">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  </div>
  
  <div class="table-responsive">
    <table id="example" class="table table-bordered" style="width:100%">
      <thead>
        <tr>
          <th>
            {{ $t("menu_dlt_title_manage_index") }}
            <!-- <input type="checkbox"  v-model="store.isAllSelected" @click="selectAll"> -->
          </th>
          <th @click="sortList('id')">{{ $t("menu_dlt_title_manage_name") }} &#8597;</th>
          <!-- <th @click="sortList('user_name')">ยูสเซอร &#8597;</th> -->
          <!-- <th @click="sortList('user_email')">อีเมล &#8597;</th> -->
          <th @click="sortList('user_phone')">{{ $t("menu_dlt_title_manage_type") }}</th>
          <th >{{ $t("menu_dlt_title_manage_phone") }} &#8597;</th>
         
          <th>{{ $t("menu_dlt_title_manage_update") }}</th>
          <th class="no-content">{{ $t("menu_dlt_title_manage_action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user,index) in posts.data" :key="user.user_id">
          <!-- <td><input type="checkbox" v-model="store.selected" :value="user" number></td> -->
          <td>{{ index + 1 }}</td>
          <td>{{ user.user_firstname }} {{ user.user_lastname }}</td>
          <!-- <td>{{ user.user_name }}</td> -->
          <!-- <td>{{ user.user_email }}</td> -->
          <td v-if="user.user_type == 1"> {{ $t("menu_user_c_type_user_superadmin") }}</td>
          <td v-else-if="user.user_type == 2">  {{ $t("menu_user_c_type_user_admin") }}</td>
          <td v-else>{{ $t("menu_user_c_type_user_user") }}</td>
          <td>{{ user.user_phone }}</td>
       
          <!-- <td>{{ coverttime(user.udp_date) }}</td> -->
          <td>{{ format(user.udp_date) }}</td>
             <td><button type="button" class="btn btn-primary btn-sm" @click="choose(user.user_id)">{{ $t("menu_dlt_title_manage_action") }}</button> </td>
      
        </tr>
      </tbody>
    </table>
    <div>
      <div class="dt--pagination" v-if="store.total_filter > store.limit_page">
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
            <li class="paginate_button page-item " v-for="page in posts.total_page" :key="page">
              <a href="#" aria-controls="zero-config" data-dt-idx="1" tabindex="0" class="page-link"
                @click="setCurrentPageclick(page)">
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


const router = useRouter();
const toast = useToast()
const store = usersStore()
const { posts } = storeToRefs(usersStore())
const { deleteItem } = usersStore();//Action
const { selectall } = usersStore(); //Action
const { selectone } = usersStore();//Action
const { setCurrentPage } = usersStore();//Action
const { sortLists } = usersStore();//Action
const { selectentires } = usersStore();//Action
const { selecttypes } = usersStore();//Action

const { getSelect } = storeToRefs(store); //Get Getter
const { getSelectALL } = storeToRefs(store); //Get Getter
const { getPaginate } = storeToRefs(store); //Get Getter
const { search } = storeToRefs(store); //Get Getter

await store.fetchUsers()

const del = async (id) => {
  await deleteItem(id);
  await store.fetchUsers()
};

const choose = async (id) => {
  router.push({ path: 'dltmanage/'+id})
};

const searchData = async () => {
  await store.fetchUsers()
};

const selchk = async (x) => {
  await selectone(x);
};

const selectAll = async () => {
  await selectall();
};

const setCurrentPageclick = async (page) => {
  await setCurrentPage(page)
  await store.fetchUsers()
};


const selectshowdata = async (x) => {
  await selectentires(x.target.value);
  await store.fetchUsers()
};

const selecttype = async (item) => {
  await selecttypes(item.target.value);
  await store.fetchUsers()
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

const format = (time) => {
  return moment(time).format("DD/MM/YYYY HH:mm");
};


</script>
<style>.dt--pagination {
  float: right;
}</style>