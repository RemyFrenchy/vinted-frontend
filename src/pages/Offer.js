import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Offer = (token) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted2021.herokuapp.com/offer/${id}`
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  });

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div>
      <h2>{data.product_name}</h2>
      <span>{data.product_price} Euros</span>
      {data.product_details.map((elem, index) => {
        const keys = Object.keys(elem);
        return (
          <div key={index}>
            <span style={{ marginRight: "10px" }}>{keys[0]}</span>
            <span>{elem[keys[0]]}</span>
          </div>
        );
      })}
      <button
        onClick={() => {
          if (Cookies.get("token")) {
            navigate("/payment", {
              state: {
                title: data.product_name,
                price: data.product_price,
              },
            });
          } else {
            navigate("/login");
          }
        }}
      >
        acheter
      </button>
    </div>
  );
};

export default Offer;
