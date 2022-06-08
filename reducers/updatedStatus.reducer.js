
export default function (updatedStatus = [], action) {
    let data = {
        helper_status: action.helper_status, 
        asker_status: action.asker_status,
    }
    if (action.type === "onUpdateStatus") {

        console.log("+++++ REDUCER - Updated Status", data);
        return data
    } else {
        return updatedStatus 
    }
}
