import React from "react";
import { useSnackbar } from "notistack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/system";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const SnackBar = React.forwardRef((props, ref) => {
  const {
    id,
    options: { variant, message, title, additionalData },
  } = props;

  const { closeSnackbar } = useSnackbar();

  const handleDismiss = () => {
    closeSnackbar(id);
  };

  const renderAdditionalData = () => {
    if (additionalData) {
      if (typeof additionalData === "string") {
        return (
          <Lists>
            <ListItem>{additionalData}</ListItem>
          </Lists>
        );
      }

      if (additionalData.length) {
        return (
          <Lists>
            {additionalData.map((data) => (
              <ListItem key={data}>{data}</ListItem>
            ))}
          </Lists>
        );
      }

      return <p className="text-white text-xs">Please contact developer</p>;
    }

    return <></>;
  };

  return (
    <>
      <StyledCard ref={ref} data-testid="snack-bar">
        <Alert severity={variant} onClose={handleDismiss}>
          <Title variant="h6">{title}</Title>
          <Content variant="body2">{message}</Content>
          {renderAdditionalData()}
        </Alert>
      </StyledCard>
    </>
  );
});

SnackBar.displayName = "SnackBar";

const StyledCard = styled(Card)`
  ${(props) => props.theme.breakpoints.up("sm")} {
    min-width: 344px;
    max-width: 900px;
  }
`;

const Title = styled(Typography)`
  font-size: 14px;
  font-weight: 700;
`;

const Content = styled(Typography)`
  font-size: 12px;
  font-weight: 500;
  margin-top: 5px;
`;

const Lists = styled("ul")`
  margin: 5px 0px 0px 0px;
  padding: 0px;
  font-size: 12px;
`;

const ListItem = styled("li")`
  margin-top: 5px;
`;

export default SnackBar;
