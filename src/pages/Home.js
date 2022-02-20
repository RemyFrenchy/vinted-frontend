import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const limit = 8;
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted2021.herokuapp.com/offers?limit=${limit}&page=1`
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div>
      {data.offers.map((offer) => {
        return (
          <div
            key={offer._id}
            style={{
              width: "400px",
              border: "1px solid black",
              margin: "10px",
              cursor: "pointer",
            }}
          >
            <Link to={`/offer/${offer._id}`}>
              {offer.owner.account.username}
              <img
                src={offer.product_image.secure_url}
                alt={offer.product_name}
              />
              {offer.product_price}
              {offer.product_details.map((taille, index) => {
                const keys = Object.keys(taille);
                return <div key={index}>{taille[keys[0]]}</div>;
              })}
              {offer.product_name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
