import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import {
  mdiRoadVariant,
  mdiNumeric,
  mdiCity,
  mdiHamburgerOff,
  mdiAccountMultiple,
  mdiPhone,
  mdiEmail,
  mdiPeanut,
  mdiCup,
  mdiBaguette,
  mdiEgg,
  mdiFish,
  mdiCorn,
  mdiCowOff,
  mdiTortoise,
  mdiHorse,
  mdiCat,
  mdiDog,
  mdiRabbit,
  mdiBird,
  mdiCow,
  mdiLoading,
} from "@mdi/js";

const Profile = () => {
  const [loadProfile, setLoadProfile] = useState(false);
  const [info, setInfo] = useState({
    name: "",
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
    Laktos: false,
    Mjölk: false,
    Gluten: false,
    Ägg: false,
    Skaldjur: false,
    Fisk: false,
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
  const foodAllergyIcons = [
    mdiPeanut,
    mdiCup,
    mdiCow,
    mdiBaguette,
    mdiEgg,
    mdiTortoise,
    mdiFish,
    mdiCowOff,
    mdiCorn,
  ];
  const allergyIcons = [mdiHorse, mdiCat, mdiDog, mdiRabbit, mdiBird];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://andreasb.se/matstafetten/api/?fetch=userInfo"
        );
        const data = await response.json();
        setInfo({
          name: data.name,
          address: data.address,
          zipcode: data.zipcode,
          city: data.city,
          phone: data.phone,
          email: data.email,
          miscInfo: data.miscInfo,
          miscAllergy: data.miscAllergy,
        });
        setFoodAllergies(data.foodAllergies);
        setPetAllergies(data.petAllergies);
        setPets(data.pets);
        setLoadProfile(true);
      } catch (error) {
        alert("Failed to load from API");
      }
    };
    fetchData();
  }, []);
  function handleCheckboxChange(e, setState) {
    const checked = e.target.checked;
    const key = e.target.id.startsWith("_")
      ? e.target.id.substring(1)
      : e.target.id;

    setState((prevState) => ({
      ...prevState,
      [key]: checked ? true : false,
    }));
  }

  function handleInfo(e) {
    console.log(info);
    setInfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  }
  function handleSubmit() {
    const dbPets = Object.keys(pets).filter((pet) => {
      return pets[pet] === true;
    });

    const dbFoodAllergies = Object.keys(foodAllergies).filter((allergy) => {
      return foodAllergies[allergy] === true;
    });

    const dbPetAllergies = Object.keys(petAllergies).filter((allergy) => {
      return petAllergies[allergy] === true;
    });

    const formData = new FormData();
    formData.append("pair_with", info.name);
    formData.append("address", info.address);
    formData.append("zipcode", info.zipcode);
    formData.append("city", info.city);
    formData.append("mobile", info.phone);

    formData.append("food_allergies", dbFoodAllergies);
    formData.append("pet_allergies", dbPetAllergies);
    formData.append("pets", dbPets);

    formData.append("misc_allergies", info.miscAllergy);
    formData.append("email", info.email);
    console.log(formData);
  }
  return (
    <>
      {loadProfile ? (
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
            <p className="profile__text">
              Vänligen fyll i fullständig information om adressen ni kommer att
              hålla er bjudning på
            </p>
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
            <h2 className="profile__heading">Matallergier</h2>
            <p className="profile__text">
              Vänligen skriv i textfältet om allergin är
              <em> luftburen</em>
            </p>
            <div className="profile__checkbox-grid">
              {Object.keys(foodAllergies).map((allergy, index) => {
                return (
                  <Checkbox
                    key={index}
                    id={allergy}
                    text={allergy}
                    value={foodAllergies[allergy]}
                    icon={foodAllergyIcons[index]}
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
            <p className="profile__text">
              Finns det några husdjur där ni ska ha er bjudning?
            </p>
            <div className="profile__checkbox-grid">
              {Object.keys(pets).map((pet, index) => {
                return (
                  <Checkbox
                    key={index}
                    id={pet}
                    text={pet}
                    value={pets[pet]}
                    icon={allergyIcons[index]}
                    onchange={(e) => handleCheckboxChange(e, setPets)}
                  />
                );
              })}
            </div>
          </section>

          <section className="profile__section">
            <h2 className="profile__heading">Allergier</h2>
            <p className="profile__text">
              Är någon av er allergisk mot något husdjur?
            </p>
            <div className="profile__checkbox-grid">
              {Object.keys(petAllergies).map((petAllergy, index) => {
                return (
                  <Checkbox
                    key={index}
                    id={"_" + petAllergy}
                    text={petAllergy}
                    value={petAllergies[petAllergy]}
                    icon={allergyIcons[index]}
                    onchange={(e) => handleCheckboxChange(e, setPetAllergies)}
                  />
                );
              })}
            </div>
          </section>
          <section className="profile__section">
            <h2 className="profile__heading">Övrigt</h2>
            <p className="profile__text">
              Har du någon övrig information vi bör veta om?
            </p>
            <textarea
              name="miscInfo"
              onChange={handleInfo}
              rows="4"
              className="profile__textbox"
              placeholder="Fritext"
              value={info.miscInfo}
            ></textarea>
          </section>

          <section className="profile__section">
            <h2 className="profile__heading">Information</h2>
            <p className="profile__text">
              Har du bytt e-post eller telefonnummer?
            </p>
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

          <section className="profile__section profile__section--button">
            <button className="button" onClick={handleSubmit}>
              Spara
            </button>
          </section>
        </div>
      ) : (
        <div className="loading-container">
          <Icon
            className="icon__loading"
            path={mdiLoading}
            size={5}
            spin={0.8}
          />
        </div>
      )}
    </>
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
const Checkbox = ({ id, text, value, onchange, icon }) => {
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
        <Icon path={icon} size={2} className="profile__icon" />
        {text}
      </label>
    </div>
  );
};

export default Profile;
