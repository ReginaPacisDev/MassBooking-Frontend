import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/system";

import { GeneralSettings, SuperAdmin } from "../../containers/Settings";
import { SettingsController } from "../../controllers";

export const StyledTab = styled(Tab)`
  font-family: Museo;
  text-transform: capitalize;
  font-size: 18px;
  color: #aaaaaa;

  &.Mui-selected {
    color: #007464;
    border-bottom: 2px solid #007464 !important;
  }
`;

export const StyledTabs = styled(Tabs)`
  text-align: center;

  & .MuiTabs-flexContainer {
    margin-left: auto;
    margin-right: auto;
  }

  & .MuiTabs-indicator {
    display: none;
  }
`;

const Settings = () => {
  const { value, isSuperAdmin, handleChange } = SettingsController();

  return (
    <div className="mt-[-50px] lg:px-10">
      {isSuperAdmin && (
        <div className="w-full lg:w-[400px]">
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyledTab label="General Settings" />
            <StyledTab label="Super Admin Privileges" />
          </StyledTabs>
        </div>
      )}

      <div className={`lg:w-[500px] ${isSuperAdmin ? "mt-10" : ""}`}>
        {value === 0 ? <GeneralSettings /> : <SuperAdmin />}
      </div>
    </div>
  );
};

export default Settings;
