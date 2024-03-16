import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledCard = styled(Card)`
  background: inherit;
  box-shadow: none;
  border: none;

  &::before {
    background: none;
  }

  margin-bottom: 10px;
`;

const StyledCardActions = styled(CardActions)`
  border: 1px solid #007464;
  border-radius: 4px;

  min-height: initial !important;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }

  @media screen and (min-width: 1024px) {
    width: 55%;
  }

  @media screen and (min-width: 1536px) {
    width: 40%;
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: 0;

  @media screen and (min-width: 1024px) {
    width: ${(props) => (props.detailwidth ? props.detailwidth : "55%")};
  }
`;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;

  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const Accordion = ({
  expanded,
  toggleExpanded,
  summary,
  children,
  fullwidth,
}) => {
  return (
    <StyledCard>
      <StyledCardActions disableSpacing onClick={toggleExpanded}>
        <h6 className="text-sm lg:text-lg text-customBlack-600 2xl:text-lg">
          {summary}
        </h6>
        <ExpandMore expand={expanded}>
          <ExpandMoreIcon />
        </ExpandMore>
      </StyledCardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <StyledCardContent detailwidth={fullwidth && "100%"}>
          {children}
        </StyledCardContent>
      </Collapse>
    </StyledCard>
  );
};

export default Accordion;
