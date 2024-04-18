import Icon from "@mdi/react";

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
export default Checkbox;
