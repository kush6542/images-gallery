import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import Search from "./components/Search";
import ImageCard from "./components/imageCard";
import { Container, Row, Col } from "react-bootstrap";
import Welcome from "./components/welcome";

// const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const API_URL = process.env.REACT_APP_API_URL || window.location.origin;

const App = () => {
  const [word, setWord] = useState("");
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(
      `${API_URL}/new-image?query=${word}`
    )
      .then((res) => res.json())
      .then((data) => {
        if(data.data.errors && data.data.errors.length > 0) {
          throw Error(data.data.errors.join(", "))
        } 
        setImages([{ ...data.data, title: word }, ...images]);
        console.log(images);
        
      })
      .catch((err) => {
        console.log(err);
      });

      setWord("");

  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div>
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      {images.length ? (
        <Container className="mt-4">
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i} className="pt-3">
                <ImageCard
                  key={i}
                  image={image}
                  deleteImage={handleDeleteImage}
                />
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <Welcome />
      )}
    </div>
  );
};

export default App;
