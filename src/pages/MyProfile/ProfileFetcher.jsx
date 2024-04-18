import React, { useState, useEffect } from "react";
const ProfileFetcher = ({
  setInfo,
  setFoodAllergies,
  setPetAllergies,
  setPets,
  setLoadProfile,
  setDbInfo,
  setDbPets,
  setDbPetAllergies,
  setDbFoodAllergies,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://andreasb.se/matstafetten/api/?fetch=userInfo"
        );
        const data = await response.json();
        setInfo({
          name: data.name,
          pairWith: data.pairWith,
          address: data.address,
          zipcode: data.zipcode,
          city: data.city,
          phone: data.phone,
          email: data.email,
          miscInfo: data.miscInfo,
          miscAllergy: data.miscAllergy,
        });
        setDbInfo({
          name: data.name,
          pairWith: data.pairWith,
          address: data.address,
          zipcode: data.zipcode,
          city: data.city,
          phone: data.phone,
          email: data.email,
          miscInfo: data.miscInfo,
          miscAllergy: data.miscAllergy,
        });
        setFoodAllergies(data.foodAllergies);
        setDbFoodAllergies(data.foodAllergies);
        setPetAllergies(data.petAllergies);
        setDbPetAllergies(data.petAllergies);
        setPets(data.pets);
        setDbPets(data.pets);
        setLoadProfile(true);
      } catch (error) {
        alert("Failed to load from API");
      }
    };
    fetchData();
  }, []);
  return null;
};

export default ProfileFetcher;
