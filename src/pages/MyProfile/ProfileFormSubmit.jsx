import React from "react";

const ProfileFormSubmit = ({
  info,
  foodAllergies,
  petAllergies,
  pets,
  setNotification,
  notification,
}) => {
  const onSubmit = async () => {
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
    formData.append("pairWith", info.pairWith);
    formData.append("address", info.address);
    formData.append("zipcode", info.zipcode);
    formData.append("city", info.city);
    formData.append("phone", info.phone);

    formData.append("foodAllergies", dbFoodAllergies.join(";"));
    formData.append("petAllergies", dbPetAllergies.join(";"));
    formData.append("pets", dbPets.join(";"));

    formData.append("miscAllergies", info.miscAllergy);
    formData.append("miscInfo", info.miscInfo);
    formData.append("email", info.email);

    try {
      const postResponse = await fetch(
        `https://andreasb.se/matstafetten/api/?do=changeProfile`,
        {
          method: "POST",
          body: formData,
        }
      );
      const API_RESULT = await postResponse.json();
      console.log(API_RESULT);
      setNotification(API_RESULT);
      // Handle the response if needed
    } catch (error) {
      alert(`Error posting data: ${error}`);
      // Handle the error
    }
  };

  return (
    <button
      className="button"
      onClick={onSubmit}
      disabled={notification ? true : ""}
    >
      Spara
    </button>
  );
};

export default ProfileFormSubmit;
