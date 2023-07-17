import { defineStore } from 'pinia';
import axios from "axios";
const user_id = useCookie('user_id');



export const newTransportStore = defineStore('newstransport', {
  state: () => ({
    locale:true,
    load:true,
    isOpen: false,
    AlertNewsTransport:null,
    datanewstransport:{},
    pending:false,
    AlertText:'',
    pending_form:false,
    sortedbyASC: true,
    selected: [],
    checkboxes: [], // Array to store checkbox values
    isAllSelected: false,
    count: 0,
    page:1,
    per_page:5,
    total_page:null,
    limit_page:null,
    current_page:null,
    total_filter:null,
    total:null,
    itemsPerPage: 3,
    news_id:null,
    formDataNews:{
      news_cover: "",
      news_title: "",
      news_description: "",
      news_type: "2",
      user_id:user_id.value
  }

  
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
    getFormNews(state){
      return state.formDataNews;
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


    async deleteItem_id(id) {
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

      this.isOpen = true;
      this.news_id = id;

    
      
    },



 
  async SaveDataNew (){


    console.log(this.formDataNews);
      try {
        const { pending,error, data } = await useFetch('/news/create', {
          method: 'post',
          baseURL:useEnvStore().apidev,
          headers: new Headers({
            'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
            'Content-Type': 'application/json'
        }), 
        body:this.formDataNews,
        });
        const TransportStorage = newTransportStore();
        await TransportStorage.ResetForm();

        const Alert = AlertStore();
        await Alert.AlertSuccess();
     
       
        this.pending_form = true;
      } catch (error) {
        const Alert = AlertStore();
        Alert.AlertError();
      } finally {
        this.pending = false;
      }
    },



    async SaveDataNewImage (x){

      const array = [];
      for (let obj of x) {
       array.push(obj.path)
     }
 
    const string = array.join(',');
    this.formDataNews.news_cover = string;
      try {
        const { pending,error, data } = await useFetch('/news/create', {
          method: 'post',
          baseURL:useEnvStore().apidev,
          headers: new Headers({
            'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
            'Content-Type': 'application/json'
        }), 
        body:this.formDataNews,
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
    async SaveFormNews(){


          const counterStorage = UploadStore();
            counterStorage.formi

            if (counterStorage.formi.length === 0) {
              // File is empty
              console.log("File is empty");

            const TransportStorage = newTransportStore();
            await TransportStorage.SaveDataNew();
            } else {
              // File has content
              console.log("File has content");


          axios.post('http://oasapi.iddriver.com/media_file/upload/file',
          counterStorage.formi, {
       headers: {
        'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
         'Content-Type': 'multipart/form-data'
       }
     }
   ).then(function (response) {
           const TransportStorage = newTransportStore();
            TransportStorage.SaveDataNewImage(response.data);
         
            TransportStorage.ResetForm();
   })
   .catch(function () {
     console.log('FAILURE!!');
   });

            //       const TransportStorage = newTransportStore();
            // TransportStorage.SaveDataNewImage(1);
    
            }
            // counterStorage.formi.forEach((value,key) => {
            //   console.log('counterStorage',value);
            // });






     /////////  step 1 upload ////// 


  //         axios.post('http://oasapi.iddriver.com/media_file/upload/file',
  //         counterStorage.formi, {
  //      headers: {
  //       'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
  //        'Content-Type': 'multipart/form-data'
  //      }
  //    }
  //  ).then(function (response) {
  //    const counterStorage = newTransportStore();
  //           counterStorage.SaveDataNew(response.data);
  //  })
  //  .catch(function () {
  //    console.log('FAILURE!!');
  //  });

     //////// step 2 insert New //////
     


      // try {
      //   const { pending,error, data } = await useFetch('/news/create', {
      //     method: 'post',
      //     baseURL:useEnvStore().apidev,
      //     headers: new Headers({
      //       'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
      //       'Content-Type': 'application/json'
      //   }), 
        
      //   body:this.formDataNews,
      //   });

 
      //   this.pending_form = true;

      //   if(data){
         

      //     this.AlertText = 'success';
      //   }else {
        
      //     this.AlertText = 'danger';
      //   }
      
    

      // } catch (error) {
      //   this.AlertText = 'danger';
      // } finally {
      //   this.AlertText = 'success';

      // }
    },

    ResetForm(){

      this.formDataNews = {
        news_cover:'',
        news_title:'',
        news_description:'',
        news_type:"2",
        user_id:user_id.value,
      };


      
      const UploadStorage = UploadStore();

      UploadStorage.preview = null,
      UploadStorage.image = null,
      UploadStorage.preview_list = [],
      UploadStorage.image_list = [],
      UploadStorage.formi = []

      console.log('reset upload');
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


