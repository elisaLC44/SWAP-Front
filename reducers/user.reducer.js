export default function (user = {}, action) {
  console.log("USER REDUCER ==>", user); //
    if (action.type === "saveUserInfo") {
      // console.log("USERINFO REDUCER ==>", action.userInfo);
      return action.userInfo;
    } else if (action.type === "saveCategories") {
      let userCopy = user;
      userCopy.categories = action.categoriesSaved;
      // console.log("USER REDUCER - CATEGORIES ==>", userCopy);
      return userCopy;

    } else if (action.type === "saveGender") {
      let userCopy = user;
      userCopy.gender = action.saveGender.value ;
      // console.log("REDUCER GENDER ==>", userCopy);
      return userCopy;

    } else if (action.type === "onUpdateAvatar") {
      let userCopy = user;
      userCopy.user_img = action.avatar ;
      // console.log("REDUCER GENDER ==>", userCopy);
      return userCopy;

    } else {
      return user;
    }
  }
  