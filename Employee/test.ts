try {
  console.log(1);
} catch (err: unknown) {
  const e = err as any;
}
