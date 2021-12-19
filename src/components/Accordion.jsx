import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';

const AccordionStyled = styled((props) => <Accordion {...props} />)(({ theme }) => ({
  backgroundColor: '#919198',
}));
const AccordionSummaryStyled = styled((props) => (
  <AccordionSummary {...props} />
))(({ theme }) => ({
  backgroundColor: "rgb(31, 3, 3)",
}));
const AccordionDetailsStyled = styled((props) => (
  <AccordionDetails {...props} />
))(({ theme }) => ({
  backgroundColor: "rgb(216, 119, 151)",
}));

export { AccordionStyled, AccordionSummaryStyled, AccordionDetailsStyled };
