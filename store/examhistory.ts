import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";
import { ref } from 'vue';




export const ExamHistoryStore = defineStore('examhistory', {
  state: () => ({
    em_id:null,
    history:[],
    myChoose:[],
    examlist:[],
    historylist:[],
    formsearchexamhistory: {
      page: 1,
      per_page: 50,
      search: '',
    },
    formuser: {
      page: 1,
      per_page: 5,
      search: ""
    },
    formsearchexam: {
      page: 1,
      per_page: 100,
      search: '',
    },
    IsCardInsert:false,
    IsCardEdit:false,
    IsCardListByUser:false,
    IsCardNoInsert:false,
    userall:[],
    user_id: null,
    total_page:null,
    limit_page:null,
    current_page:null,
    total_filter:null,
    total:null
  }

  ),




  getters: {
   


  },

  actions: {
    async fetchExamlistByEm() {
      const getid = await ApiService.post('/exam/history/' + this.em_id, this.formsearchexamhistory).then(response => {
        console.log(response.data);
        this.history = response.data.data;
        this.total_page = response.data.total_page
        this.limit_page = response.data.limit_page
        this.current_page = response.data.current_page
        this.total_filter = response.data.total_filter
        this.total = response.data.total

     
        
      });

    },

    sortLists(sortBy) {
      if (this.sortedbyASC) {
        this.examlist.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        this.sortedbyASC = false;
      } else {
        this.examlist.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        this.sortedbyASC = true;
      }
    },

    async selectentires(data_entires) {
      this.formsearchexamhistory.per_page = data_entires;
      this.formsearchexamhistory.page = 1;
    },
    setCurrentPage(page) {
      this.formsearchexamhistory.page = page
    },

    async fetchUsers() {
      const data = await ApiService.post('/user/list?user_type=3', this.formuser).then(response => {
        this.user = response.data.data;
    
      });

    let a =  await this.checkuser();
   
  },
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
 async checkuser() {
   this.userall = [];
    for (var i = 0; i < this.user.length; i++) {
      const data = ApiService.get('/user/get/'+this.user[i].user_id).then(response => {
     //   this.result = response.data;

     const b = {user_id:response.data.user_id,user_firstname:response.data.user_firstname,user_lastname:response.data.user_lastname,user_phone:response.data.user_phone,detail:response.data.detail?.verify_account,identification_number:response.data.detail?.identification_number}
        this.userall.push(b)
      });
    }
    return this.userall;

 
  },

  
  async fetchExam() {
    try {
      const data = await ApiService.post('/exam/main/list', this.formsearchexam).then(response => {
        this.examlist = response.data.data
      });
      return true
    } catch (error) {
      return false;
    } 
},


async fetchExamlistByUser() {
  try {
    const data = await ApiService.get('/exam/history/?em_id=22&user_id='+this.user_id).then(response => {
    this.historylist = response.data
      console.log(this.historylist);
    });
    return true
  } catch (error) {
    return false;
  } 
},
    









  },



});
