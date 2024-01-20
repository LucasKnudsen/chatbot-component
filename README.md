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
