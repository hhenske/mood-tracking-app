# React Guidelines — Small Project Notes

## Avoid setting state during render

Never call state setter functions (e.g., `setUser(...)`) directly in the component body outside of an event handler or `useEffect`.

Doing so causes React to enqueue a state update during render, which triggers a new render. If done unconditionally, this results in an infinite re-render loop and the error "Too many re-renders".

Best practices:
- Use the initial state argument to `useState()` for default/mock values.
- For one-time async or computed initialization, use `useEffect(() => { ... }, [])`.
- Avoid side-effects inside render.

Example:

```js
// ✗ Bad — causes re-render loop
function Comp() {
  const [state, setState] = useState(null);
  setState({ foo: 'bar' }); // don't do this
  return <div />;
}

// ✓ Good
function Comp() {
  const [state, setState] = useState({ foo: 'bar' });
  return <div />;
}
```
