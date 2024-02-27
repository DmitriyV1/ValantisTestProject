import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  padding: 0.6rem;
`;
const StyledSpan = styled.span`
  font-size: small;
`;

function ItemsRow({ data = [], isLoading }) {
  return (
    <>
      {!isLoading ? (
        data.map((el) => (
          <Wrapper key={el.id}>
            <StyledSpan>
              Brand: {el.brand === null ? "None" : el.brand}
            </StyledSpan>
            <StyledSpan>id: {el.id}</StyledSpan>
            <StyledSpan>Price: {el.price}</StyledSpan>
            <StyledSpan>Product: {el.product}</StyledSpan>
          </Wrapper>
        ))
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}

export default ItemsRow;
