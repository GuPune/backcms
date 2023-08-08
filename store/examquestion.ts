import { defineStore } from 'pinia';
import ApiService from '../services/api.service';
import axios from "axios";
import { ref } from 'vue';
import { fail } from 'assert';
const user_id = useCookie('user_id');



export const ExamquestionStore = defineStore('examquestion', {
  state: () => ({
    quest_Id: 1,
    pending:false,
    isOpen: false,
    isOpenCreate: false,
    isOpenEdit: false,
    image: null,
    examqlist: [],
    deletechoice:[],
    em_id: 0,
    examqlisttotal: null,
    sortedbyASC: true,
    imageReq: false,
    imagelist: null,
    total_page: null,
    limit_page: null,
    current_page: null,
    total_filter: null,
    total: null,
    choicelist: [],
    formExamq: {
      eq_name: "",
      eq_image: "",
      eq_answer: null,
      em_id: 0,
      id: 0,
    },
    formChoice: {
      ec_index: null,
      ec_name: "",
      ec_image: "",
      eq_id: null,
    },
    formsearchexam: {
      page: 1,
      per_page: 10,
      search: '',
    },
    path: "",
    examlist: [],
    exam: [],
    formsearchexamquestion: {
      page: 1,
      per_page: 200,
      search: '',
    },
    formExam: {
      eq_name: "",
      eq_image: "",
      eq_answer: null,
      em_id: 0,
      id: 0,
    },
    formEditExamq: {
      eq_name: "",
      eq_image: "",
      eq_answer: null,
      em_id: 0,
      id: 0,
    },
    eq: [],
    modaldelete: false,
  }

  ),


  getters: {
    FormExamq(state) {
      return state.formExamq;
    },
    FormEditExamq(state) {
      return state.formEditExamq;
    },
    GetopenModalDelete(state) {
      return state.modaldelete;
    },
    Pending(state) {
      return state.pending;
    },

    


  },

  actions: {
    async fetchExamquestionlist() {
      try {
        const data = await ApiService.post('/exam/question/' + this.em_id + '/list', this.formsearchexamquestion).then(response => {
          this.examqlist = response.data.data
          this.examqlisttotal = response.data.data.length

          const examdata = ApiService.post('/exam/main/list', this.formsearchexam).then(exam => {  /////////////ดึง หลักสูตร
            this.examlist = exam.data.data
            this.exam = this.examlist.filter(item => item.em_id == this.em_id);
            this.formExamq.em_id = this.exam[0].em_id
          });
          this.questionlist();
        });

      } catch (error) {
        console.log('error');
        return false;
      } finally {

      }


    },

    sortLists(sortBy) {

    },

    async questionlist() {
      console.log(this.quest_Id);
      this.eq = [];
    
      if (this.examqlist.length == 0) {    //////////เช็ค ก่อนว่า มี ข้อสอบไหม  if คือ ไม่มี
        this.eq = [];
      } else {//////////เช็ค ก่อนว่า มี ข้อสอบไหม else  คือมี
        if (this.quest_Id > this.examqlist.length) {
          let numx = 0
          this.quest_Id = 1
          const newItem = { eq_answer: this.examqlist[0]?.eq_answer, eq_image: this.examqlist[0]?.eq_image, eq_name: this.examqlist[0]?.eq_name, id: this.examqlist[0]?.eq_id, em_id: this.examqlist[0]?.em_id };
          this.choicelist = this.examqlist[numx]?.choices
          this.eq.push(newItem);
          this.choicelist = this.examqlist[0]?.choices
        } else { 
          if (this.quest_Id == 1) {
            let numx = this.quest_Id - 1
            const newItem = { eq_answer: this.examqlist[numx]?.eq_answer, eq_image: this.examqlist[numx]?.eq_image, eq_name: this.examqlist[numx]?.eq_name, id: this.examqlist[numx]?.eq_id, em_id: this.examqlist[0]?.em_id };
            this.choicelist = this.examqlist[numx]?.choices
            this.eq.push(newItem);
          } else {
            let numx = this.quest_Id - 1
            const newItem = { eq_answer: this.examqlist[numx]?.eq_answer, eq_image: this.examqlist[numx]?.eq_image, eq_name: this.examqlist[numx]?.eq_name, id: this.examqlist[numx]?.eq_id };
            this.choicelist = this.examqlist[numx]?.choices
            this.eq.push(newItem);
          }
        }
      }
      
    },

    async selectentires(data_entires) {


    },
    setCurrentPage(page) {
      this.formsearchexam.page = page
    },
    async SaveExamq() {

      try {
        const data = await ApiService.post('/exam/question/create', this.formExamq).then(response => {
        let choice = this.SaveChoice(response.data.insertId)
          return choice;
        });
      } catch (error) {
        return false;

      } finally {
      }

    },
    async SaveChoice(id) {
      for (var i = 0; i < this.choicelist.length; i++) {
        const x = i + 1;
        this.formChoice.ec_index = x;
        this.formChoice.ec_name = this.choicelist[i].ec_name
        this.formChoice.ec_image = this.choicelist[i].ec_image
        this.formChoice.eq_id = id
        await this.delay(500);
        console.log(i);
        const data = await ApiService.post('/exam/choice/create', this.formChoice);
        {
        }
      }
      await this.ResetForm();


      return true;
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },

    async edit() {
      this.choicelist = [];
      this.deletechoice = [];

      const cachedData = localStorage.getItem('cachedData');
      const choice = localStorage.getItem('choice');
let x = JSON.parse(cachedData);
let c = JSON.parse(choice);




for (var i = 0; i < c.length; i++) {
 this.deletechoice.push(c[i].ec_id)
     this.choicelist.push({ id:i+1, ec_id: c[i].ec_id, ec_image: c[i].ec_image, ec_index:c[i].ec_index, ec_name:c[i].ec_name, em_id:c[i].em_id,eq_id:c[i].eq_id });
}


this.formEditExamq = {
  eq_name: x[0].eq_name,
  eq_image: x[0].eq_image,
  eq_answer: x[0].eq_answer,
  em_id: x[0].em_id,
  id: x[0].id,
};
this.image = x[0].eq_image;





      // try {
      //   const data = await ApiService.post('/exam/question/' + this.em_id + '/list', this.formsearchexamquestion).then(response => {
      //     this.examqlist = response.data.data
      //     this.examqlisttotal = response.data.data.length

      //     const examdata = ApiService.post('/exam/main/list', this.formsearchexam).then(exam => {  /////////////ดึง หลักสูตร
      //       this.examlist = exam.data.data
      //       this.exam = this.examlist.filter(item => item.em_id == this.em_id);
      //       this.formExamq.em_id = this.exam[0].em_id
      //     });
      //     this.questionlist();
      //   });

      // } catch (error) {
      //   console.log('error');
      //   return false;
      // } finally {

      // }


    },
    async UpdateExa() {
      await this.UploadfileExamq();
      await this.deleteChoiceCall();
      await this.UpdateExamq()
      return true;
      // try {
        

      //   await Promise.all([this.deleteChoiceCall(), this.UpdateExamq2()]);

      // } catch (error) {
      //   console.log('error');
      //   return false;
      // } finally {

      // }
   //  await this.deleteChoiceCall();

// for (var i = 0; i < this.choicelist.length; i++) {
//   const x = i + 1;
//   this.formChoice.ec_index = x;
//   this.formChoice.ec_name = this.choicelist[i].ec_name
//   this.formChoice.ec_image = this.choicelist[i].ec_image
//   this.formChoice.eq_id = this.formEditExamq.id
//   await this.delay(500);
//   {
//   }
// }
    },

    async UpdateExamq() {
      console.log('UpdateExamq2');
const data = await ApiService.put('/exam/question/update/' + this.formEditExamq.id, this.formEditExamq).then(response => {
return true;
});
    },



    async deleteExamq(item) {

      try {
        const del = await ApiService.delete('/exam/question/delete/' + item[0].id);
        this.eq = [];
        return true;
      } catch (error) {
        return false;
      }
    },

    async deleteImage(image) {

    },

    async ResetForm() {


      this.choicelist = [];
      this.image = null,
        this.imageReq = false,
        this.imagelist = null,
        this.formExamq = {
          eq_name: "",
          eq_image: "",
          eq_answer: null,
          em_id: 40,
          id: 0,
        };

    },

    async AdChoice() {
      var x = this.choicelist.length + 1
      const daa = {
        id: x,
        ec_index: null,
        ec_name: "-",
        ec_image: "",
        eq_id: "",
      }
      this.choicelist.push(daa);
      console.log(this.choicelist.length);
    },

    async deleteChoice(x) {
      //  const index = this.choicelist[item]
      const index = this.choicelist.findIndex(item => item.id === x)
      if (index !== -1) {
        this.choicelist.splice(index, 1)
      }
    },

    async deleteChoiceCall() {
   //   console.log('1');
      for (var i = 0; i < this.deletechoice.length; i++) {
        console.log(this.deletechoice);
      const del = await ApiService.delete('/exam/choice/delete/' + this.deletechoice[i]);
      {
  }
}
    },


    async OpenFormInser() {

    },
    async OpenEditItem() {


    },


    closeModal() {
      this.isOpenCreate = false;
      this.isOpenEdit = false;

    },

    async UploadfileExamq() {
      let formData = new FormData();
      formData.append('files', this.imagelist);
      console.log(this.imagelist);
      if (this.imagelist) {
        try {
          const data = await ApiService.upload('/media_file/upload/file', formData);
          //  this.path = data.data[0].path
          this.formExamq.eq_image = data.data[0].path
          this.formEditExamq.eq_image = data.data[0].path
          return true;
        } catch (error) {
          return false;
        }
      }

    },

    async uploadfileexam(x) {
      const data = await ApiService.upload('/media_file/upload/file', x);
      return data;
    },

    async ChangeFormateTime() {



    },
    async ClearLocal() {
  localStorage.clear();

  return true;


    },

  },



});
