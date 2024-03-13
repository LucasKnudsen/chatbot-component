export const KnowledgeBaseTitle = (props: { title: string; description?: string }) => {
  return (
    <div class='flex flex-col gap-2 mt-4 lg:mt-6 '>
      <p class='text-sm lg:text-base font-bold uppercase '>{props.title}</p>

      <p class='text-sm lg:text-base text-[var(--textSecondary)]'>{props.description}</p>
    </div>
  )
}
