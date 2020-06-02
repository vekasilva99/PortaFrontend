import gql from "graphql-tag";
export const LOGIN_USER = gql`
   query ($mail: String! , $password: String!) {
        userLogin(mail: $mail, password: $password){
        userId
        token
        tokenExpiration
    }
   }
 
`;

export const ADMIN_LOGIN = gql`
   query ($mail: String! , $password: String!) {
        adminLogin(mail: $mail, password: $password){
            adminId
            token
            tokenExpiration
    }
   }
 
`;
