export default function (newRequest = {}, action) {

    if (action.type === "composeRequest") {
      console.log("newrequest REDUCER AFTER ==>", action.newRequest);
      return action.newRequest;

    // } else if (action.type === "saveCategories") {
      

    } else {
      return newRequest;
    }
  }
  