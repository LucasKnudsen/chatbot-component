// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Channel, CodeItem, LanguageItem, SubscriptionEvent } = initSchema(schema);

export {
  Channel,
  CodeItem,
  LanguageItem,
  SubscriptionEvent
};