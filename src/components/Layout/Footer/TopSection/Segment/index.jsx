const Segment = ({ header, children }) => {
  return (
    <div className="my-5 py-1">
      <h5 className="text-xl lg:text-base mb-4 text-customBlack-100 font-medium">
        {header}
      </h5>
      {children}
    </div>
  );
};

export default Segment;
