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
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createChatSpace } from "../graphql/mutations";
export default function ChatSpaceCreateForm(props) {
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
    hostId: "",
    hostType: "",
    name: "",
    isPublic: false,
    isMultiChannel: false,
    defaultChannelId: "",
    themeId: "",
    defaultLanguage: "",
    admin: "",
  };
  const [hostId, setHostId] = React.useState(initialValues.hostId);
  const [hostType, setHostType] = React.useState(initialValues.hostType);
  const [name, setName] = React.useState(initialValues.name);
  const [isPublic, setIsPublic] = React.useState(initialValues.isPublic);
  const [isMultiChannel, setIsMultiChannel] = React.useState(
    initialValues.isMultiChannel
  );
  const [defaultChannelId, setDefaultChannelId] = React.useState(
    initialValues.defaultChannelId
  );
  const [themeId, setThemeId] = React.useState(initialValues.themeId);
  const [defaultLanguage, setDefaultLanguage] = React.useState(
    initialValues.defaultLanguage
  );
  const [admin, setAdmin] = React.useState(initialValues.admin);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setHostId(initialValues.hostId);
    setHostType(initialValues.hostType);
    setName(initialValues.name);
    setIsPublic(initialValues.isPublic);
    setIsMultiChannel(initialValues.isMultiChannel);
    setDefaultChannelId(initialValues.defaultChannelId);
    setThemeId(initialValues.themeId);
    setDefaultLanguage(initialValues.defaultLanguage);
    setAdmin(initialValues.admin);
    setErrors({});
  };
  const validations = {
    hostId: [{ type: "Required" }],
    hostType: [{ type: "Required" }],
    name: [{ type: "Required" }],
    isPublic: [{ type: "Required" }],
    isMultiChannel: [{ type: "Required" }],
    defaultChannelId: [],
    themeId: [],
    defaultLanguage: [],
    admin: [{ type: "Required" }],
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
          hostId,
          hostType,
          name,
          isPublic,
          isMultiChannel,
          defaultChannelId,
          themeId,
          defaultLanguage,
          admin,
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
            query: createChatSpace.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "ChatSpaceCreateForm")}
      {...rest}
    >
      <TextField
        label="Host id"
        isRequired={true}
        isReadOnly={false}
        value={hostId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hostId: value,
              hostType,
              name,
              isPublic,
              isMultiChannel,
              defaultChannelId,
              themeId,
              defaultLanguage,
              admin,
            };
            const result = onChange(modelFields);
            value = result?.hostId ?? value;
          }
          if (errors.hostId?.hasError) {
            runValidationTasks("hostId", value);
          }
          setHostId(value);
        }}
        onBlur={() => runValidationTasks("hostId", hostId)}
        errorMessage={errors.hostId?.errorMessage}
        hasError={errors.hostId?.hasError}
        {...getOverrideProps(overrides, "hostId")}
      ></TextField>
      <SelectField
        label="Host type"
        placeholder="Please select an option"
        isDisabled={false}
        value={hostType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hostId,
              hostType: value,
              name,
              isPublic,
              isMultiChannel,
              defaultChannelId,
              themeId,
              defaultLanguage,
              admin,
            };
            const result = onChange(modelFields);
            value = result?.hostType ?? value;
          }
          if (errors.hostType?.hasError) {
            runValidationTasks("hostType", value);
          }
          setHostType(value);
        }}
        onBlur={() => runValidationTasks("hostType", hostType)}
        errorMessage={errors.hostType?.errorMessage}
        hasError={errors.hostType?.hasError}
        {...getOverrideProps(overrides, "hostType")}
      >
        <option
          children="Private"
          value="PRIVATE"
          {...getOverrideProps(overrides, "hostTypeoption0")}
        ></option>
        <option
          children="Company"
          value="COMPANY"
          {...getOverrideProps(overrides, "hostTypeoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hostId,
              hostType,
              name: value,
              isPublic,
              isMultiChannel,
              defaultChannelId,
              themeId,
              defaultLanguage,
              admin,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <SwitchField
        label="Is public"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isPublic}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              hostId,
              hostType,
              name,
              isPublic: value,
              isMultiChannel,
              defaultChannelId,
              themeId,
              defaultLanguage,
              admin,
            };
            const result = onChange(modelFields);
            value = result?.isPublic ?? value;
          }
          if (errors.isPublic?.hasError) {
            runValidationTasks("isPublic", value);
          }
          setIsPublic(value);
        }}
        onBlur={() => runValidationTasks("isPublic", isPublic)}
        errorMessage={errors.isPublic?.errorMessage}
        hasError={errors.isPublic?.hasError}
        {...getOverrideProps(overrides, "isPublic")}
      ></SwitchField>
      <SwitchField
        label="Is multi channel"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isMultiChannel}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              hostId,
              hostType,
              name,
              isPublic,
              isMultiChannel: value,
              defaultChannelId,
              themeId,
              defaultLanguage,
              admin,
            };
            const result = onChange(modelFields);
            value = result?.isMultiChannel ?? value;
          }
          if (errors.isMultiChannel?.hasError) {
            runValidationTasks("isMultiChannel", value);
          }
          setIsMultiChannel(value);
        }}
        onBlur={() => runValidationTasks("isMultiChannel", isMultiChannel)}
        errorMessage={errors.isMultiChannel?.errorMessage}
        hasError={errors.isMultiChannel?.hasError}
        {...getOverrideProps(overrides, "isMultiChannel")}
      ></SwitchField>
      <TextField
        label="Default channel id"
        isRequired={false}
        isReadOnly={false}
        value={defaultChannelId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hostId,
              hostType,
              name,
              isPublic,
              isMultiChannel,
              defaultChannelId: value,
              themeId,
              defaultLanguage,
              admin,
            };
            const result = onChange(modelFields);
            value = result?.defaultChannelId ?? value;
          }
          if (errors.defaultChannelId?.hasError) {
            runValidationTasks("defaultChannelId", value);
          }
          setDefaultChannelId(value);
        }}
        onBlur={() => runValidationTasks("defaultChannelId", defaultChannelId)}
        errorMessage={errors.defaultChannelId?.errorMessage}
        hasError={errors.defaultChannelId?.hasError}
        {...getOverrideProps(overrides, "defaultChannelId")}
      ></TextField>
      <TextField
        label="Theme id"
        isRequired={false}
        isReadOnly={false}
        value={themeId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hostId,
              hostType,
              name,
              isPublic,
              isMultiChannel,
              defaultChannelId,
              themeId: value,
              defaultLanguage,
              admin,
            };
            const result = onChange(modelFields);
            value = result?.themeId ?? value;
          }
          if (errors.themeId?.hasError) {
            runValidationTasks("themeId", value);
          }
          setThemeId(value);
        }}
        onBlur={() => runValidationTasks("themeId", themeId)}
        errorMessage={errors.themeId?.errorMessage}
        hasError={errors.themeId?.hasError}
        {...getOverrideProps(overrides, "themeId")}
      ></TextField>
      <TextField
        label="Default language"
        isRequired={false}
        isReadOnly={false}
        value={defaultLanguage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hostId,
              hostType,
              name,
              isPublic,
              isMultiChannel,
              defaultChannelId,
              themeId,
              defaultLanguage: value,
              admin,
            };
            const result = onChange(modelFields);
            value = result?.defaultLanguage ?? value;
          }
          if (errors.defaultLanguage?.hasError) {
            runValidationTasks("defaultLanguage", value);
          }
          setDefaultLanguage(value);
        }}
        onBlur={() => runValidationTasks("defaultLanguage", defaultLanguage)}
        errorMessage={errors.defaultLanguage?.errorMessage}
        hasError={errors.defaultLanguage?.hasError}
        {...getOverrideProps(overrides, "defaultLanguage")}
      ></TextField>
      <TextField
        label="Admin"
        isRequired={true}
        isReadOnly={false}
        value={admin}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hostId,
              hostType,
              name,
              isPublic,
              isMultiChannel,
              defaultChannelId,
              themeId,
              defaultLanguage,
              admin: value,
            };
            const result = onChange(modelFields);
            value = result?.admin ?? value;
          }
          if (errors.admin?.hasError) {
            runValidationTasks("admin", value);
          }
          setAdmin(value);
        }}
        onBlur={() => runValidationTasks("admin", admin)}
        errorMessage={errors.admin?.errorMessage}
        hasError={errors.admin?.hasError}
        {...getOverrideProps(overrides, "admin")}
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
