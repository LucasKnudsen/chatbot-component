import { onMount } from 'solid-js'

export function ClarityComponent() {
  onMount(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "k2nnlyihsn");
        `
    document.head.appendChild(script)
  })

  return null
}
