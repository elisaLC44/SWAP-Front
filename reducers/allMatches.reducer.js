export default function (allMatches = [], action) {

    if (action.type === "onAddMatches") {
        // console.log("+++++ REDUCER - ADD MATCHES", action.matches);
        return action.matches

    } else{    
        return allMatches;
    }
  }