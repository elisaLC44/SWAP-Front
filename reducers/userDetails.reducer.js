export default function (userDetails = {}, action) {

    if (action.type === "getAskerDetails") {
        // console.log("+++++ REDUCER ASKER DETAILS", action.askerRequest);
        return action.askerRequest

    } else if (action.type === "getHelperDetails") {
        // console.log("REDUCER HELPER DETAILS", action.helper);
        return action.helper
    }
    
    return userDetails;
  }
  