## Initiate Amplify

- Run `amplify pull`
  - Choose `AWS profile`
  - Choose your local singapore profile
  - Choose `Fraia Chat Embed`
  - Choose `dev`
  - Just `enter` your way through the project setup
  - Choose `no` for modifying the backend
- Run `amplify codegen`

# Fraia Embed

Javascript script for implementing a Fraia chatbot on your website

## Usage

In `<head>`

```html
<script type="module">
  import Chatbot from 'https://xxx.yyy';

  Chatbot.init({
    hostId: '<ownerId>'
    spaceId: '<chatSpaceId>'

    config?: <ConfigType>

  });
</script>
```

```ts
type ConfigType = {
  autoOpen?: boolean
}
```
