import { useEffect, useRef, useState, type JSX } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, type FormikProps } from "formik";

import Field from "../../components/Field";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import LogoImage from "../../assets/images/logo.png";

import { forgotPasswordApi } from "../../util/ApiUtil";
import type { StandardResponse } from "../../util/ApiUtil";

interface ForgotPasswordValues {
  email: string;
  formMessage?: string;
}

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Required"),
});

const ForgotPassword = (): JSX.Element => {
  const formikRef = useRef<FormikProps<ForgotPasswordValues>>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect((): void => {
    document.title = "Forgot Password | Feed App";
  }, []);

  const onFormSubmit = async (values: ForgotPasswordValues): Promise<void> => {
    if (!isFetching) {
      setIsFetching(true);

      const apiResponse: StandardResponse = await forgotPasswordApi(
        values.email
      );

      if (apiResponse.status === 1) {
        formikRef.current?.setFieldValue(
          "formMessage",
          "Please check your email to reset the password."
        );
      } else {
        formikRef.current?.setFieldValue("formMessage", apiResponse.payLoad);
      }

      setIsFetching(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        <div className="flex items-center w-full mx-auto lg:w-full mt-20 md:mt-0 px-10 md:px-36">
          <div className="flex-1">
            <div className="text-center">
              <Formik
                innerRef={formikRef}
                initialValues={{
                  email: "",
                  formMessage: undefined as string | undefined,
                }}
                validationSchema={ForgotPasswordSchema}
                onSubmit={onFormSubmit}
              >
                {({ values }) => (
                  <Form>
                    {values.formMessage && (
                      <div className="w-full md:w-1/2 mx-auto mb-4">
                        <Badge text={values.formMessage} />
                      </div>
                    )}
                    <img
                      src={LogoImage}
                      width={120}
                      className="mx-auto mb-2"
                      alt="App Logo"
                    />
                    <h2 className="text-4xl font-bold text-center text-gray-700">
                      Forgot Password?
                    </h2>
                    <p className="mt-3 text-gray-500 mb-10">
                      Enter your email below to get a reset link.
                    </p>
                    <div className="my-5 w-60 mx-auto">
                      <Field
                        name="email"
                        id="email"
                        placeholder="name@example.com"
                      />
                    </div>
                    <div className="my-5 w-60 mx-auto">
                      <Button text="Request Link" />
                    </div>
                    <Link
                      to="/user/login"
                      className="inline-block mt-4 text-sm text-gray-400 focus:text-purple-500 hover:text-purple-500 hover:underline"
                    >
                      Back to Login
                    </Link>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;