<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'
import UserCreate from '@/components/users/UserCreate.vue'

import Alert from '@/components/layout/Alert.vue';
import { AlertStore } from '@/store/alert'; // import the auth store we just created
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1]
})


const storealert = AlertStore()
const { Clear } = AlertStore(); // use  action

const store = usersStore()
const { posts } = storeToRefs(usersStore())
const { PendingForm } = storeToRefs(store); //Get Getter

const { AlertTextForm } = storeToRefs(store); //Get Getter

storealert.Clear()
</script>

<template>
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="page-meta">
                <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">{{ $t("menu_user_page") }}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ $t("menu_user_page_create") }}</li>
                    </ol>
                </nav>
            </div>
            <Alert></Alert>
            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <UserCreate></UserCreate>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style></style>