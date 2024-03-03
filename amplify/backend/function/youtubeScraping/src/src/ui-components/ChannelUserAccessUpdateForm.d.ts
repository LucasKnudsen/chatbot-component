/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { ChannelUserAccess } from "../graphql/types.ts";
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
export declare type ChannelUserAccessUpdateFormInputValues = {
    accessId?: string;
    channelId?: string;
    chatSpaceId?: string;
    channelHostId?: string;
    channelHostType?: string;
    accessType?: string;
    channelName?: string;
    channelDescription?: string;
    channelSubtitle?: string;
    channelAvatar?: string;
};
export declare type ChannelUserAccessUpdateFormValidationValues = {
    accessId?: ValidationFunction<string>;
    channelId?: ValidationFunction<string>;
    chatSpaceId?: ValidationFunction<string>;
    channelHostId?: ValidationFunction<string>;
    channelHostType?: ValidationFunction<string>;
    accessType?: ValidationFunction<string>;
    channelName?: ValidationFunction<string>;
    channelDescription?: ValidationFunction<string>;
    channelSubtitle?: ValidationFunction<string>;
    channelAvatar?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ChannelUserAccessUpdateFormOverridesProps = {
    ChannelUserAccessUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    accessId?: PrimitiveOverrideProps<TextFieldProps>;
    channelId?: PrimitiveOverrideProps<TextFieldProps>;
    chatSpaceId?: PrimitiveOverrideProps<TextFieldProps>;
    channelHostId?: PrimitiveOverrideProps<TextFieldProps>;
    channelHostType?: PrimitiveOverrideProps<SelectFieldProps>;
    accessType?: PrimitiveOverrideProps<SelectFieldProps>;
    channelName?: PrimitiveOverrideProps<TextFieldProps>;
    channelDescription?: PrimitiveOverrideProps<TextFieldProps>;
    channelSubtitle?: PrimitiveOverrideProps<TextFieldProps>;
    channelAvatar?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ChannelUserAccessUpdateFormProps = React.PropsWithChildren<{
    overrides?: ChannelUserAccessUpdateFormOverridesProps | undefined | null;
} & {
    id?: {
        accessId: string;
        channelId: string;
    };
    channelUserAccess?: ChannelUserAccess;
    onSubmit?: (fields: ChannelUserAccessUpdateFormInputValues) => ChannelUserAccessUpdateFormInputValues;
    onSuccess?: (fields: ChannelUserAccessUpdateFormInputValues) => void;
    onError?: (fields: ChannelUserAccessUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ChannelUserAccessUpdateFormInputValues) => ChannelUserAccessUpdateFormInputValues;
    onValidate?: ChannelUserAccessUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ChannelUserAccessUpdateForm(props: ChannelUserAccessUpdateFormProps): React.ReactElement;
