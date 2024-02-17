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
import { getUser } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
export default function UserUpdateForm(props) {
  const {
    id: idProp,
    user: userModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    id: "",
    organizationId: "",
    chatSpaceId: "",
    email: "",
    cognitoId: "",
    invitedOn: "",
    joinedOn: "",
    status: "",
  };
  const [id, setId] = React.useState(initialValues.id);
  const [organizationId, setOrganizationId] = React.useState(
    initialValues.organizationId
  );
  const [chatSpaceId, setChatSpaceId] = React.useState(
    initialValues.chatSpaceId
  );
  const [email, setEmail] = React.useState(initialValues.email);
  const [cognitoId, setCognitoId] = React.useState(initialValues.cognitoId);
  const [invitedOn, setInvitedOn] = React.useState(initialValues.invitedOn);
  const [joinedOn, setJoinedOn] = React.useState(initialValues.joinedOn);
  const [status, setStatus] = React.useState(initialValues.status);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userRecord
      ? { ...initialValues, ...userRecord }
      : initialValues;
    setId(cleanValues.id);
    setOrganizationId(cleanValues.organizationId);
    setChatSpaceId(cleanValues.chatSpaceId);
    setEmail(cleanValues.email);
    setCognitoId(cleanValues.cognitoId);
    setInvitedOn(cleanValues.invitedOn);
    setJoinedOn(cleanValues.joinedOn);
    setStatus(cleanValues.status);
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(userModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getUser.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUser
        : userModelProp;
      setUserRecord(record);
    };
    queryData();
  }, [idProp, userModelProp]);
  React.useEffect(resetStateValues, [userRecord]);
  const validations = {
    id: [{ type: "Required" }],
    organizationId: [],
    chatSpaceId: [],
    email: [{ type: "Required" }],
    cognitoId: [{ type: "Required" }],
    invitedOn: [],
    joinedOn: [],
    status: [],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          id,
          organizationId: organizationId ?? null,
          chatSpaceId: chatSpaceId ?? null,
          email,
          cognitoId,
          invitedOn: invitedOn ?? null,
          joinedOn: joinedOn ?? null,
          status: status ?? null,
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
            query: updateUser.replaceAll("__typename", ""),
            variables: {
              input: {
                id: userRecord.id,
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
      {...getOverrideProps(overrides, "UserUpdateForm")}
      {...rest}
    >
      <TextField
        label="Id"
        isRequired={true}
        isReadOnly={true}
        value={id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id: value,
              organizationId,
              chatSpaceId,
              email,
              cognitoId,
              invitedOn,
              joinedOn,
              status,
            };
            const result = onChange(modelFields);
            value = result?.id ?? value;
          }
          if (errors.id?.hasError) {
            runValidationTasks("id", value);
          }
          setId(value);
        }}
        onBlur={() => runValidationTasks("id", id)}
        errorMessage={errors.id?.errorMessage}
        hasError={errors.id?.hasError}
        {...getOverrideProps(overrides, "id")}
      ></TextField>
      <TextField
        label="Organization id"
        isRequired={false}
        isReadOnly={false}
        value={organizationId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              organizationId: value,
              chatSpaceId,
              email,
              cognitoId,
              invitedOn,
              joinedOn,
              status,
            };
            const result = onChange(modelFields);
            value = result?.organizationId ?? value;
          }
          if (errors.organizationId?.hasError) {
            runValidationTasks("organizationId", value);
          }
          setOrganizationId(value);
        }}
        onBlur={() => runValidationTasks("organizationId", organizationId)}
        errorMessage={errors.organizationId?.errorMessage}
        hasError={errors.organizationId?.hasError}
        {...getOverrideProps(overrides, "organizationId")}
      ></TextField>
      <TextField
        label="Chat space id"
        isRequired={false}
        isReadOnly={false}
        value={chatSpaceId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              organizationId,
              chatSpaceId: value,
              email,
              cognitoId,
              invitedOn,
              joinedOn,
              status,
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
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              organizationId,
              chatSpaceId,
              email: value,
              cognitoId,
              invitedOn,
              joinedOn,
              status,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Cognito id"
        isRequired={true}
        isReadOnly={false}
        value={cognitoId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              organizationId,
              chatSpaceId,
              email,
              cognitoId: value,
              invitedOn,
              joinedOn,
              status,
            };
            const result = onChange(modelFields);
            value = result?.cognitoId ?? value;
          }
          if (errors.cognitoId?.hasError) {
            runValidationTasks("cognitoId", value);
          }
          setCognitoId(value);
        }}
        onBlur={() => runValidationTasks("cognitoId", cognitoId)}
        errorMessage={errors.cognitoId?.errorMessage}
        hasError={errors.cognitoId?.hasError}
        {...getOverrideProps(overrides, "cognitoId")}
      ></TextField>
      <TextField
        label="Invited on"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={invitedOn && convertToLocal(new Date(invitedOn))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              id,
              organizationId,
              chatSpaceId,
              email,
              cognitoId,
              invitedOn: value,
              joinedOn,
              status,
            };
            const result = onChange(modelFields);
            value = result?.invitedOn ?? value;
          }
          if (errors.invitedOn?.hasError) {
            runValidationTasks("invitedOn", value);
          }
          setInvitedOn(value);
        }}
        onBlur={() => runValidationTasks("invitedOn", invitedOn)}
        errorMessage={errors.invitedOn?.errorMessage}
        hasError={errors.invitedOn?.hasError}
        {...getOverrideProps(overrides, "invitedOn")}
      ></TextField>
      <TextField
        label="Joined on"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={joinedOn && convertToLocal(new Date(joinedOn))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              id,
              organizationId,
              chatSpaceId,
              email,
              cognitoId,
              invitedOn,
              joinedOn: value,
              status,
            };
            const result = onChange(modelFields);
            value = result?.joinedOn ?? value;
          }
          if (errors.joinedOn?.hasError) {
            runValidationTasks("joinedOn", value);
          }
          setJoinedOn(value);
        }}
        onBlur={() => runValidationTasks("joinedOn", joinedOn)}
        errorMessage={errors.joinedOn?.errorMessage}
        hasError={errors.joinedOn?.hasError}
        {...getOverrideProps(overrides, "joinedOn")}
      ></TextField>
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              organizationId,
              chatSpaceId,
              email,
              cognitoId,
              invitedOn,
              joinedOn,
              status: value,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      >
        <option
          children="Invited"
          value="INVITED"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Active"
          value="ACTIVE"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
        <option
          children="Archived"
          value="ARCHIVED"
          {...getOverrideProps(overrides, "statusoption2")}
        ></option>
      </SelectField>
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
          isDisabled={!(idProp || userModelProp)}
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
              !(idProp || userModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
