/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { LanguageItem } from "../graphql/types.ts";
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
export declare type LanguageItemUpdateFormInputValues = {
    languageCode?: string;
    tableCode?: string;
    itemCode?: string;
    text?: string;
};
export declare type LanguageItemUpdateFormValidationValues = {
    languageCode?: ValidationFunction<string>;
    tableCode?: ValidationFunction<string>;
    itemCode?: ValidationFunction<string>;
    text?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LanguageItemUpdateFormOverridesProps = {
    LanguageItemUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    languageCode?: PrimitiveOverrideProps<TextFieldProps>;
    tableCode?: PrimitiveOverrideProps<TextFieldProps>;
    itemCode?: PrimitiveOverrideProps<TextFieldProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LanguageItemUpdateFormProps = React.PropsWithChildren<{
    overrides?: LanguageItemUpdateFormOverridesProps | undefined | null;
} & {
    id?: {
        languageCode: string;
        tableCode: string;
        itemCode: string;
    };
    languageItem?: LanguageItem;
    onSubmit?: (fields: LanguageItemUpdateFormInputValues) => LanguageItemUpdateFormInputValues;
    onSuccess?: (fields: LanguageItemUpdateFormInputValues) => void;
    onError?: (fields: LanguageItemUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LanguageItemUpdateFormInputValues) => LanguageItemUpdateFormInputValues;
    onValidate?: LanguageItemUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LanguageItemUpdateForm(props: LanguageItemUpdateFormProps): React.ReactElement;
