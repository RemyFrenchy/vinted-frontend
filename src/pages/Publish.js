import { useState } from "react";
import axios from "axios";

export default function Publish() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [brand, setBrand] = useState();
  const [size, setSize] = useState();
  const [condition, setCondition] = useState();
  const [color, setColor] = useState();
  const [city, setCity] = useState();
  const [price, setPrice] = useState();

  const userToken =
    "nyyq_xmnszPvjPT5tsv3hkhRscx7FlegPImMxOSH6Mmn87z7eXeCcT61fFrsuaiY";

  const sendPicture = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    try {
      const response = await axios.post(
        "https://vinted2021.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer" + userToken,
            "content-type": "multipart/form-data",
          },
        }
      );

      alert(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  const HandleFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleBrand = (event) => {
    setBrand(event.target.value);
  };
  const handleSize = (event) => {
    setSize(event.target.value);
  };
  const handleCondition = (event) => {
    setCondition(event.target.value);
  };
  const handleColor = (event) => {
    setColor(event.target.value);
  };
  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  return (
    <div>
      <form onSubmit={sendPicture}>
        <input type="file" onChange={HandleFile} />
        <label>
          Title
          <input
            type="text"
            name="titles"
            id="title"
            placeholder="ex: chemise..."
            value={title}
            onChange={handleTitle}
          />
        </label>

        <label>
          Décrire ton article
          <input
            type="text"
            placeholder=" ex: porté quelque fois, taille correctement"
            value={description}
            onChange={handleDescription}
          />
        </label>
        <label>
          Marque
          <input
            type="text"
            placeholder="ex: Nike"
            value={brand}
            onChange={handleBrand}
          />
        </label>
        <label>
          Taille
          <input
            type="text"
            placeholder="ex 44"
            value={size}
            onChange={handleSize}
          />
        </label>
        <label>
          Couleur
          <input
            type="text"
            placeholder="Vert"
            value={color}
            onChange={handleColor}
          />
        </label>
        <label>
          Etat
          <input
            type="text"
            placeholder="En bon état"
            valu={condition}
            onChange={handleCondition}
          />
        </label>
        <label>
          Lieu
          <input
            type="text"
            placeholder="Paris"
            value={city}
            onChange={handleCity}
          />
        </label>
        <label>
          Prix
          <input
            type="text"
            placeholder="100 euros"
            value={price}
            onChange={handlePrice}
          />
        </label>
        <label>
          <input type="checkbox" />
          Je suis intéréssé(e) par les échanges
        </label>
        <input type="submit" value="Ajouter" />
      </form>
      {isLoading === true ? (
        <p>En cours de chargement </p>
      ) : (
        // <img src={file.secure_url} alt="vinted" />
        console.log("Image sent")
      )}
    </div>
  );
}
