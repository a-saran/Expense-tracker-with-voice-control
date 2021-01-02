import React, { useState, useEffect } from "react";
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
import { useSpeechContext } from "@speechly/react-client";

import useStyles from "./styles.js";
import { useExpenseTracker } from "../../../context/context.js";
import {
  incomeCategories,
  expenseCategories
} from "../../../constants/categories";
import formatDate from "../../../utils/formatDate.js";
import CustomizedSnackBar from "../../SnackBar/SnackBar.jsx";

const initialState = {
  amount: "",
  category: "",
  type: "",
  date: formatDate(new Date())
};

const Form = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const { addTransaction } = useExpenseTracker();
  const { segment } = useSpeechContext();

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setFormData(formData => ({
          ...formData,
          type: "Expense"
        }));
      } else if (segment.intent.intent === "add_income") {
        setFormData(formData => ({
          ...formData,
          type: "Income"
        }));
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        setFormData(initialState);
      }

      segment.entities.forEach(e => {
        const category = `${e.value.charAt(0)}${e.value
          .slice(1)
          .toLowerCase()}`;

        switch (e.type) {
          case "amount":
            setFormData(formData => ({
              ...formData,
              amount: e.value
            }));
            break;
          case "category":
            if (incomeCategories.map(i => i.type).includes(category)) {
              setFormData(formData => ({
                ...formData,
                category,
                type: "Income"
              }));
            } else if (expenseCategories.map(i => i.type).includes(category)) {
              setFormData(formData => ({
                ...formData,
                category,
                type: "Expense"
              }));
            }
            break;
          case "date":
            setFormData(formData => ({
              ...formData,
              date: e.value
            }));
            break;
          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.type &&
        formData.date
      ) {
        createTransaction();
      }
    }
  }, [segment]);

  const createTransaction = () => {
    if (
      !formData.amount ||
      !formData.category ||
      !formData.type ||
      !formData.date
    )
      return;

    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuid()
    };
    addTransaction(transaction);
    setOpen(true);
    setFormData(initialState);
  };

  const onHandleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <CustomizedSnackBar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment && segment.words.map(w => w.value).join(" ")}
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
            {selectedCategories.map(category => (
              <MenuItem key={category.type} value={category.type}>
                {category.type}
              </MenuItem>
            ))}
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
          onChange={({ target: { value } }) =>
            setFormData({ ...formData, date: formatDate(value) })
          }
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
