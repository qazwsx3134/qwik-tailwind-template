import { component$ } from "@builder.io/qwik";

import styles from "./footer.module.css";

export default component$(() => {
  return (
    <footer>
      <a href="https://www.builder.io/" target="_blank" class={styles.anchor}>
        Made with ♡ by Builder.io
        <span class={styles.spacer}>|</span>
      </a>
    </footer>
  );
});
