export default function (transactionDetails = {}, action) {

    if (action.type === "onGetTransactionDetails") {
        // console.log("+++++ REDUCER - Transaction Details", action.transactionData);
        return action.transactionData

    } else {    
        return transactionDetails;
    }
  }