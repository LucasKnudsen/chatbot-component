import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier, CompositeIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerSubscriptionEvent = {
  readonly sessionId: string;
  readonly data: string;
}

type LazySubscriptionEvent = {
  readonly sessionId: string;
  readonly data: string;
}

export declare type SubscriptionEvent = LazyLoading extends LazyLoadingDisabled ? EagerSubscriptionEvent : LazySubscriptionEvent

export declare const SubscriptionEvent: (new (init: ModelInit<SubscriptionEvent>) => SubscriptionEvent)

type EagerChannel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Channel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tenantId: string;
  readonly apiHost?: string | null;
  readonly chatflowId?: string | null;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyChannel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Channel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tenantId: string;
  readonly apiHost?: string | null;
  readonly chatflowId?: string | null;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Channel = LazyLoading extends LazyLoadingDisabled ? EagerChannel : LazyChannel

export declare const Channel: (new (init: ModelInit<Channel>) => Channel) & {
  copyOf(source: Channel, mutator: (draft: MutableModel<Channel>) => MutableModel<Channel> | void): Channel;
}

type EagerCodeItem = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<CodeItem, ['tenantCode', 'tableCode', 'itemCode']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly tenantCode: string;
  readonly tableCode: string;
  readonly itemCode: string;
  readonly internalName: string;
  readonly internalDescription?: string | null;
  readonly isEditable: boolean;
  readonly isActive: boolean;
  readonly isDisplayed?: boolean | null;
  readonly isExtended?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCodeItem = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<CodeItem, ['tenantCode', 'tableCode', 'itemCode']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly tenantCode: string;
  readonly tableCode: string;
  readonly itemCode: string;
  readonly internalName: string;
  readonly internalDescription?: string | null;
  readonly isEditable: boolean;
  readonly isActive: boolean;
  readonly isDisplayed?: boolean | null;
  readonly isExtended?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CodeItem = LazyLoading extends LazyLoadingDisabled ? EagerCodeItem : LazyCodeItem

export declare const CodeItem: (new (init: ModelInit<CodeItem>) => CodeItem) & {
  copyOf(source: CodeItem, mutator: (draft: MutableModel<CodeItem>) => MutableModel<CodeItem> | void): CodeItem;
}

type EagerLanguageItem = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<LanguageItem, ['languageCode', 'tableCode', 'itemCode']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly languageCode: string;
  readonly tableCode: string;
  readonly itemCode: string;
  readonly text: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLanguageItem = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<LanguageItem, ['languageCode', 'tableCode', 'itemCode']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly languageCode: string;
  readonly tableCode: string;
  readonly itemCode: string;
  readonly text: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LanguageItem = LazyLoading extends LazyLoadingDisabled ? EagerLanguageItem : LazyLanguageItem

export declare const LanguageItem: (new (init: ModelInit<LanguageItem>) => LanguageItem) & {
  copyOf(source: LanguageItem, mutator: (draft: MutableModel<LanguageItem>) => MutableModel<LanguageItem> | void): LanguageItem;
}