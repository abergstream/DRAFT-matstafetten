import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import Input from "../Component/Input";
import Checkbox from "../Component/Checkbox";

import ProfileFetcher from "./MyProfile/ProfileFetcher";
import { mdiLoading } from "@mdi/js";
import ProfileForm from "./MyProfile/ProfileForm";

const MySettings = () => {
  const [loadProfile, setLoadProfile] = useState(false);
  const [notification, setNotification] = useState("");
  const [dbInfo, setDbInfo] = useState("");
  const [dbPets, setDbPets] = useState("");
  const [dbPetAllergies, setDbPetAllergies] = useState("");
  const [dbFoodAllergies, setDbFoodAllergies] = useState("");
  const [info, setInfo] = useState({
    name: "",
    pairWith: "",
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

  const handleCheckboxChange = (e, setState) => {
    const checked = e.target.checked;
    const key = e.target.id.startsWith("_")
      ? e.target.id.substring(1)
      : e.target.id;

    setState((prevState) => ({
      ...prevState,
      [key]: checked ? true : false,
    }));
  };

  const handleInfo = (e) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  };

  if (notification) {
    setTimeout(() => {
      const notiContainer = document.getElementById("notiContainer");

      notification == "Failed to update database"
        ? notiContainer.classList.add("profile__notification--error")
        : notiContainer.classList.add("profile__notification--show");
    }, 50);
    setTimeout(() => {
      notiContainer.classList.remove("profile__notification--show");
    }, 4000);
    setTimeout(() => {
      setNotification("");
    }, 4500);
  }
  console.log(dbInfo, dbPets, dbPetAllergies, dbFoodAllergies);
  return (
    <>
      <ProfileFetcher
        setInfo={setInfo}
        setFoodAllergies={setFoodAllergies}
        setPetAllergies={setPetAllergies}
        setPets={setPets}
        setLoadProfile={setLoadProfile}
        setDbInfo={setDbInfo}
        setDbPets={setDbPets}
        setDbPetAllergies={setDbPetAllergies}
        setDbFoodAllergies={setDbFoodAllergies}
      />
      {loadProfile ? (
        <>
          {notification ? (
            <aside id="notiContainer" className="profile__notification">
              {notification}
            </aside>
          ) : (
            ""
          )}
          <ProfileForm
            info={info}
            foodAllergies={foodAllergies}
            setFoodAllergies={setFoodAllergies}
            handleInfo={handleInfo}
            pets={pets}
            setPets={setPets}
            petAllergies={petAllergies}
            setPetAllergies={setPetAllergies}
            setNotification={setNotification}
            notification={notification}
            handleCheckboxChange={handleCheckboxChange}
          />
        </>
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
export default MySettings;
