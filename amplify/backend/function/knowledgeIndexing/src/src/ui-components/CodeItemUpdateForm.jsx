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
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getCodeItem } from "../graphql/queries";
import { updateCodeItem } from "../graphql/mutations";
export default function CodeItemUpdateForm(props) {
  const {
    id: idProp,
    codeItem: codeItemModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    tenantCode: "",
    tableCode: "",
    itemCode: "",
    internalName: "",
    internalDescription: "",
    isEditable: false,
    isActive: false,
    isDisplayed: false,
    isExtended: false,
  };
  const [tenantCode, setTenantCode] = React.useState(initialValues.tenantCode);
  const [tableCode, setTableCode] = React.useState(initialValues.tableCode);
  const [itemCode, setItemCode] = React.useState(initialValues.itemCode);
  const [internalName, setInternalName] = React.useState(
    initialValues.internalName
  );
  const [internalDescription, setInternalDescription] = React.useState(
    initialValues.internalDescription
  );
  const [isEditable, setIsEditable] = React.useState(initialValues.isEditable);
  const [isActive, setIsActive] = React.useState(initialValues.isActive);
  const [isDisplayed, setIsDisplayed] = React.useState(
    initialValues.isDisplayed
  );
  const [isExtended, setIsExtended] = React.useState(initialValues.isExtended);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = codeItemRecord
      ? { ...initialValues, ...codeItemRecord }
      : initialValues;
    setTenantCode(cleanValues.tenantCode);
    setTableCode(cleanValues.tableCode);
    setItemCode(cleanValues.itemCode);
    setInternalName(cleanValues.internalName);
    setInternalDescription(cleanValues.internalDescription);
    setIsEditable(cleanValues.isEditable);
    setIsActive(cleanValues.isActive);
    setIsDisplayed(cleanValues.isDisplayed);
    setIsExtended(cleanValues.isExtended);
    setErrors({});
  };
  const [codeItemRecord, setCodeItemRecord] = React.useState(codeItemModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getCodeItem.replaceAll("__typename", ""),
              variables: { ...idProp },
            })
          )?.data?.getCodeItem
        : codeItemModelProp;
      setCodeItemRecord(record);
    };
    queryData();
  }, [idProp, codeItemModelProp]);
  React.useEffect(resetStateValues, [codeItemRecord]);
  const validations = {
    tenantCode: [{ type: "Required" }],
    tableCode: [{ type: "Required" }],
    itemCode: [{ type: "Required" }],
    internalName: [{ type: "Required" }],
    internalDescription: [],
    isEditable: [{ type: "Required" }],
    isActive: [{ type: "Required" }],
    isDisplayed: [],
    isExtended: [],
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
          tenantCode,
          tableCode,
          itemCode,
          internalName,
          internalDescription: internalDescription ?? null,
          isEditable,
          isActive,
          isDisplayed: isDisplayed ?? null,
          isExtended: isExtended ?? null,
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
            query: updateCodeItem.replaceAll("__typename", ""),
            variables: {
              input: {
                tenantCode: codeItemRecord.tenantCode,
                tableCode: codeItemRecord.tableCode,
                itemCode: codeItemRecord.itemCode,
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
      {...getOverrideProps(overrides, "CodeItemUpdateForm")}
      {...rest}
    >
      <TextField
        label="Tenant code"
        isRequired={true}
        isReadOnly={true}
        value={tenantCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tenantCode: value,
              tableCode,
              itemCode,
              internalName,
              internalDescription,
              isEditable,
              isActive,
              isDisplayed,
              isExtended,
            };
            const result = onChange(modelFields);
            value = result?.tenantCode ?? value;
          }
          if (errors.tenantCode?.hasError) {
            runValidationTasks("tenantCode", value);
          }
          setTenantCode(value);
        }}
        onBlur={() => runValidationTasks("tenantCode", tenantCode)}
        errorMessage={errors.tenantCode?.errorMessage}
        hasError={errors.tenantCode?.hasError}
        {...getOverrideProps(overrides, "tenantCode")}
      ></TextField>
      <TextField
        label="Table code"
        isRequired={true}
        isReadOnly={true}
        value={tableCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tenantCode,
              tableCode: value,
              itemCode,
              internalName,
              internalDescription,
              isEditable,
              isActive,
              isDisplayed,
              isExtended,
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
        isReadOnly={true}
        value={itemCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tenantCode,
              tableCode,
              itemCode: value,
              internalName,
              internalDescription,
              isEditable,
              isActive,
              isDisplayed,
              isExtended,
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
        label="Internal name"
        isRequired={true}
        isReadOnly={false}
        value={internalName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tenantCode,
              tableCode,
              itemCode,
              internalName: value,
              internalDescription,
              isEditable,
              isActive,
              isDisplayed,
              isExtended,
            };
            const result = onChange(modelFields);
            value = result?.internalName ?? value;
          }
          if (errors.internalName?.hasError) {
            runValidationTasks("internalName", value);
          }
          setInternalName(value);
        }}
        onBlur={() => runValidationTasks("internalName", internalName)}
        errorMessage={errors.internalName?.errorMessage}
        hasError={errors.internalName?.hasError}
        {...getOverrideProps(overrides, "internalName")}
      ></TextField>
      <TextField
        label="Internal description"
        isRequired={false}
        isReadOnly={false}
        value={internalDescription}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tenantCode,
              tableCode,
              itemCode,
              internalName,
              internalDescription: value,
              isEditable,
              isActive,
              isDisplayed,
              isExtended,
            };
            const result = onChange(modelFields);
            value = result?.internalDescription ?? value;
          }
          if (errors.internalDescription?.hasError) {
            runValidationTasks("internalDescription", value);
          }
          setInternalDescription(value);
        }}
        onBlur={() =>
          runValidationTasks("internalDescription", internalDescription)
        }
        errorMessage={errors.internalDescription?.errorMessage}
        hasError={errors.internalDescription?.hasError}
        {...getOverrideProps(overrides, "internalDescription")}
      ></TextField>
      <SwitchField
        label="Is editable"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isEditable}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              tenantCode,
              tableCode,
              itemCode,
              internalName,
              internalDescription,
              isEditable: value,
              isActive,
              isDisplayed,
              isExtended,
            };
            const result = onChange(modelFields);
            value = result?.isEditable ?? value;
          }
          if (errors.isEditable?.hasError) {
            runValidationTasks("isEditable", value);
          }
          setIsEditable(value);
        }}
        onBlur={() => runValidationTasks("isEditable", isEditable)}
        errorMessage={errors.isEditable?.errorMessage}
        hasError={errors.isEditable?.hasError}
        {...getOverrideProps(overrides, "isEditable")}
      ></SwitchField>
      <SwitchField
        label="Is active"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isActive}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              tenantCode,
              tableCode,
              itemCode,
              internalName,
              internalDescription,
              isEditable,
              isActive: value,
              isDisplayed,
              isExtended,
            };
            const result = onChange(modelFields);
            value = result?.isActive ?? value;
          }
          if (errors.isActive?.hasError) {
            runValidationTasks("isActive", value);
          }
          setIsActive(value);
        }}
        onBlur={() => runValidationTasks("isActive", isActive)}
        errorMessage={errors.isActive?.errorMessage}
        hasError={errors.isActive?.hasError}
        {...getOverrideProps(overrides, "isActive")}
      ></SwitchField>
      <SwitchField
        label="Is displayed"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isDisplayed}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              tenantCode,
              tableCode,
              itemCode,
              internalName,
              internalDescription,
              isEditable,
              isActive,
              isDisplayed: value,
              isExtended,
            };
            const result = onChange(modelFields);
            value = result?.isDisplayed ?? value;
          }
          if (errors.isDisplayed?.hasError) {
            runValidationTasks("isDisplayed", value);
          }
          setIsDisplayed(value);
        }}
        onBlur={() => runValidationTasks("isDisplayed", isDisplayed)}
        errorMessage={errors.isDisplayed?.errorMessage}
        hasError={errors.isDisplayed?.hasError}
        {...getOverrideProps(overrides, "isDisplayed")}
      ></SwitchField>
      <SwitchField
        label="Is extended"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isExtended}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              tenantCode,
              tableCode,
              itemCode,
              internalName,
              internalDescription,
              isEditable,
              isActive,
              isDisplayed,
              isExtended: value,
            };
            const result = onChange(modelFields);
            value = result?.isExtended ?? value;
          }
          if (errors.isExtended?.hasError) {
            runValidationTasks("isExtended", value);
          }
          setIsExtended(value);
        }}
        onBlur={() => runValidationTasks("isExtended", isExtended)}
        errorMessage={errors.isExtended?.errorMessage}
        hasError={errors.isExtended?.hasError}
        {...getOverrideProps(overrides, "isExtended")}
      ></SwitchField>
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
          isDisabled={!(idProp || codeItemModelProp)}
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
              !(idProp || codeItemModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
