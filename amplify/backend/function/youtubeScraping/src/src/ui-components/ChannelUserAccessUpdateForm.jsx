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
import { getChannelUserAccess } from "../graphql/queries";
import { updateChannelUserAccess } from "../graphql/mutations";
export default function ChannelUserAccessUpdateForm(props) {
  const {
    id: idProp,
    channelUserAccess: channelUserAccessModelProp,
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
    channelSubtitle: "",
    channelAvatar: "",
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
  const [channelSubtitle, setChannelSubtitle] = React.useState(
    initialValues.channelSubtitle
  );
  const [channelAvatar, setChannelAvatar] = React.useState(
    initialValues.channelAvatar
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = channelUserAccessRecord
      ? { ...initialValues, ...channelUserAccessRecord }
      : initialValues;
    setAccessId(cleanValues.accessId);
    setChannelId(cleanValues.channelId);
    setChatSpaceId(cleanValues.chatSpaceId);
    setChannelHostId(cleanValues.channelHostId);
    setChannelHostType(cleanValues.channelHostType);
    setAccessType(cleanValues.accessType);
    setChannelName(cleanValues.channelName);
    setChannelDescription(cleanValues.channelDescription);
    setChannelSubtitle(cleanValues.channelSubtitle);
    setChannelAvatar(cleanValues.channelAvatar);
    setErrors({});
  };
  const [channelUserAccessRecord, setChannelUserAccessRecord] = React.useState(
    channelUserAccessModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getChannelUserAccess.replaceAll("__typename", ""),
              variables: { ...idProp },
            })
          )?.data?.getChannelUserAccess
        : channelUserAccessModelProp;
      setChannelUserAccessRecord(record);
    };
    queryData();
  }, [idProp, channelUserAccessModelProp]);
  React.useEffect(resetStateValues, [channelUserAccessRecord]);
  const validations = {
    accessId: [{ type: "Required" }],
    channelId: [{ type: "Required" }],
    chatSpaceId: [{ type: "Required" }],
    channelHostId: [{ type: "Required" }],
    channelHostType: [{ type: "Required" }],
    accessType: [{ type: "Required" }],
    channelName: [{ type: "Required" }],
    channelDescription: [],
    channelSubtitle: [],
    channelAvatar: [],
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
          channelDescription: channelDescription ?? null,
          channelSubtitle: channelSubtitle ?? null,
          channelAvatar: channelAvatar ?? null,
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
            query: updateChannelUserAccess.replaceAll("__typename", ""),
            variables: {
              input: {
                accessId: channelUserAccessRecord.accessId,
                channelId: channelUserAccessRecord.channelId,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ChannelUserAccessUpdateForm")}
      {...rest}
    >
      <TextField
        label="Access id"
        isRequired={true}
        isReadOnly={true}
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
              channelSubtitle,
              channelAvatar,
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
        isReadOnly={true}
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
              channelSubtitle,
              channelAvatar,
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
              channelSubtitle,
              channelAvatar,
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
              channelSubtitle,
              channelAvatar,
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
              channelSubtitle,
              channelAvatar,
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
              channelSubtitle,
              channelAvatar,
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
              channelSubtitle,
              channelAvatar,
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
              channelSubtitle,
              channelAvatar,
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
      <TextField
        label="Channel subtitle"
        isRequired={false}
        isReadOnly={false}
        value={channelSubtitle}
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
              channelDescription,
              channelSubtitle: value,
              channelAvatar,
            };
            const result = onChange(modelFields);
            value = result?.channelSubtitle ?? value;
          }
          if (errors.channelSubtitle?.hasError) {
            runValidationTasks("channelSubtitle", value);
          }
          setChannelSubtitle(value);
        }}
        onBlur={() => runValidationTasks("channelSubtitle", channelSubtitle)}
        errorMessage={errors.channelSubtitle?.errorMessage}
        hasError={errors.channelSubtitle?.hasError}
        {...getOverrideProps(overrides, "channelSubtitle")}
      ></TextField>
      <TextField
        label="Channel avatar"
        isRequired={false}
        isReadOnly={false}
        value={channelAvatar}
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
              channelDescription,
              channelSubtitle,
              channelAvatar: value,
            };
            const result = onChange(modelFields);
            value = result?.channelAvatar ?? value;
          }
          if (errors.channelAvatar?.hasError) {
            runValidationTasks("channelAvatar", value);
          }
          setChannelAvatar(value);
        }}
        onBlur={() => runValidationTasks("channelAvatar", channelAvatar)}
        errorMessage={errors.channelAvatar?.errorMessage}
        hasError={errors.channelAvatar?.hasError}
        {...getOverrideProps(overrides, "channelAvatar")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || channelUserAccessModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || channelUserAccessModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
