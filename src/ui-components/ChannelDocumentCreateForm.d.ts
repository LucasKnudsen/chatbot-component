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
export declare type ChannelDocumentCreateFormInputValues = {
    channelId?: string;
    s3KeyRaw?: string;
    s3KeyTranscription?: string;
    summary?: string;
    fileType?: string;
    fileName?: string;
    fileSize?: number;
    uploadedBy?: string;
};
export declare type ChannelDocumentCreateFormValidationValues = {
    channelId?: ValidationFunction<string>;
    s3KeyRaw?: ValidationFunction<string>;
    s3KeyTranscription?: ValidationFunction<string>;
    summary?: ValidationFunction<string>;
    fileType?: ValidationFunction<string>;
    fileName?: ValidationFunction<string>;
    fileSize?: ValidationFunction<number>;
    uploadedBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ChannelDocumentCreateFormOverridesProps = {
    ChannelDocumentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    channelId?: PrimitiveOverrideProps<TextFieldProps>;
    s3KeyRaw?: PrimitiveOverrideProps<TextFieldProps>;
    s3KeyTranscription?: PrimitiveOverrideProps<TextFieldProps>;
    summary?: PrimitiveOverrideProps<TextFieldProps>;
    fileType?: PrimitiveOverrideProps<TextFieldProps>;
    fileName?: PrimitiveOverrideProps<TextFieldProps>;
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
