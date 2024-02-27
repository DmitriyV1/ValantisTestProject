import md5 from "md5";
import CURRENT_DATE from "../helpers/CURRENT_DATE";
import PASSWORD from "../helpers/PASSWORD";
import getUniqueItems from "./getUniqueIds";

const getItems = async function (allIds) {
  const arr = [];

  try {
    const request = await fetch("http://api.valantis.store:40000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": md5(`${PASSWORD}_${CURRENT_DATE}`),
      },
      body: JSON.stringify({
        action: "get_items",
        params: {
          ids: allIds,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => arr.push(getUniqueItems(data.result, "id")));
  } catch (error) {
    console.log(error);
  }

  return arr.flat();
};

export default getItems;
