import md5 from "md5";
import CURRENT_DATE from "../helpers/CURRENT_DATE";
import ITEMS_PER_PAGE from "../helpers/ITEMS_PER_PAGE";
import PASSWORD from "../helpers/PASSWORD";

const getIds = async function (page) {
  const arr = [];

  try {
    const request = await fetch("http://api.valantis.store:40000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": md5(`${PASSWORD}_${CURRENT_DATE}`),
      },
      body: JSON.stringify({
        action: "get_ids",
        params: {
          offset: page === 1 ? 0 : page * ITEMS_PER_PAGE - 1,
          limit: ITEMS_PER_PAGE,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => arr.push(Array.from(new Set(data.result))));
  } catch (error) {
    console.log("Error with getting data", error);
  }

  return arr.flat();
};

export default getIds;
