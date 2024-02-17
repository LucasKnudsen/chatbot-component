/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { ChannelDocument } from "../graphql/types.ts";
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
export declare type ChannelDocumentUpdateFormInputValues = {
    channelId?: string;
    s3KeyRaw?: string;
    s3KeyTranscription?: string;
    summary?: string;
    fileType?: string;
    fileName?: string;
    fileSize?: number;
    uploadedBy?: string;
};
export declare type ChannelDocumentUpdateFormValidationValues = {
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
export declare type ChannelDocumentUpdateFormOverridesProps = {
    ChannelDocumentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    channelId?: PrimitiveOverrideProps<TextFieldProps>;
    s3KeyRaw?: PrimitiveOverrideProps<TextFieldProps>;
    s3KeyTranscription?: PrimitiveOverrideProps<TextFieldProps>;
    summary?: PrimitiveOverrideProps<TextFieldProps>;
    fileType?: PrimitiveOverrideProps<TextFieldProps>;
    fileName?: PrimitiveOverrideProps<TextFieldProps>;
    fileSize?: PrimitiveOverrideProps<TextFieldProps>;
    uploadedBy?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ChannelDocumentUpdateFormProps = React.PropsWithChildren<{
    overrides?: ChannelDocumentUpdateFormOverridesProps | undefined | null;
} & {
    id?: {
        channelId: string;
        id: string;
    };
    channelDocument?: ChannelDocument;
    onSubmit?: (fields: ChannelDocumentUpdateFormInputValues) => ChannelDocumentUpdateFormInputValues;
    onSuccess?: (fields: ChannelDocumentUpdateFormInputValues) => void;
    onError?: (fields: ChannelDocumentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ChannelDocumentUpdateFormInputValues) => ChannelDocumentUpdateFormInputValues;
    onValidate?: ChannelDocumentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ChannelDocumentUpdateForm(props: ChannelDocumentUpdateFormProps): React.ReactElement;
