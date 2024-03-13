import { ActiveFlow } from '../layouts/KnowledgeInputsView'

export type InputOptionProps = {
  title: string
  description: string
  flow: ActiveFlow
  Icon: any
}

export const InputOption = (props: InputOptionProps & { onClick: (args: any) => void }) => {
  return (
    <div
      onClick={props?.onClick}
      class={`flex transition-all group cursor-pointer lg:flex-col rounded-2xl lg:justify-center items-center lg:items-start  border border-[var(--borderColor)] hover:border-[var(--primaryColor)]
              p-8  hover:bg-[var(--surfaceSoftBackground)] lg:h-96 gap-4 lg:gap-8 w-full lg:min-w-[272px] `}
    >
      <div class='rounded-full p-3 lg:p-6 bg-[var(--surfaceBackground)]'>
        <props.Icon class='w-6 h-6 lg:w-10 lg:h-10 text-[var(--primaryColor)]' />
      </div>

      <div>
        <p class='text-sm lg:text-base font-bold uppercase group-hover:text-[var(--primaryColor)] transition-all'>
          {props.title}
        </p>
        <p class='text-sm lg:text-base text-[var(--textSecondary)] group-hover:text-[var(--primaryColor)] transition-all'>
          {props.description}
        </p>
      </div>
    </div>
  )
}
