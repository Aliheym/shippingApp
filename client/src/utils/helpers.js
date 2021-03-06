export const calculatePrice = products =>
  products.reduce((a, c) => a + c.price * c.quantity, 0);

export const shuffle = array => {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};
