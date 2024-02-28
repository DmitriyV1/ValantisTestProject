import md5 from "md5";
import CURRENT_DATE from "../helpers/CURRENT_DATE";
import PASSWORD from "../helpers/PASSWORD";

const getByPrice = async function (price) {
  const arr = [];

  try {
    const request = await fetch("http://api.valantis.store:40000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": md5(`${PASSWORD}_${CURRENT_DATE}`),
      },
      body: JSON.stringify({
        action: "filter",
        params: {
          price: +price,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => arr.push(Array.from(new Set(data.result))));
  } catch (error) {
    console.log("Error with getting filtered by price data", error);
  }

  return arr.flat();
};

export default getByPrice;
