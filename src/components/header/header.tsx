import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <ul>
        <li>
          <Link href="/">
            Miscellaneous Tools
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/pz-clock">
            PZ Clock
          </Link>
        </li>
      </ul>
    </header>
  );
});
