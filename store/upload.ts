import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';
import axios from "axios";




export const UploadStore = defineStore('upload', {
  state: () => ({
    preview: null,
    image: null,
    preview_list: [],
    image_list: [],
    formi:[],
  }
     
),


  getters: {
  

  },
  
  actions: {
    SaveData(x)
    {
alert('SaveData');
    },
    Viewimage(a)
    {
     
 

      const x = a.split(',');
      console.log(x);

      if(x.length > 0){
        for (var i = 0; i < x.length; i++) {
    
     this.preview_list.push(x[i]);
        }
    }

   

    

    },
    imagedisplay(data)  {
   
      if(data.length > 0){
        for (var i = 0; i < data.length; i++) {
          this.preview_list.push(data[i].ni_path_file);

        }
    }

    },
    Saveimages(formData)
    {

     
    
   //   this.formi = formData;

      //let x = []
// formData.forEach((value,index) =>{
//    console.log(value);
// })



  //    this.formi.push(formData);

  

  //    axios.post('http://oasapi.iddriver.com/media_file/upload/file',
  //    formData, {
  //      headers: {
  //       'Authorization': 'ZeBuphebrltl3uthIFraspubroST80Atr9tHuw5bODowi26p', 
  //        'Content-Type': 'multipart/form-data'
  //      }
  //    }
  //  ).then(function (response) {
  //    console.log('SUCCESS!!',response.data);
  //    this.SaveData(response.data);

  //    const counterStorage = UploadStore();
  //           counterStorage.SaveData(response.data);


    
  //  })
  //  .catch(function () {
  //    console.log('FAILURE!!');
  //  });



    }
  




  },
});
