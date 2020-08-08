export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.data();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
};
