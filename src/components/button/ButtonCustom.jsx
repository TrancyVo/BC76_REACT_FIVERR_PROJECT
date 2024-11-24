export const ButtonGhost = ({ buttonContent, icon, type = "button" }) => {
  return (
    <button
      type={type}
      className={` py-2 px-4 text-[#62646a] font-semibold hover:text-green-500 duration-300`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {buttonContent}
    </button>
  );
};

export const ButtonOutline = ({
  buttonContent,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-1 px-4 font-semibold text-green-500 border border-green-500 rounded-md duration-300 hover:bg-green-500 hover:text-white ${className}`}
    >
      {buttonContent}
    </button>
  );
};
