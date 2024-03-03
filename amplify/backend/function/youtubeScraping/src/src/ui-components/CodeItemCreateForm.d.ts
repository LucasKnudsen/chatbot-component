/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CodeItemCreateFormInputValues = {
    tenantCode?: string;
    tableCode?: string;
    itemCode?: string;
    internalName?: string;
    internalDescription?: string;
    isEditable?: boolean;
    isActive?: boolean;
    isDisplayed?: boolean;
    isExtended?: boolean;
};
export declare type CodeItemCreateFormValidationValues = {
    tenantCode?: ValidationFunction<string>;
    tableCode?: ValidationFunction<string>;
    itemCode?: ValidationFunction<string>;
    internalName?: ValidationFunction<string>;
    internalDescription?: ValidationFunction<string>;
    isEditable?: ValidationFunction<boolean>;
    isActive?: ValidationFunction<boolean>;
    isDisplayed?: ValidationFunction<boolean>;
    isExtended?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CodeItemCreateFormOverridesProps = {
    CodeItemCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    tenantCode?: PrimitiveOverrideProps<TextFieldProps>;
    tableCode?: PrimitiveOverrideProps<TextFieldProps>;
    itemCode?: PrimitiveOverrideProps<TextFieldProps>;
    internalName?: PrimitiveOverrideProps<TextFieldProps>;
    internalDescription?: PrimitiveOverrideProps<TextFieldProps>;
    isEditable?: PrimitiveOverrideProps<SwitchFieldProps>;
    isActive?: PrimitiveOverrideProps<SwitchFieldProps>;
    isDisplayed?: PrimitiveOverrideProps<SwitchFieldProps>;
    isExtended?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type CodeItemCreateFormProps = React.PropsWithChildren<{
    overrides?: CodeItemCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CodeItemCreateFormInputValues) => CodeItemCreateFormInputValues;
    onSuccess?: (fields: CodeItemCreateFormInputValues) => void;
    onError?: (fields: CodeItemCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CodeItemCreateFormInputValues) => CodeItemCreateFormInputValues;
    onValidate?: CodeItemCreateFormValidationValues;
} & React.CSSProperties>;
export default function CodeItemCreateForm(props: CodeItemCreateFormProps): React.ReactElement;
