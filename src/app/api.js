import axios, { AxiosResponse } from 'axios'
// import {CardsType, CardsUrlType } from '../features/Card/cards-reducer';
// import { UserProfileType } from '../features/Login/auth-reducer';
// import {PackType, UrlParamsType } from '../features/Packs/packs-reducer';

export const instance = axios.create({
    //baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'http://localhost:4000' ,
    withCredentials: true,
})

// const herokuInstance = axios.create({
//     baseURL: 'https://neko-back.herokuapp.com/2.0/',
//     withCredentials: true,
// })

export const authAPI = {
    register(data) {
        return instance.post('/auth/register', data);
    },
    authMe() {
        return instance.get('/auth/me');
    },
    // updateName(data) {
    //     return instance.put('auth/me', data);
    // },
    // changeAvatar(data) {
    //     return instance.put<ChangeUserNameParamsType, AxiosResponse<ResponseUpdatesUserType>>('auth/me', data)
    // },
    login(data) {
        return instance.post('/auth/login', data);
    },
    // logOut() {
    //     return instance.delete('auth/me');
    // },
    // forgotPassword(data) {
    //     return herokuInstance.post('auth/forgot', data);
    // },
    // setNewPassword(data) {
    //     return herokuInstance.post('auth/set-new-password', data);
    // }
}

export const postAPI = {
    // getCardPAcks(pageCount, pageNumber, min, max, userId,packName) {
    //     if (userId) {
    //         return instance.get(`cards/pack?pageCount=${pageCount}&page=${pageNumber}&min=${min}&max=${max}packName=${packName}&user_id=${userId}`);
    //     } else return instance.get(`cards/pack?pageCount=${pageCount}&page=${pageNumber}&min=${min}&max=${max}`);
    // },

    getAllPosts() {
            return instance.get('/post');
    },
//     getPacks(params) {
//         return instance.get<ResponsePacksType>(`cards/pack`, {
//             params: {
//                 page: params.page,
//                 pageCount: params.pageCount,
//                 packName: params.packName,
//                 user_id: params.userID,
//                 min: params.min,
//                 max: params.max
//             }
//         })
    
//     },
//     addCardPack(name, isPrivate) {
//         return instance.post('cards/pack', {
//             cardsPack: {
//                 name: name,
//                 private: isPrivate
//             }
//         });
//     },
//     updateCardPack(packId, name, isPrivate) {
//         return instance.put('cards/pack', {
//             cardsPack: {
//                 _id: packId,
//                 name: name,
//                 private: isPrivate
//             }
//         });
//     },
//     deleteCardPack(packId) {
//         return instance.delete(`cards/pack?id=${packId}`);
//     },
// }
// export const cardsAPI = {
//     getCards(params) {
//         return instance.get<ResponseCardsType>(`cards/card`, {
//             params: {
//                 page: params.page,
//                 pageCount: params.pageCount,
//                 cardsPack_id: params.cardPackId
//             }
//         })

//     },
//     addNewCard(packId , question, answer) {
//         return instance.post('cards/card', {
//             card: {
//                 cardsPack_id: packId,
//                 question: question,
//                 answer: answer,
//                 grade: 0,
//                 shots: 0,
//             }
//         });
//     },
//     deleteCard(cardId) {
//         return instance.delete(`cards/card?id=${cardId}`);
//     },
//     editCard(cardsId, question, answer) {
//         return instance.put('cards/card', {
//             card: {
//                 _id: cardsId,
//                 question: question,
//                 answer: answer,

//             }
//         });
//     },
//     addGradeToCard(grade, card_id) {
//         return instance.put('cards/grade', {
//             grade:grade,
//             card_id: card_id
//         });
//     },

}


