import axios from "axios";
import { useEffect, useState } from "react";
import { IAnimal } from "../../models/IAnimal";
import { Rings } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { getLS, setLS } from "../../utils/localStorgage";

import "./Animals.css";

const Animals = () => {
  const [animal, setAnimal] = useState<IAnimal[]>([]);
  const [isPending, setIsPending] = useState(true);
  let animalsInLS = getLS("zooAnimalsInLS");

  //Fetching animals from API. setting useState and LS
  const fetchAnimals = async () => {
    const response = await axios.get<IAnimal[]>(
      "https://animals.azurewebsites.net/api/animals"
    );
    setAnimal(response.data);
    setLS("zooAnimalsInLS", response.data);
  };

  //Checking if there's a key in LS, otherwise fetch
  useEffect(() => {
    if (localStorage.getItem("zooAnimalsInLS")) {
      setAnimal(animalsInLS);
      setIsPending(false);
    } else {
      setTimeout(() => {
        fetchAnimals();
        setIsPending(false);
      }, 1000);
    }
  }, []);

  //Looping through animals and checking time since last fed
  //and returning HTML
  let animalInfo = animal.map((animal) => {
    let msSinceFed = new Date().getTime() - new Date(animal.lastFed).getTime();
    let hSinceFed = Math.floor(msSinceFed / (1000 * 60 * 60));
    let hungry = hSinceFed >= 4;

    return (
      <div key={animal.id} className="animalDiv">
        <img
          src={animal.imageUrl}
          alt={animal.name}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png";
          }}
        />
        <div className="animalText">
          <h2> {animal.name} </h2>
          <p> {animal.shortDescription}</p>
          <br />

          {hungry ? <p>Mata mig! Det har gått 4 timmar hallå</p> : null}
          <br />
          <Link to={"/AnimalDetails/" + animal.id}>
            Läs mer om {animal.name}{" "}
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="main">
      {/* Loading animation when fetch occurs with a timeout */}
      {isPending && (
        <div className="loadingDiv">
          <Rings color="#ffffff" height={80} width={80} />
          Gathering all the animals 4 u!
        </div>
      )}

      {animalInfo}
    </div>
  );
};

export default Animals;
