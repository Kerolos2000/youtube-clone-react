import React, { useContext } from "react";
import { search } from "../../Context/search";

import CardX from "../CardX/CardX";
import Loader from "../Loader/Loader";

export default function Search() {
  const searchX = useContext(search);

  return (
    <>
      {searchX.loader ? (
        <Loader />
      ) : (
        <CardX
          dataX={searchX.videos}
          loader={searchX.loader}
          img={"col-md-3 col-sm-6"}
          text={"col-md-9 col-sm-6"}
          container={"container"}
          description
        />
      )}
    </>
  );
}
