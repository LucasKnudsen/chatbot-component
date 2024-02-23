/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ChannelUserAccessCreateFormInputValues = {
    accessId?: string;
    channelId?: string;
    chatSpaceId?: string;
    channelHostId?: string;
    channelHostType?: string;
    accessType?: string;
    channelName?: string;
    channelDescription?: string;
};
export declare type ChannelUserAccessCreateFormValidationValues = {
    accessId?: ValidationFunction<string>;
    channelId?: ValidationFunction<string>;
    chatSpaceId?: ValidationFunction<string>;
    channelHostId?: ValidationFunction<string>;
    channelHostType?: ValidationFunction<string>;
    accessType?: ValidationFunction<string>;
    channelName?: ValidationFunction<string>;
    channelDescription?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ChannelUserAccessCreateFormOverridesProps = {
    ChannelUserAccessCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    accessId?: PrimitiveOverrideProps<TextFieldProps>;
    channelId?: PrimitiveOverrideProps<TextFieldProps>;
    chatSpaceId?: PrimitiveOverrideProps<TextFieldProps>;
    channelHostId?: PrimitiveOverrideProps<TextFieldProps>;
    channelHostType?: PrimitiveOverrideProps<SelectFieldProps>;
    accessType?: PrimitiveOverrideProps<SelectFieldProps>;
    channelName?: PrimitiveOverrideProps<TextFieldProps>;
    channelDescription?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ChannelUserAccessCreateFormProps = React.PropsWithChildren<{
    overrides?: ChannelUserAccessCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ChannelUserAccessCreateFormInputValues) => ChannelUserAccessCreateFormInputValues;
    onSuccess?: (fields: ChannelUserAccessCreateFormInputValues) => void;
    onError?: (fields: ChannelUserAccessCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ChannelUserAccessCreateFormInputValues) => ChannelUserAccessCreateFormInputValues;
    onValidate?: ChannelUserAccessCreateFormValidationValues;
} & React.CSSProperties>;
export default function ChannelUserAccessCreateForm(props: ChannelUserAccessCreateFormProps): React.ReactElement;
