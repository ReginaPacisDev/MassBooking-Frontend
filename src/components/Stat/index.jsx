const Stat = ({ imgUrl, imgAlt, statCount, handleClick, long }) => {
  return (
    <div className={`relative h-[256px] w-full mb-5 ${long && "h-[300px]"}`}>
      <img
        src={imgUrl}
        alt={imgAlt}
        className={`w-[100vw] h-full z-0 object-cover`}
      />
      <div className="absolute w-full h-full bg-customYellow-200 z-10 top-0 left-0" />
      <div className="absolute w-full h-full bg-customGray-400 z-20 top-0 left-0" />
      <div className="absolute z-3 font-Satoshi text-white top-[80px] z-30 left-[20px]">
        <h1 className="text-4xl font-medium font-Satoshi h-[40px]">
          {statCount}
        </h1>
        <h3
          className={`${
            long ? "text-lg" : "text-xl"
          } text-white font-Satoshi h-[30px]`}
        >
          {imgAlt}
        </h3>
        <button
          className="bg-customGreen-100 p-3 rounded-lg mt-3"
          onClick={handleClick}
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default Stat;
