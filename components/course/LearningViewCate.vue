<template>
          <div class="widget-content widget-content-area br-8 p-3">
              <div class="widget-header">
                <div class="row pt-3">
                  <div class="col-xl-8 col-sm-12 col-7">
                    <h3>{{ $t("menu_group_add") }}</h3>
                  </div>
                  <div class="col-xl-4 col-sm-12 col-5" style="
    text-align: right;
">
                    <button type="button" class="btn btn-primary"   @click="MyGroup(id)" v-if="user_type == '1'">
                      
                      {{ $t("menu_view_table_title_permi") }}
                    </button>
                  </div>       
                </div>

               
                <div class="row pt-3">
                  <span class="border-bottom"></span>
                </div>
              </div>

              <div class="row pl-3 pt-3">
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">  {{ $t("menu_view_table_name_group") }}</th>
                        <th class="text-center" scope="col">  {{ $t("menu_view_table_total_group") }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr  v-for="(item, index) in store.clustercourse">
                        <td>{{index + 1}}</td>
                        <td>
                          
                       
                          {{ locale == "la" ? item.cg_name_lo : item.cg_name_eng }}
                        </td>
                        <td class="text-center">{{item.cg_amount_random}}</td>
                      </tr> 
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
</template>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { CourseStore } from "@/store/course";
import { LessonStore } from "@/store/lesson";
import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import 'vue-select/dist/vue-select.css';

import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";

import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
const { locale, setLocale } = useI18n();

const toast = useToast();
const store = CourseStore();
defineProps({
  id: {
    type: String,
    required: false,
    default: () => ({}),
  },
  user_type: {
    type: Number,
    required: false,
    default: () => ({}),
  },
});



const router = useRouter();

const MyGroup = async (id) => {
  await router.push("/learning/group/" + id);
}


</script>


