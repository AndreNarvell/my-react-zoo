import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { setLS } from "../../utils/localStorgage";

import "./AnimalDetails.css";

const AnimalDetails = () => {
  const [animal, setAnimal] = useState<IAnimal>();
  const [isHungry, setIshungry] = useState(Boolean);
  const { id } = useParams();

  //Setting LS
  let zooAnimalsInLS = localStorage.getItem("zooAnimalsInLS");
  let animals = JSON.parse(zooAnimalsInLS || "[]");

  useEffect(() => {
    //Looping through all the animals in LS and
    //calculating time passed since last fed. 3 and 4h
    for (const animal of animals) {
      if (animal.id === +id!) {
        let msSinceFed =
          new Date().getTime() - new Date(animal.lastFed).getTime();
        let hSinceFed = Math.floor(msSinceFed / (1000 * 60 * 60));

        let hungry = hSinceFed >= 3;
        if (hungry) {
          animal.isFed = false;
          setLS("zooAnimalsInLS", animals);
        }

        let veryHungry = hSinceFed >= 4;
        if (veryHungry) {
          setIshungry(true);
        }
        setAnimal(animal);
      }
    }
  }, [id]);

  //Function for feed button
  let feedAnimal = () => {
    if (zooAnimalsInLS) {
      for (const animal of animals) {
        if (animal.id === +id!) {
          animal.isFed = true;
          animal.lastFed = new Date().toLocaleString();
          setLS("zooAnimalsInLS", animals);
          setAnimal(animal);
          setIshungry(false);
        }
      }
    }
  };

  //Returning HTML
  return (
    <div className="animalPage">
      <div className="animalDetails">
        <img
          src={animal?.imageUrl}
          alt={animal?.name}
          //Back up image
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png";
          }}
        />
        <h1> {animal?.name} </h1>

        <h3>
          {" "}
          <em> {animal?.latinName} </em>{" "}
        </h3>
        <p> {animal?.longDescription} </p>
      </div>
      <div className="animalFeed">
        <p>
          Är {animal?.name} hungrig?
          <br />
          {animal?.isFed ? `Nej, ${animal.name} är inte hungrig!` : "Ja"}
        </p>
        <button onClick={feedAnimal} disabled={animal?.isFed}>
          <span>Mata</span>
        </button>

        <p>Senast matad: {animal?.lastFed.toLocaleString()} </p>
        {isHungry && <p> {animal?.name} är jättehungrig! </p>}
      </div>
      <Link className="linkBack" to={"/"}>
        Ta mig tillbaks!
      </Link>
    </div>
  );
};

export default AnimalDetails;
