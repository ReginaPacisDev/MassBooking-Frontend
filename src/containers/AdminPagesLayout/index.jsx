import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";

import ReginaPacisLogo from "../../assets/images/reginapacis.png";
import Logout from "../../assets/images/logout.svg";
import { Modal } from "../../components/Dialog";
import { AdminPagesLayoutController } from "../../controllers";

const AdminPagesLayout = ({ children, helperText, title }) => {
  const {
    openModal,
    toggleModal,
    handleLogout,
    toggleNav,
    showNav,
    handleNavClick,
    adminLinks,
  } = AdminPagesLayoutController();

  return (
    <div className="lg:flex relative">
      <Modal
        open={openModal}
        handleClose={toggleModal}
        handleLogout={handleLogout}
      />
      <div className="flex justify-between w-full lg:hidden p-5 pb-0">
        <img
          src={ReginaPacisLogo}
          alt="regina pacis logo"
          className="w-[34px]  h-[34px]"
        />
        <IconButton onClick={toggleNav} edge="end">
          <Menu />
        </IconButton>
      </div>
      <div
        className={`bg-customYellow-300 min-h-[100vh] h-full w-[280px] p-5 absolute left-0 top-0 z-50 ${
          showNav ? "block" : "hidden"
        } lg:block`}
      >
        <div className="h-[90vh] flex flex-col justify-between">
          <div>
            <div className="flex flex-col relative z-40 text-center pb-10">
              <img
                src={ReginaPacisLogo}
                alt="regina pacis logo"
                className="w-[34px] lg:w-[70px] h-[34px] lg:h-[70px] mx-auto"
              />
              <h6 className="font-Museo text-base lg:text-base text-customGreen-100 font-medium">
                Regina Pacis Catholic Church
              </h6>
              <h6 className="font-Museo text-base lg:text-xs text-customGreen-100 font-medium">
                REGINA PACIS
              </h6>
            </div>
            <div>
              {adminLinks.map((adminLink) => {
                const activePath = location.pathname === adminLink.to;
                return (
                  <button
                    onClick={() => handleNavClick(adminLink.to)}
                    className={`flex items-start mb-10 w-full ${
                      activePath ? "border-l-[3px] border-customGreen-100" : ""
                    }`}
                    key={adminLink.to}
                  >
                    <img
                      src={adminLink.imgUrl}
                      alt={adminLink.text}
                      className={`${activePath ? "ml-3" : ""} mr-3 pt-[2px]`}
                    />
                    <h6 className="font-Museo text-base lg:text-base text-customGreen-100 font-medium">
                      {adminLink.text}
                    </h6>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <button onClick={toggleModal}>
              <div className="flex">
                <img src={Logout} alt="Logout" className="mr-3" />
                <h6 className="font-Museo text-base lg:text-base text-customGreen-100 font-medium">
                  Logout
                </h6>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[calc(100%_-_280px)] bg-customGray-300 p-5 font-Museo relative lg:ml-[280px] min-h-[100vh]">
        <header className="absolute bg-white top-0 left-0 w-full p-5">
          <h2 className="text-base lg:text-2xl text-customBlack-200">
            {title}
          </h2>
          {helperText && (
            <h6 className="text-sm text-customBlack-200">{helperText}</h6>
          )}
        </header>
        <div className="pt-[120px]">{children}</div>
      </div>
    </div>
  );
};

export default AdminPagesLayout;
