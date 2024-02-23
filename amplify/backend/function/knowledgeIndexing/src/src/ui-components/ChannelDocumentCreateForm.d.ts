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
export declare type ChannelDocumentCreateFormInputValues = {
    channelId?: string;
    title?: string;
    s3KeyRawText?: string;
    s3KeyOriginal?: string;
    description?: string;
    includeInLibrary?: boolean;
    documentType?: string;
    source?: string;
    fileName?: string;
    fileType?: string;
    fileSuffix?: string;
    fileSize?: number;
    uploadedBy?: string;
};
export declare type ChannelDocumentCreateFormValidationValues = {
    channelId?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    s3KeyRawText?: ValidationFunction<string>;
    s3KeyOriginal?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    includeInLibrary?: ValidationFunction<boolean>;
    documentType?: ValidationFunction<string>;
    source?: ValidationFunction<string>;
    fileName?: ValidationFunction<string>;
    fileType?: ValidationFunction<string>;
    fileSuffix?: ValidationFunction<string>;
    fileSize?: ValidationFunction<number>;
    uploadedBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ChannelDocumentCreateFormOverridesProps = {
    ChannelDocumentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    channelId?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    s3KeyRawText?: PrimitiveOverrideProps<TextFieldProps>;
    s3KeyOriginal?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    includeInLibrary?: PrimitiveOverrideProps<SwitchFieldProps>;
    documentType?: PrimitiveOverrideProps<SelectFieldProps>;
    source?: PrimitiveOverrideProps<TextFieldProps>;
    fileName?: PrimitiveOverrideProps<TextFieldProps>;
    fileType?: PrimitiveOverrideProps<TextFieldProps>;
    fileSuffix?: PrimitiveOverrideProps<TextFieldProps>;
    fileSize?: PrimitiveOverrideProps<TextFieldProps>;
    uploadedBy?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ChannelDocumentCreateFormProps = React.PropsWithChildren<{
    overrides?: ChannelDocumentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ChannelDocumentCreateFormInputValues) => ChannelDocumentCreateFormInputValues;
    onSuccess?: (fields: ChannelDocumentCreateFormInputValues) => void;
    onError?: (fields: ChannelDocumentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ChannelDocumentCreateFormInputValues) => ChannelDocumentCreateFormInputValues;
    onValidate?: ChannelDocumentCreateFormValidationValues;
} & React.CSSProperties>;
export default function ChannelDocumentCreateForm(props: ChannelDocumentCreateFormProps): React.ReactElement;
