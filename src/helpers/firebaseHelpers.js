export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.data();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
};
export const elementsToOrderList = array => {
  let returnArr = [];

  if( array != null && array.length > 0){
    array.forEach( element => {
      let checkedItem = {};
      let returnElement = {};
      if(element.items != null && element.items.length > 0){
        element.items.forEach( item => {
          console.log(item);
          if(item.checked){
            console.log("returnItem :: " + item);
            checkedItem = item;
          }
        });
      }
      returnElement = {name: element.name, item: checkedItem.name};
      console.log("returnElement :: " + returnElement);
      returnArr.push(returnElement);
    });
  }
  return returnArr;
};
