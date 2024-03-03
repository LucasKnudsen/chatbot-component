/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ChatSpaceCreateFormInputValues = {
    hostId?: string;
    hostType?: string;
    name?: string;
    isPublic?: boolean;
    isMultiChannel?: boolean;
    defaultChannelId?: string;
    themeId?: string;
    defaultLanguage?: string;
    admin?: string;
};
export declare type ChatSpaceCreateFormValidationValues = {
    hostId?: ValidationFunction<string>;
    hostType?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    isPublic?: ValidationFunction<boolean>;
    isMultiChannel?: ValidationFunction<boolean>;
    defaultChannelId?: ValidationFunction<string>;
    themeId?: ValidationFunction<string>;
    defaultLanguage?: ValidationFunction<string>;
    admin?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ChatSpaceCreateFormOverridesProps = {
    ChatSpaceCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    hostId?: PrimitiveOverrideProps<TextFieldProps>;
    hostType?: PrimitiveOverrideProps<SelectFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    isPublic?: PrimitiveOverrideProps<SwitchFieldProps>;
    isMultiChannel?: PrimitiveOverrideProps<SwitchFieldProps>;
    defaultChannelId?: PrimitiveOverrideProps<TextFieldProps>;
    themeId?: PrimitiveOverrideProps<TextFieldProps>;
    defaultLanguage?: PrimitiveOverrideProps<TextFieldProps>;
    admin?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ChatSpaceCreateFormProps = React.PropsWithChildren<{
    overrides?: ChatSpaceCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ChatSpaceCreateFormInputValues) => ChatSpaceCreateFormInputValues;
    onSuccess?: (fields: ChatSpaceCreateFormInputValues) => void;
    onError?: (fields: ChatSpaceCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ChatSpaceCreateFormInputValues) => ChatSpaceCreateFormInputValues;
    onValidate?: ChatSpaceCreateFormValidationValues;
} & React.CSSProperties>;
export default function ChatSpaceCreateForm(props: ChatSpaceCreateFormProps): React.ReactElement;
