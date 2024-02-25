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
    title: "",
    s3KeyRawText: "",
    s3KeyOriginal: "",
    description: "",
    includeInLibrary: false,
    documentType: "",
    source: "",
    fileName: "",
    fileType: "",
    fileSuffix: "",
    fileSize: "",
    uploadedBy: "",
  };
  const [channelId, setChannelId] = React.useState(initialValues.channelId);
  const [title, setTitle] = React.useState(initialValues.title);
  const [s3KeyRawText, setS3KeyRawText] = React.useState(
    initialValues.s3KeyRawText
  );
  const [s3KeyOriginal, setS3KeyOriginal] = React.useState(
    initialValues.s3KeyOriginal
  );
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [includeInLibrary, setIncludeInLibrary] = React.useState(
    initialValues.includeInLibrary
  );
  const [documentType, setDocumentType] = React.useState(
    initialValues.documentType
  );
  const [source, setSource] = React.useState(initialValues.source);
  const [fileName, setFileName] = React.useState(initialValues.fileName);
  const [fileType, setFileType] = React.useState(initialValues.fileType);
  const [fileSuffix, setFileSuffix] = React.useState(initialValues.fileSuffix);
  const [fileSize, setFileSize] = React.useState(initialValues.fileSize);
  const [uploadedBy, setUploadedBy] = React.useState(initialValues.uploadedBy);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setChannelId(initialValues.channelId);
    setTitle(initialValues.title);
    setS3KeyRawText(initialValues.s3KeyRawText);
    setS3KeyOriginal(initialValues.s3KeyOriginal);
    setDescription(initialValues.description);
    setIncludeInLibrary(initialValues.includeInLibrary);
    setDocumentType(initialValues.documentType);
    setSource(initialValues.source);
    setFileName(initialValues.fileName);
    setFileType(initialValues.fileType);
    setFileSuffix(initialValues.fileSuffix);
    setFileSize(initialValues.fileSize);
    setUploadedBy(initialValues.uploadedBy);
    setErrors({});
  };
  const validations = {
    channelId: [{ type: "Required" }],
    title: [{ type: "Required" }],
    s3KeyRawText: [],
    s3KeyOriginal: [],
    description: [],
    includeInLibrary: [{ type: "Required" }],
    documentType: [{ type: "Required" }],
    source: [],
    fileName: [],
    fileType: [],
    fileSuffix: [],
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
          title,
          s3KeyRawText,
          s3KeyOriginal,
          description,
          includeInLibrary,
          documentType,
          source,
          fileName,
          fileType,
          fileSuffix,
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
              title,
              s3KeyRawText,
              s3KeyOriginal,
              description,
              includeInLibrary,
              documentType,
              source,
              fileName,
              fileType,
              fileSuffix,
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
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              channelId,
              title: value,
              s3KeyRawText,
              s3KeyOriginal,
              description,
              includeInLibrary,
              documentType,
              source,
              fileName,
              fileType,
              fileSuffix,
              fileSize,
              uploadedBy,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="S3 key raw text"
        isRequired={false}
        isReadOnly={false}
        value={s3KeyRawText}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              channelId,
              title,
              s3KeyRawText: value,
              s3KeyOriginal,
              description,
              includeInLibrary,
              documentType,
              source,
              fileName,
              fileType,
              fileSuffix,
              fileSize,
              uploadedBy,
            };
            const result = onChange(modelFields);
            value = result?.s3KeyRawText ?? value;
          }
          if (errors.s3KeyRawText?.hasError) {
            runValidationTasks("s3KeyRawText", value);
          }
          setS3KeyRawText(value);
        }}
        onBlur={() => runValidationTasks("s3KeyRawText", s3KeyRawText)}
        errorMessage={errors.s3KeyRawText?.errorMessage}
        hasError={errors.s3KeyRawText?.hasError}
        {...getOverrideProps(overrides, "s3KeyRawText")}
      ></TextField>
      <TextField
        label="S3 key original"
        isRequired={false}
        isReadOnly={false}
        value={s3KeyOriginal}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              channelId,
              title,
              s3KeyRawText,
              s3KeyOriginal: value,
              description,
              includeInLibrary,
              documentType,
              source,
              fileName,
              fileType,
              fileSuffix,
              fileSize,
              uploadedBy,
            };
            const result = onChange(modelFields);
            value = result?.s3KeyOriginal ?? value;
          }
          if (errors.s3KeyOriginal?.hasError) {
            runValidationTasks("s3KeyOriginal", value);
          }
          setS3KeyOriginal(value);
        }}
        onBlur={() => runValidationTasks("s3KeyOriginal", s3KeyOriginal)}
        errorMessage={errors.s3KeyOriginal?.errorMessage}
        hasError={errors.s3KeyOriginal?.hasError}
        {...getOverrideProps(overrides, "s3KeyOriginal")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              channelId,
              title,
              s3KeyRawText,
              s3KeyOriginal,
              description: value,
              includeInLibrary,
              documentType,
              source,
              fileName,
              fileType,
              fileSuffix,
              fileSize,
              uploadedBy,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <SwitchField
        label="Include in library"
        defaultChecked={false}
        isDisabled={false}
        isChecked={includeInLibrary}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              channelId,
              title,
              s3KeyRawText,
              s3KeyOriginal,
              description,
              includeInLibrary: value,
              documentType,
              source,
              fileName,
              fileType,
              fileSuffix,
              fileSize,
              uploadedBy,
            };
            const result = onChange(modelFields);
            value = result?.includeInLibrary ?? value;
          }
          if (errors.includeInLibrary?.hasError) {
            runValidationTasks("includeInLibrary", value);
          }
          setIncludeInLibrary(value);
        }}
        onBlur={() => runValidationTasks("includeInLibrary", includeInLibrary)}
        errorMessage={errors.includeInLibrary?.errorMessage}
        hasError={errors.includeInLibrary?.hasError}
        {...getOverrideProps(overrides, "includeInLibrary")}
      ></SwitchField>
      <SelectField
        label="Document type"
        placeholder="Please select an option"
        isDisabled={false}
        value={documentType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              channelId,
              title,
              s3KeyRawText,
              s3KeyOriginal,
              description,
              includeInLibrary,
              documentType: value,
              source,
              fileName,
              fileType,
              fileSuffix,
              fileSize,
              uploadedBy,
            };
            const result = onChange(modelFields);
            value = result?.documentType ?? value;
          }
          if (errors.documentType?.hasError) {
            runValidationTasks("documentType", value);
          }
          setDocumentType(value);
        }}
        onBlur={() => runValidationTasks("documentType", documentType)}
        errorMessage={errors.documentType?.errorMessage}
        hasError={errors.documentType?.hasError}
        {...getOverrideProps(overrides, "documentType")}
      >
        <option
          children="Transcription"
          value="TRANSCRIPTION"
          {...getOverrideProps(overrides, "documentTypeoption0")}
        ></option>
        <option
          children="Document"
          value="DOCUMENT"
          {...getOverrideProps(overrides, "documentTypeoption1")}
        ></option>
        <option
          children="Website"
          value="WEBSITE"
          {...getOverrideProps(overrides, "documentTypeoption2")}
        ></option>
        <option
          children="Text"
          value="TEXT"
          {...getOverrideProps(overrides, "documentTypeoption3")}
        ></option>
      </SelectField>
      <TextField
        label="Source"
        isRequired={false}
        isReadOnly={false}
        value={source}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              channelId,
              title,
              s3KeyRawText,
              s3KeyOriginal,
              description,
              includeInLibrary,
              documentType,
              source: value,
              fileName,
              fileType,
              fileSuffix,
              fileSize,
              uploadedBy,
            };
            const result = onChange(modelFields);
            value = result?.source ?? value;
          }
          if (errors.source?.hasError) {
            runValidationTasks("source", value);
          }
          setSource(value);
        }}
        onBlur={() => runValidationTasks("source", source)}
        errorMessage={errors.source?.errorMessage}
        hasError={errors.source?.hasError}
        {...getOverrideProps(overrides, "source")}
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
              title,
              s3KeyRawText,
              s3KeyOriginal,
              description,
              includeInLibrary,
              documentType,
              source,
              fileName: value,
              fileType,
              fileSuffix,
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
        label="File type"
        isRequired={false}
        isReadOnly={false}
        value={fileType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              channelId,
              title,
              s3KeyRawText,
              s3KeyOriginal,
              description,
              includeInLibrary,
              documentType,
              source,
              fileName,
              fileType: value,
              fileSuffix,
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
        label="File suffix"
        isRequired={false}
        isReadOnly={false}
        value={fileSuffix}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              channelId,
              title,
              s3KeyRawText,
              s3KeyOriginal,
              description,
              includeInLibrary,
              documentType,
              source,
              fileName,
              fileType,
              fileSuffix: value,
              fileSize,
              uploadedBy,
            };
            const result = onChange(modelFields);
            value = result?.fileSuffix ?? value;
          }
          if (errors.fileSuffix?.hasError) {
            runValidationTasks("fileSuffix", value);
          }
          setFileSuffix(value);
        }}
        onBlur={() => runValidationTasks("fileSuffix", fileSuffix)}
        errorMessage={errors.fileSuffix?.errorMessage}
        hasError={errors.fileSuffix?.hasError}
        {...getOverrideProps(overrides, "fileSuffix")}
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
              title,
              s3KeyRawText,
              s3KeyOriginal,
              description,
              includeInLibrary,
              documentType,
              source,
              fileName,
              fileType,
              fileSuffix,
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
              title,
              s3KeyRawText,
              s3KeyOriginal,
              description,
              includeInLibrary,
              documentType,
              source,
              fileName,
              fileType,
              fileSuffix,
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
