import styled from 'styled-components';

const EpisodeBox = ({ name, date }) => {
    return (
        <Container>
            <ItemContainer>
                <Title>Episode name</Title>
                <Name>{name}</Name>
            </ItemContainer>

            <ItemContainer>
                <Title>Release date</Title>
                <Date>{date}</Date>
            </ItemContainer>
            <WatchButton>Watch on Netflix</WatchButton>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-width: 200px;
    min-height: 200px;
    max-width: 200px;
    max-height: 200px;

    padding: 20px;
    border-radius: 20px;

    background-color: hsl(216, 41%, 5%, 0.7);

    transition: background-color 0.5s;

    &:hover {
        background-color: hsl(216, 41%, 10%, 0.7);
    }
`;

const ItemContainer = styled.div`
    border-bottom: rgb(180, 180, 180, 0.4);
`;
const Title = styled.p`
    font-size: 0.8rem;
    color: hsl(0, 0%, 40%);
`;
const Name = styled.p`
    font-size: 1rem;
    flex: 1 0 25%;
    color: hsl(160, 100%, 50%);
`;
const Date = styled(Name)``;
const WatchButton = styled.button`
    cursor: pointer;
    background-color: transparent;
    padding: 10px 20px 10px 20px;
    border-radius: 15px;
    border: 1px solid rgb(180, 180, 180, 0.4);
    outline: none;
    color: hsl(8, 100%, 40%);
    font-weight: 900;

    &:hover {
        background-color: rgb(180, 180, 180, 0.1);
        color: hsl(8, 100%, 50%);
    }
`;

export default EpisodeBox;
