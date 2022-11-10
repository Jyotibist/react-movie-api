import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { CustomCard } from "./CustomCard";

export const MovieList = ({ movieList, deleteMovie }) => {
  console.log(movieList, " loading 1");
  const [displayMovie, setDisplayMovie] = useState([]);

  useEffect(() => {
    console.log("loading 2....");
    setDisplayMovie(movieList);
  }, [movieList]);

  const selectCategory = (cat) => {
    cat === "all" && setDisplayMovie(movieList);

    cat === "happy" &&
      setDisplayMovie(movieList.filter((item) => item.type === "happy"));

    cat === "lazy" &&
      setDisplayMovie(movieList.filter((item) => item.type === "lazy"));
  };

  console.log("loading 3....");
  return (
    <div className="bg-dark py-3 rounded p-3 mt-5">
      <Row>
        <Col>
          <ButtonGroup aria-label="Basic example">
            <Button onClick={() => selectCategory("all")} variant="primary">
              All
            </Button>
            <Button onClick={() => selectCategory("happy")} variant="danger">
              Happy
            </Button>
            <Button onClick={() => selectCategory("lazy")} variant="info">
              Lazy
            </Button>
          </ButtonGroup>

          <p className="mt-3"> {displayMovie.length} Movies found!</p>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-wrap justify-content-around gap-3">
          {displayMovie.map((item, i) => (
            <CustomCard movie={item} isDelete={true} func={deleteMovie} />
          ))}
        </Col>
      </Row>
    </div>
  );
};
