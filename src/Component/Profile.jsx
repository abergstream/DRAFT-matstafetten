import React, { useState } from "react";
import Icon from "@mdi/react";
import {
  mdiRoadVariant,
  mdiNumeric,
  mdiCity,
  mdiHamburgerOff,
  mdiAccountMultiple,
  mdiPhone,
  mdiEmail,
} from "@mdi/js";

const Profile = () => {
  const [foodAllergies, setFoodAllergies] = useState({
    Nötter: true,
    Mjölk: false,
    Laktos: false,
    Gluten: false,
    Ägg: true,
    Skaldjur: false,
    Vegetarian: false,
    Vegan: false,
  });
  const [pets, setPets] = useState({
    Pälsdjur: false,
    Katt: false,
    Hund: false,
    Kanin: false,
    Fågel: false,
  });
  const [petAllergies, setPetAllergies] = useState({
    Pälsdjur: true,
    Katt: false,
    Hund: false,
    Kanin: false,
    Fågel: false,
  });

  function handleCheckboxChange(e, setState) {
    const key = e.target.id.startsWith("_")
      ? e.target.id.substring(1)
      : e.target.id;

    const checked = e.target.checked;
    setState((prevState) => ({
      ...prevState,
      [key]: checked ? true : false,
    }));
  }
  return (
    <div className="profile__container">
      <section className="profile__section">
        <h2 className="profile__heading">Deltar med</h2>
        <Input icon={mdiAccountMultiple} placeholder={"Namn"} />
      </section>
      <section className="profile__section">
        <h2 className="profile__heading">Värdplats</h2>
        <Input icon={mdiRoadVariant} placeholder={"Adress"} />
        <Input icon={mdiNumeric} placeholder={"Postnummer"} />
        <Input icon={mdiCity} placeholder={"Ort"} />
      </section>

      <section className="profile__section">
        <h2 className="profile__heading">Information</h2>
        <Input icon={mdiPhone} placeholder={"Telefonnummer"} />
        <Input icon={mdiEmail} placeholder={"E-post"} />
      </section>
      <section className="profile__section">
        <h2 className="profile__heading">Matallergier</h2>
        <div className="profile__checkbox-grid">
          {Object.keys(foodAllergies).map((allergy, index) => {
            return (
              <Checkbox
                key={index}
                id={allergy}
                text={allergy}
                value={foodAllergies[allergy]}
                onchange={(e) => handleCheckboxChange(e, setFoodAllergies)}
              />
            );
          })}
        </div>
        <Input icon={mdiHamburgerOff} placeholder={"Övriga allergier"} />
      </section>
      <section className="profile__section">
        <h2 className="profile__heading">Husdjur</h2>
        <div className="profile__checkbox-grid">
          {Object.keys(pets).map((pet, index) => {
            return (
              <Checkbox
                key={index}
                id={pet}
                text={pet}
                value={pets[pet]}
                onchange={(e) => handleCheckboxChange(e, setPets)}
              />
            );
          })}
        </div>
      </section>

      <section className="profile__section">
        <h2 className="profile__heading">Allergier</h2>
        <div className="profile__checkbox-grid">
          {Object.keys(petAllergies).map((petAllergy, index) => {
            return (
              <Checkbox
                key={index}
                id={"_" + petAllergy}
                text={petAllergy}
                value={petAllergies[petAllergy]}
                onchange={(e) => handleCheckboxChange(e, setPetAllergies)}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

const Input = ({ icon, placeholder }) => {
  return (
    <label className="profile__label">
      {icon ? <Icon path={icon} className="profile__icon" /> : ""}
      <input className="profile__input" type="text" placeholder={placeholder} />
    </label>
  );
};
const Checkbox = ({ id, text, value, onchange }) => {
  return (
    <div className="profile__checkbox-container">
      <input
        className="profile__checkbox"
        id={id}
        type="checkbox"
        checked={value}
        onChange={onchange}
      />
      <label className="profile__label-checkbox" htmlFor={id}>
        {text}
      </label>
    </div>
  );
};
export default Profile;
