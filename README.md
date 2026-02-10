<p align="center">
  <h1 align="center">affirm</h1>
</p>

<p align="center">
  A confirm dialog for React. One line. Beautiful.
</p>

<p align="center">
  <a href="https://pavlito.github.io/affirm">Documentation</a> ·
  <a href="https://pavlito.github.io/affirm/getting-started">Getting Started</a>
</p>

---

## Usage

```bash
npm install affirm
```

```jsx
// app/layout.tsx
import { Confirmer } from 'affirm';
import 'affirm/styles.css';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Confirmer />
    </>
  );
}
```

```jsx
import { confirm } from 'affirm';

async function handleDelete() {
  if (await confirm('Delete this item?')) {
    // confirmed
  }
}
```

## Documentation

Visit [pavlito.github.io/affirm](https://pavlito.github.io/affirm) for full documentation, examples, and API reference.

## License

MIT
