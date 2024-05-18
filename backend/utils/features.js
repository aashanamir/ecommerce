class AppFeatures {
  
  constructor(query , params){

    this.query = query;
    this.params = params;

  }


  search(){

    const keyword = this.params.keyword ? {
      name : {

        $regex : this.params.keyword,
        $options : "i"

      }
    } : {};

    this.query = this.query.find(keyword);

    return this;

  }

  filter(){
    const paramsCopy = {...this.params};

    const removeItems = ["keyword" , "page" , "limit"];

    removeItems.forEach((key)=>{
      delete paramsCopy[key];
    })

    let params = JSON.stringify(paramsCopy);

    params = params.replace(/(gt|gte|lt|lte)/g , (key)=> `$${key}`);

    let final = JSON.parse(params);
  
    this.query = this.query.find(final);


    return this;
  }

  pagination(resultPerPage){
    const currantPage = Number(this.params.page) || 1;

    const skip = resultPerPage * (currantPage - 1); // 5 * (2 - 1) 

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
  
};

export default AppFeatures;