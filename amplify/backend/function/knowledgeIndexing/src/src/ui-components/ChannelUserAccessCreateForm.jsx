/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createChannelUserAccess } from "../graphql/mutations";
export default function ChannelUserAccessCreateForm(props) {
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
    accessId: "",
    channelId: "",
    chatSpaceId: "",
    channelHostId: "",
    channelHostType: "",
    accessType: "",
    channelName: "",
    channelDescription: "",
  };
  const [accessId, setAccessId] = React.useState(initialValues.accessId);
  const [channelId, setChannelId] = React.useState(initialValues.channelId);
  const [chatSpaceId, setChatSpaceId] = React.useState(
    initialValues.chatSpaceId
  );
  const [channelHostId, setChannelHostId] = React.useState(
    initialValues.channelHostId
  );
  const [channelHostType, setChannelHostType] = React.useState(
    initialValues.channelHostType
  );
  const [accessType, setAccessType] = React.useState(initialValues.accessType);
  const [channelName, setChannelName] = React.useState(
    initialValues.channelName
  );
  const [channelDescription, setChannelDescription] = React.useState(
    initialValues.channelDescription
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setAccessId(initialValues.accessId);
    setChannelId(initialValues.channelId);
    setChatSpaceId(initialValues.chatSpaceId);
    setChannelHostId(initialValues.channelHostId);
    setChannelHostType(initialValues.channelHostType);
    setAccessType(initialValues.accessType);
    setChannelName(initialValues.channelName);
    setChannelDescription(initialValues.channelDescription);
    setErrors({});
  };
  const validations = {
    accessId: [{ type: "Required" }],
    channelId: [{ type: "Required" }],
    chatSpaceId: [{ type: "Required" }],
    channelHostId: [{ type: "Required" }],
    channelHostType: [{ type: "Required" }],
    accessType: [{ type: "Required" }],
    channelName: [{ type: "Required" }],
    channelDescription: [],
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
          accessId,
          channelId,
          chatSpaceId,
          channelHostId,
          channelHostType,
          accessType,
          channelName,
          channelDescription,
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
            query: createChannelUserAccess.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "ChannelUserAccessCreateForm")}
      {...rest}
    >
      <TextField
        label="Access id"
        isRequired={true}
        isReadOnly={false}
        value={accessId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              accessId: value,
              channelId,
              chatSpaceId,
              channelHostId,
              channelHostType,
              accessType,
              channelName,
              channelDescription,
            };
            const result = onChange(modelFields);
            value = result?.accessId ?? value;
          }
          if (errors.accessId?.hasError) {
            runValidationTasks("accessId", value);
          }
          setAccessId(value);
        }}
        onBlur={() => runValidationTasks("accessId", accessId)}
        errorMessage={errors.accessId?.errorMessage}
        hasError={errors.accessId?.hasError}
        {...getOverrideProps(overrides, "accessId")}
      ></TextField>
      <TextField
        label="Channel id"
        isRequired={true}
        isReadOnly={false}
        value={channelId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              accessId,
              channelId: value,
              chatSpaceId,
              channelHostId,
              channelHostType,
              accessType,
              channelName,
              channelDescription,
            };
            const result = onChange(modelFields);
            value = result?.channelId ?? value;
          }
          if (errors.channelId?.hasError) {
            runValidationTasks("channelId", value);
          }
          setChannelId(value);
        }}
        onBlur={() => runValidationTasks("channelId", channelId)}
        errorMessage={errors.channelId?.errorMessage}
        hasError={errors.channelId?.hasError}
        {...getOverrideProps(overrides, "channelId")}
      ></TextField>
      <TextField
        label="Chat space id"
        isRequired={true}
        isReadOnly={false}
        value={chatSpaceId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              accessId,
              channelId,
              chatSpaceId: value,
              channelHostId,
              channelHostType,
              accessType,
              channelName,
              channelDescription,
            };
            const result = onChange(modelFields);
            value = result?.chatSpaceId ?? value;
          }
          if (errors.chatSpaceId?.hasError) {
            runValidationTasks("chatSpaceId", value);
          }
          setChatSpaceId(value);
        }}
        onBlur={() => runValidationTasks("chatSpaceId", chatSpaceId)}
        errorMessage={errors.chatSpaceId?.errorMessage}
        hasError={errors.chatSpaceId?.hasError}
        {...getOverrideProps(overrides, "chatSpaceId")}
      ></TextField>
      <TextField
        label="Channel host id"
        isRequired={true}
        isReadOnly={false}
        value={channelHostId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              accessId,
              channelId,
              chatSpaceId,
              channelHostId: value,
              channelHostType,
              accessType,
              channelName,
              channelDescription,
            };
            const result = onChange(modelFields);
            value = result?.channelHostId ?? value;
          }
          if (errors.channelHostId?.hasError) {
            runValidationTasks("channelHostId", value);
          }
          setChannelHostId(value);
        }}
        onBlur={() => runValidationTasks("channelHostId", channelHostId)}
        errorMessage={errors.channelHostId?.errorMessage}
        hasError={errors.channelHostId?.hasError}
        {...getOverrideProps(overrides, "channelHostId")}
      ></TextField>
      <SelectField
        label="Channel host type"
        placeholder="Please select an option"
        isDisabled={false}
        value={channelHostType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              accessId,
              channelId,
              chatSpaceId,
              channelHostId,
              channelHostType: value,
              accessType,
              channelName,
              channelDescription,
            };
            const result = onChange(modelFields);
            value = result?.channelHostType ?? value;
          }
          if (errors.channelHostType?.hasError) {
            runValidationTasks("channelHostType", value);
          }
          setChannelHostType(value);
        }}
        onBlur={() => runValidationTasks("channelHostType", channelHostType)}
        errorMessage={errors.channelHostType?.errorMessage}
        hasError={errors.channelHostType?.hasError}
        {...getOverrideProps(overrides, "channelHostType")}
      >
        <option
          children="Private"
          value="PRIVATE"
          {...getOverrideProps(overrides, "channelHostTypeoption0")}
        ></option>
        <option
          children="Company"
          value="COMPANY"
          {...getOverrideProps(overrides, "channelHostTypeoption1")}
        ></option>
      </SelectField>
      <SelectField
        label="Access type"
        placeholder="Please select an option"
        isDisabled={false}
        value={accessType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              accessId,
              channelId,
              chatSpaceId,
              channelHostId,
              channelHostType,
              accessType: value,
              channelName,
              channelDescription,
            };
            const result = onChange(modelFields);
            value = result?.accessType ?? value;
          }
          if (errors.accessType?.hasError) {
            runValidationTasks("accessType", value);
          }
          setAccessType(value);
        }}
        onBlur={() => runValidationTasks("accessType", accessType)}
        errorMessage={errors.accessType?.errorMessage}
        hasError={errors.accessType?.hasError}
        {...getOverrideProps(overrides, "accessType")}
      >
        <option
          children="Owner"
          value="OWNER"
          {...getOverrideProps(overrides, "accessTypeoption0")}
        ></option>
        <option
          children="Admin"
          value="ADMIN"
          {...getOverrideProps(overrides, "accessTypeoption1")}
        ></option>
        <option
          children="Write"
          value="WRITE"
          {...getOverrideProps(overrides, "accessTypeoption2")}
        ></option>
        <option
          children="Read"
          value="READ"
          {...getOverrideProps(overrides, "accessTypeoption3")}
        ></option>
      </SelectField>
      <TextField
        label="Channel name"
        isRequired={true}
        isReadOnly={false}
        value={channelName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              accessId,
              channelId,
              chatSpaceId,
              channelHostId,
              channelHostType,
              accessType,
              channelName: value,
              channelDescription,
            };
            const result = onChange(modelFields);
            value = result?.channelName ?? value;
          }
          if (errors.channelName?.hasError) {
            runValidationTasks("channelName", value);
          }
          setChannelName(value);
        }}
        onBlur={() => runValidationTasks("channelName", channelName)}
        errorMessage={errors.channelName?.errorMessage}
        hasError={errors.channelName?.hasError}
        {...getOverrideProps(overrides, "channelName")}
      ></TextField>
      <TextField
        label="Channel description"
        isRequired={false}
        isReadOnly={false}
        value={channelDescription}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              accessId,
              channelId,
              chatSpaceId,
              channelHostId,
              channelHostType,
              accessType,
              channelName,
              channelDescription: value,
            };
            const result = onChange(modelFields);
            value = result?.channelDescription ?? value;
          }
          if (errors.channelDescription?.hasError) {
            runValidationTasks("channelDescription", value);
          }
          setChannelDescription(value);
        }}
        onBlur={() =>
          runValidationTasks("channelDescription", channelDescription)
        }
        errorMessage={errors.channelDescription?.errorMessage}
        hasError={errors.channelDescription?.hasError}
        {...getOverrideProps(overrides, "channelDescription")}
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
