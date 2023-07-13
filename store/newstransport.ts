import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';




export const newTransportStore = defineStore('newstransport', {
  state: () => ({
    locale:true,
    load:true,
    isOpen: false,
    AlertText:null,
    datanewstransport:{},
    pending:false,
    pending_form:false,
    sortedbyASC: true,
    selected: [],
    checkboxes: [], // Array to store checkbox values
    isAllSelected: false,
    count: 0,
    page:1,
    per_page:2,
    total_page:null,
    limit_page:null,
    current_page:null,
    total_filter:null,
    total:null,
    itemsPerPage: 3,
    news_id:null,

  
  }
     
),


  getters: {
    data(state) {
   
    },
    FormEdit(state) {
      return state.formDataEdit;
    },
    GetopenModal(state) {
      return state.isOpen;
    },
    GetopenModal_ID(state) {
      return state.news_id;
    },
    getForm(state){
      return state.formDataregister;
    },
    Pending(state){
      return state.pending;
    },
    PendingForm(state){
      return state.pending_form;
    },
    AlertTextForm(state){
      return state.AlertText;
    },
    doubleCount(state) {
      return state.count * 2
    },
    getSelect(state) {
      return state.selected;
    },
    getSelectALL(state) {
      return state.isAllSelected;
    },


  },
  
  actions: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },


  
    async fetchNewTransport() {
      this.selected = [];
      this.isAllSelected = false;

 try {
  this.pending = true
  const { pending , error, data } = await useFetch('/news/list', {
    method: 'post',
    baseURL:useEnvStore().apidev,
    headers: new Headers({
      'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
      'Content-Type': 'application/json'
  }), 
  body: {
    "page" : this.page,
    "per_page" : this.per_page,
    "search" :""
},
  });


  if (data.value.data) {
    this.datanewstransport = data.value
    this.total_page = data.value.total_page
    this.limit_page = data.value.limit_page
    this.current_page = data.value.current_page
    this.total_filter = data.value.total_filter
    this.total = data.value.total
  }
  
 
} catch (error) {
  this.error = error
} finally {
  this.loading = false
   this.pending = false
}
    },

    async fetchUsersId(id) {


      try {
        
        const { pending , error, data } = await useFetch('/user/get/' + id, {
          method: 'GET',
          baseURL:useEnvStore().apidev,
          headers: new Headers({
            'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
            'Content-Type': 'application/json'
        }), 
        });
        this.formDataEdit.user_firstname = data.value.user_firstname
        this.formDataEdit.user_name = data.value.user_name
        this.formDataEdit.user_password = data.value.user_password
        this.formDataEdit.user_lastname = data.value.user_lastname
        this.formDataEdit.user_email = data.value.user_email
        this.formDataEdit.user_phone = data.value.user_phone
     
      
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
        this.pending = false
      }
    
    },

    async deleteItem_id(id) {
      console.log('id',id);
        const index = this.datanewstransport.data.findIndex(item => item.id === id)
      if (index !== -1) {
        this.datanewstransport.data.splice(index, 1)
      }
      try {
        this.pending = true
        const { pending , error, data } = await useFetch('/news/delete/' + id, {
          method: 'DELETE',
          baseURL:useEnvStore().apidev,
          headers: new Headers({
            'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
            'Content-Type': 'application/json'
        }), 
        });
      
        this.isOpen = false;
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
        this.pending = false
      }


    },

    async Update(id) {

    
    try {
      this.pending = true
      const { pending , error, data } = await useFetch('/news/update/' + id, {
        method: 'PUT',
        baseURL:useEnvStore().apidev,
        headers: new Headers({
          'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
          'Content-Type': 'application/json'
      }), 
      body:this.formDataEdit,
      });

      
    
      if(data.value){
        this.AlertText = 'success';
      }else {
        this.AlertText = 'danger';
      }
      this.pending_form = true;
    } catch (error) {
      this.AlertText = 'danger';
    } finally {
      this.pending = false;
    }

  },

    async deleteItem(id) {
console.log(id);
      this.isOpen = true;
      this.news_id = id;

    
      
    },
    async selectall() {

      this.selected = [];

      if (!this.isAllSelected) {
        this.posts.data.forEach((value, index) => {
   
          this.selected.push(value);
      });
      
      }

      this.isAllSelected = !this.isAllSelected;
    },

    async selectone(x) {

    
      const index = this.selected.indexOf(x);

      if (index !== -1) {
        this.selected.splice(index, 1); // Remove value if already present
      } else {
        this.selected.push(x); // Add value if not present
      }
    },

    cance() {
      this.isAllSelected = false;
    },
    async SaveForm(){
      try {
        const { pending,error, data } = await useFetch('/news/create', {
          method: 'post',
          baseURL:useEnvStore().apidev,
          headers: new Headers({
            'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
            'Content-Type': 'application/json'
        }), 
        body:this.formDataregister,
        });
   
     
        if(data.value){
          this.AlertText = 'success';
        }else {
          this.AlertText = 'danger';
        }
        this.pending_form = true;
      } catch (error) {
        this.AlertText = 'danger';
      } finally {
        this.pending = false;
      }
this.formDataregister = {
  user_name:'',
  user_password:'',
  user_firstname:'',
  user_lastname:'',
  user_email:'',
  user_phone:'',
  user_type:3,
};

    },

    async EditForm(){

      console.log('save');
    },

    setCurrentPage(page) {
      this.page = page
      this.selected = [];
      this.isAllSelected = false
    },

    sortLists(sortBy){
      if (this.sortedbyASC) {
        this.posts.data.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        this.sortedbyASC = false;
      } else {
        this.posts.data.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        this.sortedbyASC = true;
      }
    },

    selectentires(data_entires) {
this.per_page = data_entires;
this.page = 1;
    },
    



  },
});
