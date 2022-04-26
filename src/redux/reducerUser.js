// import {ADD_USER, IS_ERROR_USER, LOGIN_USER, IS_AUTH, USER_EDITED, ERROR} from "./actions";
//
// const initialState = {
//     userRegistration: {
//         email: null,
//         token: null,
//         username: null,
//     },
//     userLogin: {
//         email: null,
//         token: null,
//         username: null,
//         bio: null,
//         image: `https://api.realworld.io/images/smiley-cyrus.jpeg`,
//     },
//     isAuth: false,
//     isError: null,
//     isEdited: {
//         email: null,
//         image: null,
//         password: null,
//         username: null
//     },
//     isErrorEdit: null
// }
//
// const reducerUser = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_USER:
//             return {
//                 ...state,
//                 userRegistration: {
//                     email: action.payload.email,
//                     token: action.payload.token,
//                 }
//             }
//         case IS_ERROR_USER:
//             return {
//                 ...state,
//                 isError: action.payload
//             }
//         case IS_AUTH:
//             return {
//                 ...state,
//                 isAuth: true
//             }
//         case LOGIN_USER:
//             return {
//                 ...state,
//                 userLogin: {
//                     email: action.payload.email,
//                     token: action.payload.token,
//                     username: action.payload.username,
//                     bio: action.payload.bio,
//                     image: action.payload.image
//             }
//         }
//         case USER_EDITED:
//             return {
//                 ...state,
//                 isEdited: {
//                     email: action.payload.email,
//                     image: action.payload.image,
//                     password: action.payload.password,
//                     username: action.payload.username
//                 }
//             }
//         case ERROR:
//             return {
//                 ...state,
//                 isErrorEdit: action.payload
//             }
//         default: return state;
//     }
// }
//
// export default reducerUser;