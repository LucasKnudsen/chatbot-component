/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Organization } from "../graphql/types.ts";
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
export declare type OrganizationUpdateFormInputValues = {
    name?: string;
    logo?: string;
    email?: string;
    admin?: string;
};
export declare type OrganizationUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    logo?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    admin?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OrganizationUpdateFormOverridesProps = {
    OrganizationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    logo?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    admin?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OrganizationUpdateFormProps = React.PropsWithChildren<{
    overrides?: OrganizationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    organization?: Organization;
    onSubmit?: (fields: OrganizationUpdateFormInputValues) => OrganizationUpdateFormInputValues;
    onSuccess?: (fields: OrganizationUpdateFormInputValues) => void;
    onError?: (fields: OrganizationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OrganizationUpdateFormInputValues) => OrganizationUpdateFormInputValues;
    onValidate?: OrganizationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function OrganizationUpdateForm(props: OrganizationUpdateFormProps): React.ReactElement;
