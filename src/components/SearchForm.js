import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { fetchData } from "../utils/axiosHelper";
import { CustomCard } from "./CustomCard";

export const SearchForm = ({ func }) => {
  const [form, setForm] = useState("");
  const [movie, setMovie] = useState({});
  const [isError, setIsError] = useState(false);

  const handlOnChange = (e) => {
    const { value } = e.target;
    setForm(value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setMovie({});
    setIsError(false);

    const { data } = await fetchData(form);

    if (data.Response === "True") {
      setMovie(data);
    } else {
      setIsError(true);
    }
  };

  const handleOnAddToList = (movie) => {
    //send movie to parent component
    func(movie);

    //reset the movie state so that the card is not showing after add movie to the list
    setMovie({});

    // rest the input fild so that there is no text in the input field
    setForm("");
  };

  const removeDisplay = () => {
    setMovie({});
    setForm("");
  };

  return (
    <div className="bg-dark py-5 rounded p-2">
      <Form onSubmit={handleOnSubmit}>
        <Row className="g-2">
          <Col className="d-flex justify-content-center">
            <div className="d-flex" style={{ width: "60%" }}>
              <Form.Control
                onChange={handlOnChange}
                placeholder="Movie Name..."
                required
                value={form}
              />
              <div className="d-grid">
                <Button varient="primary" type="submit">
                  Search
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Form>

      <div className="mt-3 d-flex justify-content-center">
        {movie?.imdbID && (
          <CustomCard
            movie={movie}
            func={handleOnAddToList}
            removeDisplay={removeDisplay}
          />
        )}

        {isError && (
          <Alert variant="danger">
            No movie found, change the name and search it again.
          </Alert>
        )}
      </div>
    </div>
  );
};
