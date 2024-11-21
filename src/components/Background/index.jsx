import BackgroundImage from "../../assets/images/background.svg";

const Background = () => {
  return (
    <div className="absolute right-0 top-10 h-full hidden xl:block">
      <img src={BackgroundImage} alt="background" className="w-full h-[90vh]" />
    </div>
  );
};

export default Background;
