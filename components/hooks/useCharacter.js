import { useQuery, gql } from '@apollo/client';

const GET_CHARACTER = gql`
    query getCharacter($id: ID!) {
        character(id: $id) {
            name
            status
            species
            created
            gender
            image
            episode {
                name
                air_date
            }
        }
    }
`;

const useCharacter = id => {
    const { error, loading, data } = useQuery(GET_CHARACTER, {
        variables: {
            id: id,
        },
    });

    return { error, loading, data };
};

export default useCharacter;
