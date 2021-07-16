import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($name: String!, $email: String, $password: String!) {
        addUser(name: $name, email: $email, password: $password) {
            token
            user {
                _id
                name
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                name
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($userId: ID!, $book: String!) {
        saveBook(userId: $userId, book: $book) {
            _id
            name
            savedbooks
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($book: String!) {
        removeBook(book: $book) {
            _id
            name
            savedBooks
        }
    }
`;