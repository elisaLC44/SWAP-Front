export default function (selectedUserList = [], action) {

  if (action.type === "selected::user") {
    // console.log("action.UserId REDUCER ==>", action.userId);
    let selectedUserListCopy = [...selectedUserList]
    selectedUserListCopy.push(action.userId)
    console.log("selectedUserList REDUCER ==>", selectedUserListCopy);
    
    return selectedUserListCopy;
    // [...selectedUserList, action.userId];

  } else if (action.type === "deselected::selected") {
    let newArray = [...selectedUserList].filter((userId) => userId !== action.userId);
    return newArray;

  } else if (action.type === "reset::selected") return [];
  return selectedUserList;

}


