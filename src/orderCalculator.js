function calculateSubtotal(items) {
  if (!Array.isArray(items) || items.length === 0) return 0;

  return items.reduce((sum, item) => {
    if (item.price < 0) {
      throw new Error('Цена не может быть отрицательной');
    }
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      throw new Error('Количество должно быть положительным целым числом');
    }
    return sum + item.price * item.quantity;
  }, 0);
}

function applyDiscount(amount, promoCode) {
  if (amount < 0) {
    throw new Error('Сумма не может быть отрицательной');
  }

  if (promoCode === 'STUDENT10') {
    return amount - amount * 0.1;
  }

  if (promoCode === 'NODE20') {
    if (amount >= 1000) {
      return amount - amount * 0.2;
    }
    return amount;
  }

  return amount;
}

function calculateDelivery(amount, deliveryType) {
  if (deliveryType === 'pickup') {
    return 0;
  }

  if (deliveryType === 'courier') {
    return amount >= 3000 ? 0 : 300;
  }

  throw new Error('Неизвестный способ доставки');
}

function calculateTotal(order) {
  const subtotal = calculateSubtotal(order.items);
  const discounted = applyDiscount(subtotal, order.promoCode);
  const delivery = calculateDelivery(discounted, order.deliveryType);
  const total = discounted + delivery;

  if (total < 0) {
    throw new Error('Итоговая стоимость не может быть отрицательной');
  }

  return total;
}

module.exports = {
  calculateSubtotal,
  applyDiscount,
  calculateDelivery,
  calculateTotal,
};
