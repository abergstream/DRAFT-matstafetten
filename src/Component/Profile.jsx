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
  const [info, setInfo] = useState({
    name: "Anaswfa",
    address: "",
    zipcode: "",
    city: "",
    phone: "",
    email: "",
    miscInfo: "",
    miscAllergy: "",
  });
  const [foodAllergies, setFoodAllergies] = useState({
    Nötter: false,
    Mjölk: false,
    Laktos: false,
    Gluten: false,
    Ägg: false,
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
    Pälsdjur: false,
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
  function handleInfo(e) {
    setInfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  }
  console.log(info);
  return (
    <div className="profile__container">
      <section className="profile__section">
        <h2 className="profile__heading">Deltar med</h2>
        <Input
          icon={mdiAccountMultiple}
          placeholder={"Namn"}
          name={"name"}
          value={info.name}
          onchange={handleInfo}
        />
      </section>
      <section className="profile__section">
        <h2 className="profile__heading">Värdplats</h2>
        <Input
          icon={mdiRoadVariant}
          placeholder={"Adress"}
          name={"address"}
          value={info.address}
          onchange={handleInfo}
        />
        <Input
          icon={mdiNumeric}
          placeholder={"Postnummer"}
          name={"zipcode"}
          value={info.zipcode}
          onchange={handleInfo}
        />
        <Input
          icon={mdiCity}
          placeholder={"Ort"}
          name={"city"}
          value={info.city}
          onchange={handleInfo}
        />
      </section>

      <section className="profile__section">
        <h2 className="profile__heading">Information</h2>
        <Input
          icon={mdiPhone}
          placeholder={"Telefonnummer"}
          name={"phone"}
          value={info.phone}
          onchange={handleInfo}
        />
        <Input
          icon={mdiEmail}
          placeholder={"E-post"}
          name={"email"}
          value={info.email}
          onchange={handleInfo}
        />
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
        <Input
          icon={mdiHamburgerOff}
          placeholder={"Övriga allergier"}
          name={"miscAllergy"}
          value={info.miscAllergy}
          onchange={handleInfo}
        />
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
      <section className="profile__section">
        <textarea
          name="miscInfo"
          onChange={handleInfo}
          rows="4"
          class="profile__textbox"
          placeholder="Fritext"
        >
          {info.miscInfo}
        </textarea>
      </section>
    </div>
  );
};

const Input = ({ name, icon, placeholder, value, onchange }) => {
  return (
    <label className="profile__label">
      {icon ? <Icon path={icon} className="profile__icon" /> : ""}
      <input
        name={name}
        className="profile__input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onchange}
      />
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
