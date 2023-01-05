import { component$, useStylesScoped$, Slot, useSignal } from '@builder.io/qwik';
import styles from './box.css?inline';

export default component$(({title, beginOpen = true}) => {
  useStylesScoped$(styles);
  const open = useSignal(beginOpen)

  return (
    <div class='box-container'>
      <header onClick$={() => open.value = !open.value}>
        <span>{title}</span>
      </header>
      <div class={`box ${open.value != true ? 'closed' : ''}`}>
        <Slot />
      </div>
    </div>
  );
});
