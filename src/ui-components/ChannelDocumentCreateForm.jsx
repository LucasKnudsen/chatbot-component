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
import { createChannelDocument } from "../graphql/mutations";
export default function ChannelDocumentCreateForm(props) {
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
    channelId: "",
    s3KeyRaw: "",
    s3KeyTranscription: "",
    summary: "",
    fileType: "",
    fileName: "",
    fileSize: "",
    uploadedBy: "",
  };
  const [channelId, setChannelId] = React.useState(initialValues.channelId);
  const [s3KeyRaw, setS3KeyRaw] = React.useState(initialValues.s3KeyRaw);
  const [s3KeyTranscription, setS3KeyTranscription] = React.useState(
    initialValues.s3KeyTranscription
  );
  const [summary, setSummary] = React.useState(initialValues.summary);
  const [fileType, setFileType] = React.useState(initialValues.fileType);
  const [fileName, setFileName] = React.useState(initialValues.fileName);
  const [fileSize, setFileSize] = React.useState(initialValues.fileSize);
  const [uploadedBy, setUploadedBy] = React.useState(initialValues.uploadedBy);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setChannelId(initialValues.channelId);
    setS3KeyRaw(initialValues.s3KeyRaw);
    setS3KeyTranscription(initialValues.s3KeyTranscription);
    setSummary(initialValues.summary);
    setFileType(initialValues.fileType);
    setFileName(initialValues.fileName);
    setFileSize(initialValues.fileSize);
    setUploadedBy(initialValues.uploadedBy);
    setErrors({});
  };
  const validations = {
    channelId: [{ type: "Required" }],
    s3KeyRaw: [],
    s3KeyTranscription: [],
    summary: [],
    fileType: [],
    fileName: [],
    fileSize: [],
    uploadedBy: [],
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
          channelId,
          s3KeyRaw,
          s3KeyTranscription,
          summary,
          fileType,
          fileName,
          fileSize,
          uploadedBy,
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
            query: createChannelDocument.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "ChannelDocumentCreateForm")}
      {...rest}
    >
      <TextField
        label="Channel id"
        isRequired={true}
        isReadOnly={false}
        value={channelId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              channelId: value,
              s3KeyRaw,
              s3KeyTranscription,
              summary,
              fileType,
              fileName,
              fileSize,
              uploadedBy,
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
        label="S3 key raw"
        isRequired={false}
        isReadOnly={false}
        value={s3KeyRaw}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              channelId,
              s3KeyRaw: value,
              s3KeyTranscription,
              summary,
              fileType,
              fileName,
              fileSize,
              uploadedBy,
            };
            const result = onChange(modelFields);
            value = result?.s3KeyRaw ?? value;
          }
          if (errors.s3KeyRaw?.hasError) {
            runValidationTasks("s3KeyRaw", value);
          }
          setS3KeyRaw(value);
        }}
        onBlur={() => runValidationTasks("s3KeyRaw", s3KeyRaw)}
        errorMessage={errors.s3KeyRaw?.errorMessage}
        hasError={errors.s3KeyRaw?.hasError}
        {...getOverrideProps(overrides, "s3KeyRaw")}
      ></TextField>
      <TextField
        label="S3 key transcription"
        isRequired={false}
        isReadOnly={false}
        value={s3KeyTranscription}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              channelId,
              s3KeyRaw,
              s3KeyTranscription: value,
              summary,
              fileType,
              fileName,
              fileSize,
              uploadedBy,
            };
            const result = onChange(modelFields);
            value = result?.s3KeyTranscription ?? value;
          }
          if (errors.s3KeyTranscription?.hasError) {
            runValidationTasks("s3KeyTranscription", value);
          }
          setS3KeyTranscription(value);
        }}
        onBlur={() =>
          runValidationTasks("s3KeyTranscription", s3KeyTranscription)
        }
        errorMessage={errors.s3KeyTranscription?.errorMessage}
        hasError={errors.s3KeyTranscription?.hasError}
        {...getOverrideProps(overrides, "s3KeyTranscription")}
      ></TextField>
      <TextField
        label="Summary"
        isRequired={false}
        isReadOnly={false}
        value={summary}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              channelId,
              s3KeyRaw,
              s3KeyTranscription,
              summary: value,
              fileType,
              fileName,
              fileSize,
              uploadedBy,
            };
            const result = onChange(modelFields);
            value = result?.summary ?? value;
          }
          if (errors.summary?.hasError) {
            runValidationTasks("summary", value);
          }
          setSummary(value);
        }}
        onBlur={() => runValidationTasks("summary", summary)}
        errorMessage={errors.summary?.errorMessage}
        hasError={errors.summary?.hasError}
        {...getOverrideProps(overrides, "summary")}
      ></TextField>
      <TextField
        label="File type"
        isRequired={false}
        isReadOnly={false}
        value={fileType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              channelId,
              s3KeyRaw,
              s3KeyTranscription,
              summary,
              fileType: value,
              fileName,
              fileSize,
              uploadedBy,
            };
            const result = onChange(modelFields);
            value = result?.fileType ?? value;
          }
          if (errors.fileType?.hasError) {
            runValidationTasks("fileType", value);
          }
          setFileType(value);
        }}
        onBlur={() => runValidationTasks("fileType", fileType)}
        errorMessage={errors.fileType?.errorMessage}
        hasError={errors.fileType?.hasError}
        {...getOverrideProps(overrides, "fileType")}
      ></TextField>
      <TextField
        label="File name"
        isRequired={false}
        isReadOnly={false}
        value={fileName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              channelId,
              s3KeyRaw,
              s3KeyTranscription,
              summary,
              fileType,
              fileName: value,
              fileSize,
              uploadedBy,
            };
            const result = onChange(modelFields);
            value = result?.fileName ?? value;
          }
          if (errors.fileName?.hasError) {
            runValidationTasks("fileName", value);
          }
          setFileName(value);
        }}
        onBlur={() => runValidationTasks("fileName", fileName)}
        errorMessage={errors.fileName?.errorMessage}
        hasError={errors.fileName?.hasError}
        {...getOverrideProps(overrides, "fileName")}
      ></TextField>
      <TextField
        label="File size"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={fileSize}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              channelId,
              s3KeyRaw,
              s3KeyTranscription,
              summary,
              fileType,
              fileName,
              fileSize: value,
              uploadedBy,
            };
            const result = onChange(modelFields);
            value = result?.fileSize ?? value;
          }
          if (errors.fileSize?.hasError) {
            runValidationTasks("fileSize", value);
          }
          setFileSize(value);
        }}
        onBlur={() => runValidationTasks("fileSize", fileSize)}
        errorMessage={errors.fileSize?.errorMessage}
        hasError={errors.fileSize?.hasError}
        {...getOverrideProps(overrides, "fileSize")}
      ></TextField>
      <TextField
        label="Uploaded by"
        isRequired={false}
        isReadOnly={false}
        value={uploadedBy}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              channelId,
              s3KeyRaw,
              s3KeyTranscription,
              summary,
              fileType,
              fileName,
              fileSize,
              uploadedBy: value,
            };
            const result = onChange(modelFields);
            value = result?.uploadedBy ?? value;
          }
          if (errors.uploadedBy?.hasError) {
            runValidationTasks("uploadedBy", value);
          }
          setUploadedBy(value);
        }}
        onBlur={() => runValidationTasks("uploadedBy", uploadedBy)}
        errorMessage={errors.uploadedBy?.errorMessage}
        hasError={errors.uploadedBy?.hasError}
        {...getOverrideProps(overrides, "uploadedBy")}
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
