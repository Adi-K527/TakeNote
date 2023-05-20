import { gql } from "@apollo/client";

export const GET_SESSION = gql`
    query {
        session
    }
`

export const GET_USER_NOTES = gql`
    query user($id: ID!){
        user(id: $id){
            notes {
                id
                title
                body
                caption
                comments {
                    text
                }
            }
        }
    }
`

export const GET_COURSES = gql`
    query user($id: ID!){
        user(id: $id){
            courses {
                id 
                name 
                description
            }
        }
    }
`

export const GET_USER = gql`
    query user($id: ID!){
        user(id: $id){
            id
            firstName
            lastName
        }
    }

`