const Link = ({ linkPath, linkText }) => (
  <a
    href={linkPath}
    className="text-base mb-4 font-light"
    target="_blank"
    rel="noreferrer"
  >
    {linkText}
  </a>
);

export default Link;
