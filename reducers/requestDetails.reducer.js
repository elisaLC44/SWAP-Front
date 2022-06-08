export default function (requestDetails = [], action) {
    if (action.type === "getRequestDetails") {
      console.log('REDUCER requestDetails', requestDetails)
      return action.requestDetails;
    
      // activé au click sur Refuser dans asker detail screen
    // } else if (action.type === "user::removeMatch") {
    //   let tempMatches = [...categoryMatches];
    //   let newMatches = tempMatches.filter(
    //     (match) => match._id !== action.requestId
    //   );
    //   return newMatches;

    } else {
        return requestDetails ;
    }
  }
  