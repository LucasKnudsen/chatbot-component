/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type LanguageItemCreateFormInputValues = {
    languageCode?: string;
    tableCode?: string;
    itemCode?: string;
    text?: string;
};
export declare type LanguageItemCreateFormValidationValues = {
    languageCode?: ValidationFunction<string>;
    tableCode?: ValidationFunction<string>;
    itemCode?: ValidationFunction<string>;
    text?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LanguageItemCreateFormOverridesProps = {
    LanguageItemCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    languageCode?: PrimitiveOverrideProps<TextFieldProps>;
    tableCode?: PrimitiveOverrideProps<TextFieldProps>;
    itemCode?: PrimitiveOverrideProps<TextFieldProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LanguageItemCreateFormProps = React.PropsWithChildren<{
    overrides?: LanguageItemCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LanguageItemCreateFormInputValues) => LanguageItemCreateFormInputValues;
    onSuccess?: (fields: LanguageItemCreateFormInputValues) => void;
    onError?: (fields: LanguageItemCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LanguageItemCreateFormInputValues) => LanguageItemCreateFormInputValues;
    onValidate?: LanguageItemCreateFormValidationValues;
} & React.CSSProperties>;
export default function LanguageItemCreateForm(props: LanguageItemCreateFormProps): React.ReactElement;
