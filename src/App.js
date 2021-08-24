import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { addInput, removeInput } from "./actions";
import { Button, TextField, Paper } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";

class App extends Component {
  showError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="">
          <div className="">{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, label, meta }) => {
    const error = meta.error && meta.touched ? true : false;
    return (
      <div className="">
        <TextField
          {...input}
          label={label}
          variant="outlined"
          id="margin-normal"
          error={error}
        />
        {this.showError(meta)}
      </div>
    );
  };
  onSubmit = (formValues) => {
    console.log(formValues);
  };

  addField = (event) => {
    this.props.addInput();
  };

  required = (value) => (value ? undefined : "Required");

  render() {
    return (
      <Paper style={{ padding: "10px" }}>
        <Grid container spacing={0} direction="column" alignItems="center">
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            {this.props.manageInput.map((field, i) => {
              return (
                <div key={i}>
                  <div>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <Field
                          name={`name-${i}`}
                          component={this.renderInput}
                          label="Name"
                          validate={this.required}
                        />
                      </Grid>
                      <Grid item>
                        <Field
                          name={`email-${i}`}
                          component={this.renderInput}
                          label="Email"
                          validate={this.required}
                        />
                      </Grid>
                      {i > 0 ? (
                        <Grid item>
                          <Button onClick={() => this.props.removeInput()}>
                            <CloseIcon style={{ cursor: "pointer" }} />
                          </Button>
                        </Grid>
                      ) : null}
                    </Grid>
                  </div>
                </div>
              );
            })}
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <Button
                  onClick={() => this.addField()}
                  variant="contained"
                  color="primary"
                >
                  <AddIcon />
                </Button>
              </Grid>

              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return { manageInput: state.manageInputFields.fields };
};
export default reduxForm({ form: "form" })(
  connect(mapStateToProps, { addInput, removeInput })(App)
);
