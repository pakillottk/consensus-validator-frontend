import React from 'react';

const defaultLocale = 'es-ES';

export default function Currency({ currency = 'EUR', quantity = 0 }) {
  const numericValue = Number(quantity) || 0;
  const formatted = new Intl.NumberFormat(defaultLocale, {
    style: 'currency',
    currency
  }).format(numericValue);

  return <span>{formatted}</span>;
}
