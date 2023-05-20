import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
    mutation comment($text: String!, $Note: ID!, $User: ID!){
        comment(text: $text, Note: $Note, User: $User){
            id
            text
        }
    }
`

