/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./types";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const subscribe2channel = /* GraphQL */ `subscription Subscribe2channel($sessionId: String!) {
  subscribe2channel(sessionId: $sessionId) {
    sessionId
    data
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.Subscribe2channelSubscriptionVariables,
  APITypes.Subscribe2channelSubscription
>;
export const onCreateCodeItem = /* GraphQL */ `subscription OnCreateCodeItem($filter: ModelSubscriptionCodeItemFilterInput) {
  onCreateCodeItem(filter: $filter) {
    tenantCode
    tableCode
    itemCode
    internalName
    internalDescription
    isEditable
    isActive
    isDisplayed
    isExtended
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCodeItemSubscriptionVariables,
  APITypes.OnCreateCodeItemSubscription
>;
export const onUpdateCodeItem = /* GraphQL */ `subscription OnUpdateCodeItem($filter: ModelSubscriptionCodeItemFilterInput) {
  onUpdateCodeItem(filter: $filter) {
    tenantCode
    tableCode
    itemCode
    internalName
    internalDescription
    isEditable
    isActive
    isDisplayed
    isExtended
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCodeItemSubscriptionVariables,
  APITypes.OnUpdateCodeItemSubscription
>;
export const onDeleteCodeItem = /* GraphQL */ `subscription OnDeleteCodeItem($filter: ModelSubscriptionCodeItemFilterInput) {
  onDeleteCodeItem(filter: $filter) {
    tenantCode
    tableCode
    itemCode
    internalName
    internalDescription
    isEditable
    isActive
    isDisplayed
    isExtended
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCodeItemSubscriptionVariables,
  APITypes.OnDeleteCodeItemSubscription
>;
export const onCreateLanguageItem = /* GraphQL */ `subscription OnCreateLanguageItem(
  $filter: ModelSubscriptionLanguageItemFilterInput
) {
  onCreateLanguageItem(filter: $filter) {
    languageCode
    tableCode
    itemCode
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateLanguageItemSubscriptionVariables,
  APITypes.OnCreateLanguageItemSubscription
>;
export const onUpdateLanguageItem = /* GraphQL */ `subscription OnUpdateLanguageItem(
  $filter: ModelSubscriptionLanguageItemFilterInput
) {
  onUpdateLanguageItem(filter: $filter) {
    languageCode
    tableCode
    itemCode
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateLanguageItemSubscriptionVariables,
  APITypes.OnUpdateLanguageItemSubscription
>;
export const onDeleteLanguageItem = /* GraphQL */ `subscription OnDeleteLanguageItem(
  $filter: ModelSubscriptionLanguageItemFilterInput
) {
  onDeleteLanguageItem(filter: $filter) {
    languageCode
    tableCode
    itemCode
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteLanguageItemSubscriptionVariables,
  APITypes.OnDeleteLanguageItemSubscription
>;
export const onCreateChannel = /* GraphQL */ `subscription OnCreateChannel($filter: ModelSubscriptionChannelFilterInput) {
  onCreateChannel(filter: $filter) {
    id
    tenantId
    apiHost
    chatflowId
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateChannelSubscriptionVariables,
  APITypes.OnCreateChannelSubscription
>;
export const onUpdateChannel = /* GraphQL */ `subscription OnUpdateChannel($filter: ModelSubscriptionChannelFilterInput) {
  onUpdateChannel(filter: $filter) {
    id
    tenantId
    apiHost
    chatflowId
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateChannelSubscriptionVariables,
  APITypes.OnUpdateChannelSubscription
>;
export const onDeleteChannel = /* GraphQL */ `subscription OnDeleteChannel($filter: ModelSubscriptionChannelFilterInput) {
  onDeleteChannel(filter: $filter) {
    id
    tenantId
    apiHost
    chatflowId
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteChannelSubscriptionVariables,
  APITypes.OnDeleteChannelSubscription
>;
