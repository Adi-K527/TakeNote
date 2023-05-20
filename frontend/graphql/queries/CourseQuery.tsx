import { gql } from "@apollo/client"




export const GET_COURSE = gql`
    query course($id: ID!) {
        course(id: $id) { 
            id
            name
            description
            notes {
                id
                title
            }
            members {
                id
            }
        }
    }
`

export const GET_COURSE_NOTES = gql`
    query course($id: ID!) {
        course(id: $id) {
            id
            notes {
                id
                title
                createdBy {
                    userName
                }
            }
        }
    }


`

export const GET_COURSE_MESSAGES = gql`
    query course($id: ID!){
        course(id: $id){
            messages {
                creator {
                    userName
                    firstName
                    lastName
                }
                text
            }
        }
    }
`


