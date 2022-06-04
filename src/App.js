import { Formik, Form, Field } from "formik";
import { useState } from "react";
import "./style.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const open = (url) => {
    window.open(url);
  };
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            // llamar a api
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID W2FW44I7PvRj5z6LS8wxhqoJHg-OKXitvPBPxo_Xqvw",
                },
              }
            );
            const data = await response.json();
            console.log(data.results);
            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt={photo.alt_description} />
              <p>{[photo.description, photo.alt_description].join("-")}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
