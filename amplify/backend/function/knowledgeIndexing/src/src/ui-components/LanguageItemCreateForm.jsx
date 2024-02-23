/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createLanguageItem } from "../graphql/mutations";
export default function LanguageItemCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    languageCode: "",
    tableCode: "",
    itemCode: "",
    text: "",
  };
  const [languageCode, setLanguageCode] = React.useState(
    initialValues.languageCode
  );
  const [tableCode, setTableCode] = React.useState(initialValues.tableCode);
  const [itemCode, setItemCode] = React.useState(initialValues.itemCode);
  const [text, setText] = React.useState(initialValues.text);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setLanguageCode(initialValues.languageCode);
    setTableCode(initialValues.tableCode);
    setItemCode(initialValues.itemCode);
    setText(initialValues.text);
    setErrors({});
  };
  const validations = {
    languageCode: [{ type: "Required" }],
    tableCode: [{ type: "Required" }],
    itemCode: [{ type: "Required" }],
    text: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          languageCode,
          tableCode,
          itemCode,
          text,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createLanguageItem.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "LanguageItemCreateForm")}
      {...rest}
    >
      <TextField
        label="Language code"
        isRequired={true}
        isReadOnly={false}
        value={languageCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              languageCode: value,
              tableCode,
              itemCode,
              text,
            };
            const result = onChange(modelFields);
            value = result?.languageCode ?? value;
          }
          if (errors.languageCode?.hasError) {
            runValidationTasks("languageCode", value);
          }
          setLanguageCode(value);
        }}
        onBlur={() => runValidationTasks("languageCode", languageCode)}
        errorMessage={errors.languageCode?.errorMessage}
        hasError={errors.languageCode?.hasError}
        {...getOverrideProps(overrides, "languageCode")}
      ></TextField>
      <TextField
        label="Table code"
        isRequired={true}
        isReadOnly={false}
        value={tableCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              languageCode,
              tableCode: value,
              itemCode,
              text,
            };
            const result = onChange(modelFields);
            value = result?.tableCode ?? value;
          }
          if (errors.tableCode?.hasError) {
            runValidationTasks("tableCode", value);
          }
          setTableCode(value);
        }}
        onBlur={() => runValidationTasks("tableCode", tableCode)}
        errorMessage={errors.tableCode?.errorMessage}
        hasError={errors.tableCode?.hasError}
        {...getOverrideProps(overrides, "tableCode")}
      ></TextField>
      <TextField
        label="Item code"
        isRequired={true}
        isReadOnly={false}
        value={itemCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              languageCode,
              tableCode,
              itemCode: value,
              text,
            };
            const result = onChange(modelFields);
            value = result?.itemCode ?? value;
          }
          if (errors.itemCode?.hasError) {
            runValidationTasks("itemCode", value);
          }
          setItemCode(value);
        }}
        onBlur={() => runValidationTasks("itemCode", itemCode)}
        errorMessage={errors.itemCode?.errorMessage}
        hasError={errors.itemCode?.hasError}
        {...getOverrideProps(overrides, "itemCode")}
      ></TextField>
      <TextField
        label="Text"
        isRequired={true}
        isReadOnly={false}
        value={text}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              languageCode,
              tableCode,
              itemCode,
              text: value,
            };
            const result = onChange(modelFields);
            value = result?.text ?? value;
          }
          if (errors.text?.hasError) {
            runValidationTasks("text", value);
          }
          setText(value);
        }}
        onBlur={() => runValidationTasks("text", text)}
        errorMessage={errors.text?.errorMessage}
        hasError={errors.text?.hasError}
        {...getOverrideProps(overrides, "text")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
