import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ItemsRow from "./Components/ItemsRow";
import getByBrand from "./Functions/getByBrand";
import getByPrice from "./Functions/getByPrice";
import getByProduct from "./Functions/getByProduct";
import getDuplicates from "./Functions/getDuplicates";
import getIds from "./Functions/getIds";
import getItems from "./Functions/getItems";

const PageCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 4rem;
  max-height: 2.8rem;
  padding: 1rem;
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
  align-items: center;
  justify-content: center;
  > * {
    margin: 1.6rem;
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
  justify-content: center;
`;

function App() {
  const [page, setPage] = useState(1);
  const [allIds, setAllIds] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [error, setError] = useState("");

  // Getting any 50 ids without filtering
  useEffect(
    function () {
      setAllItems([]);
      setIsLoading(true);

      const waiting = async function () {
        try {
          setAllIds(await getIds(page));
        } catch (err) {
          setError(err.message);
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
        } catch (err) {
          setError(err.message);
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      waiting();
    },

    [allIds]
  );

  const handleBrand = (e) => {
    setBrand(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleProduct = (e) => {
    setProduct(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reducerArray = [];
    setIsLoading(true);

    const waiting = async function (func) {
      reducerArray.push(await func);
    };

    try {
      brand !== "" && waiting(getByBrand(brand));
      price !== "" && waiting(getByPrice(price));
      product !== "" && waiting(getByProduct(product));
      // feel shamed for this
      setTimeout(() => {
        reducerArray.length > 1
          ? setAllIds(getDuplicates(reducerArray))
          : setAllIds(...reducerArray);
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StyledHeader>
        <PageCounter>
          <h3 onClick={() => setPage(page - 1)}> &lt; </h3>
          <span> {page} </span>
          <h3 onClick={() => setPage(page + 1)}> &gt; </h3>
        </PageCounter>

        <StyledForm onSubmit={handleSubmit}>
          Brand <input onChange={handleBrand}></input>
          Price <input onChange={handlePrice}></input>
          Product <input onChange={handleProduct}></input>
          <button type="submit">Confirm</button>
        </StyledForm>
      </StyledHeader>

      <Wrapper>
        {isLoading ? <div>Loading...</div> : <ItemsRow data={allItems} />}
      </Wrapper>
    </>
  );
}

export default App;
