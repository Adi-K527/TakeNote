import { gql } from "@apollo/client" 


export const CREATE_COURSE = gql`
    mutation createcourse($name: String!, $description: String!, $user: ID!){
        createcourse(name: $name, description: $description, user: $user){
            id
            name
            description
        }
    }
`

export const JOIN_COURSE = gql`
    mutation joincourse($course: ID!, $user: ID!){
        joincourse(course: $course, user: $user){
            id
        }
    }
`

export const POST_NOTE = gql`
    mutation postnote($note: ID!, $course: ID!){
        postnote(note: $note, course: $course){
            id
        }
    }
`

export const SEND_MESSAGE = gql`
    mutation message($text: String!, $creator: ID!, $course: ID!){
        message(text: $text, creator: $creator, course: $course){
            creator {
                userName
                firstName
                lastName
            }
            text
        }
    }
`


