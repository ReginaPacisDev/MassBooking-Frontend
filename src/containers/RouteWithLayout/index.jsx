import Layout from "../../components/Layout";

const RouteWithLayout = ({ children }) => {
  return (
    <div className="w-11/12 my-5 mx-auto">
      <Layout>{children}</Layout>
    </div>
  );
};

export default RouteWithLayout;
