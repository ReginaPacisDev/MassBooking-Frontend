const SocialLink = ({ imgUrl, alt }) => {
  return (
    <button>
      <img src={imgUrl} alt={alt} />
    </button>
  );
};

export default SocialLink;
