let nameArray;

const addName = (name) =>{
    nameArray.push(name);
}

const removeName = (name) =>{
   const index = nameArray.indexOf(name);
   if(index > -1){
    nameArray.splice(index, 1)
   }
}


const genGroups = (array) =>{

}