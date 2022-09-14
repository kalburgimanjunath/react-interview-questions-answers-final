import React, { useEffect, useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import ListQuestions from './ListQuestions';
import { Label, FormGroup, Input, Button } from 'reactstrap';

// import { useAlert } from 'react-alert';
export default function AddQuestion({ user }) {
  // const alert = useAlert();

  const [questions, setQuestions] = useState();
  const [image_url, setUrl] = useState();
  useEffect(() => {
    fetch(
      'https://api.airtable.com/v0/appWToptGxYlLEtgo/Interviews?api_key=keyeNXyxxuuYJY19w'
    )
      .then((res) => res.json())
      .then((response) => {
        setQuestions(response.records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [questions]);
  const saveData = (data) => {
    const url = `https://api.airtable.com/v0/appWToptGxYlLEtgo/Interviews`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer keyeNXyxxuuYJY19w',
      },
      body: JSON.stringify(data),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));

    // alert.show('Oh look, an alert!');
  };
  return (
    <div className="row" style={{ padding: 20 }} xs="2">
      <div className="col-6" xs="2">
        <h1>Add Questions</h1>
        <Formik
          initialValues={{
            question: '',
            description: '',
            category: 'ui',
            author: user.user.email,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.question) {
              errors.question = 'Required';
            }
            if (!values.description) {
              errors.description = 'Required';
            }
            if (!values.category) {
              errors.category = 'Required';
            }
            // if (!values.image) {
            //   errors.image = 'Required';
            // }
            // if (!values.url) {
            //   errors.url = 'Required';
            // }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              saveData({ fields: values });
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <FormGroup row>
                <Label htmlFor="question">Question</Label>
                <Field
                  type="question"
                  name="question"
                  placeholder="Enter question"
                />
                <ErrorMessage name="question" component="div" />
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="description">Description</Label>
                <Field
                  type="text"
                  as="textarea"
                  name="description"
                  placeholder="Enter description"
                />
                <ErrorMessage name="description" component="div" />
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="answer">Answer</Label>
                <Field
                  type="text"
                  as="textarea"
                  name="answer"
                  placeholder="Enter answer"
                />
                <ErrorMessage name="answer" component="div" />
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="category">Category</Label>
                <Field
                  type="text"
                  name="category"
                  placeholder="Enter category"
                />
                <ErrorMessage name="description" component="div" />
              </FormGroup>

              <Field type="hidden" name="author" value={user.user.email} />
              <Button type="submit" className="primary" disabled={isSubmitting}>
                Add Question
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="col-6">
        <ListQuestions questions={questions} />
      </div>
    </div>
  );
}
