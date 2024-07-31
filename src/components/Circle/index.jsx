const Circle = ({ type }) => {
  return (
    <div
      className={`w-[10px] h-[10px] rounded-xl ${
        type === "Admin" ? "bg-purple-600" : "bg-green-600"
      } absolute top-3 right-3`}
    />
  );
};

export default Circle;
