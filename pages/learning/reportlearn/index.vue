


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { LessonStore } from '@/store/lesson'
import { useAuthStore } from '@/store/auth'
import LessonReport from '@/components/lesson/LessonReport.vue'


import { useToast } from 'vue-toastification';
import { ref } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2]
})

const auth = useAuthStore()
const store = LessonStore()




const toast = useToast()




  


  
</script>

<template>
 
  <div id="content" class="main-content">
            <div class="layout-px-spacing">
              <div class="page-meta">
                        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">{{ $t("menu_report") }} </a></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ $t("menu_report_exam") }}</li>
                            </ol>
                        </nav>
                    </div>
            
            <LessonReport></LessonReport>
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