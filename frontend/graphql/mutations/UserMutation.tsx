import { gql } from "@apollo/client" 


export const REGISTER = gql`
    mutation register($firstName: String!, $lastName: String!, $userName: String!, $password: String!){
        register(firstName: $firstName, lastName: $lastName, userName: $userName, password: $password){
            id
            userName
            password
        }
    }
`

export const LOGIN = gql`
    mutation login($userName: String!, $password: String!){
        login(userName: $userName, password: $password){
            id
            userName
            password
        }
    }
`

export const LEAVE_COURSE = gql`
    mutation leavecourse($course: ID!, $user: ID!) {
        leavecourse(course: $course, user: $user) {
            id
        }
    }

`