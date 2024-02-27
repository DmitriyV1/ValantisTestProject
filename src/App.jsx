import { useEffect, useState } from "react";
import { styled } from "styled-components";
import ItemsRow from "./Components/ItemsRow";
import getIds from "./Functions/getIds";
import getItems from "./Functions/getItems";

const PageCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 4rem;
  max-height: 2.8rem;
  > * {
    padding: 0.6rem;
    &:hover:not(span) {
      cursor: pointer;
    }
  }
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: row;

  > * {
    padding: 1rem 2rem 2rem 2rem;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 18vw 18vw 18vw 18vw 18vw;
  grid-template-rows: 10vw 10vw 10vw 10vw 10vw;
  gap: 1rem;
`;

function App() {
  const [page, setPage] = useState(1);
  const [allIds, setAllIds] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");

  // Getting any 50 ids withoun filtering
  useEffect(
    function () {
      setAllItems([]);
      setIsLoading(true);

      const waiting = async function () {
        try {
          setAllIds(await getIds(page));
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      waiting();
    },
    [page]
  );

  // Getting items from ids
  useEffect(
    function () {
      setIsLoading(true);

      const waiting = async function () {
        try {
          setAllItems(await getItems(allIds));
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      waiting();
    },

    [allIds]
  );

  return (
    <>
      <StyledHeader>
        <PageCounter>
          <h3 onClick={() => setPage(page - 1)}> &lt; </h3>
          <span> {page} </span>
          <h3 onClick={() => setPage(page + 1)}> &gt; </h3>
        </PageCounter>

        <StyledForm>
          <h3>
            Brand <input></input>
          </h3>
          <h3>
            Price <input></input>
          </h3>
          <h3>
            Product <input></input>
          </h3>
        </StyledForm>
      </StyledHeader>

      <Wrapper>
        <ItemsRow data={allItems} isLoading={isLoading} />
      </Wrapper>
    </>
  );
}

export default App;
