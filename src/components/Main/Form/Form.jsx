import React, { useState } from "react";
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import { v4 as uuid } from "uuid";

import useStyles from "./styles.js";
import { useExpenseTracker } from "../../../context/context.js";

const initialState = {
  amount: "",
  category: "",
  type: "",
  date: Date()
};

const Form = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const { addTransaction } = useExpenseTracker();

  const createTransaction = () => {
    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuid()
    };
    addTransaction(transaction);
  };

  const onHandleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
    console.log({ name, value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          ...
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select value={formData.type} onChange={onHandleChange} name="type">
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={onHandleChange}
            name="category"
          >
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="business2">Business 2</MenuItem>
            <MenuItem value="business3">Business 3</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          name="amount"
          value={formData.amount}
          onChange={onHandleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          value={formData.date}
          onChange={onHandleChange}
          name="date"
          label="Date"
          fullWidth
        />
      </Grid>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        fullWidth
        onClick={createTransaction}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
