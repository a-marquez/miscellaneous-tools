import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      <h1>
        Miscellaneous Tools
      </h1>

      <ul>
        <li>
          <Link href='/pz-clock'>PZ Clock</Link>
        </li>
      </ul>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Miscellaneous Tools',
  meta: [
    {
      name: 'description',
      content: 'Miscellaneous Tools',
    },
  ],
};
