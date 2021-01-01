import React from "react";
import {
  CardHeader,
  Card,
  CardContent,
  Grid,
  Divider,
  Typography
} from "@material-ui/core";

import useStyles from "./styles";

const Main = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="Expense Tracker" subheader="Powered by speechly" />
      <CardContent>
        <Typography align="center" variant="h5">
          Total balance $100
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ lineHeight: "1.5em", marginTop: "20px" }}
        >
          {/* InfoCard */}
          Tyy saying: add income for $100 in category salary for monday...
        </Typography>
        <Divider />
        {/* Form */}
      </CardContent>
      <CardContent className={classes.CardContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* List */}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Main;
