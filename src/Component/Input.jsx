import Icon from "@mdi/react";

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
export default Input;
