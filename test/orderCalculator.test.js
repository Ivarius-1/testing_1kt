const { test } = require('node:test');
const assert = require('node:assert/strict');
const {
  calculateSubtotal,
  applyDiscount,
  calculateDelivery,
  calculateTotal,
} = require('../src/orderCalculator');

test('calculateSubtotal: расчёт стоимости одного товара', () => {
  const result = calculateSubtotal([{ price: 100, quantity: 2 }]);
  assert.equal(result, 200);
});

test('calculateSubtotal: расчёт стоимости нескольких товаров', () => {
  const result = calculateSubtotal([
    { price: 2500, quantity: 1 },
    { price: 500, quantity: 2 },
  ]);
  assert.equal(result, 3500);
});

test('calculateSubtotal: пустая корзина имеет стоимость 0', () => {
  const result = calculateSubtotal([]);
  assert.equal(result, 0);
});

test('calculateSubtotal: отрицательная цена приводит к ошибке', () => {
  assert.throws(() => calculateSubtotal([{ price: -100, quantity: 1 }]));
});

test('calculateSubtotal: нецелое количество приводит к ошибке', () => {
  assert.throws(() => calculateSubtotal([{ price: 100, quantity: 1.5 }]));
});

test('calculateSubtotal: нулевое или отрицательное количество приводит к ошибке', () => {
  assert.throws(() => calculateSubtotal([{ price: 100, quantity: 0 }]));
  assert.throws(() => calculateSubtotal([{ price: 100, quantity: -1 }]));
});

test('applyDiscount: промокод STUDENT10 даёт скидку 10%', () => {
  const result = applyDiscount(1000, 'STUDENT10');
  assert.equal(result, 900);
});

test('applyDiscount: промокод NODE20 даёт скидку 20% при сумме от 1000', () => {
  const result = applyDiscount(1000, 'NODE20');
  assert.equal(result, 800);
});

test('applyDiscount: промокод NODE20 не действует при сумме меньше 1000', () => {
  const result = applyDiscount(999, 'NODE20');
  assert.equal(result, 999);
});

test('applyDiscount: неизвестный промокод не даёт скидку', () => {
  const result = applyDiscount(1000, 'UNKNOWN');
  assert.equal(result, 1000);
});

test('applyDiscount: отсутствие промокода не даёт скидку', () => {
  const result = applyDiscount(1000, undefined);
  assert.equal(result, 1000);
});

test('calculateDelivery: самовывоз бесплатный', () => {
  const result = calculateDelivery(500, 'pickup');
  assert.equal(result, 0);
});

test('calculateDelivery: курьерская доставка стоит 300', () => {
  const result = calculateDelivery(500, 'courier');
  assert.equal(result, 300);
});

test('calculateDelivery: курьерская доставка бесплатна при сумме от 3000', () => {
  const result = calculateDelivery(3000, 'courier');
  assert.equal(result, 0);
});

test('calculateDelivery: неизвестный способ доставки приводит к ошибке', () => {
  assert.throws(() => calculateDelivery(500, 'drone'));
});

test('calculateTotal: полный расчёт с примером из задания', () => {
  const order = {
    items: [
      { name: 'Клавиатура', price: 2500, quantity: 1 },
      { name: 'Кабель', price: 500, quantity: 2 },
    ],
    promoCode: 'STUDENT10',
    deliveryType: 'courier',
  };
  const result = calculateTotal(order);
  assert.equal(result, 3150);
});

test('calculateTotal: заказ без промокода и с платной доставкой', () => {
  const order = {
    items: [{ price: 100, quantity: 1 }],
    promoCode: undefined,
    deliveryType: 'courier',
  };
  const result = calculateTotal(order);
  assert.equal(result, 400);
});

test('calculateTotal: пустая корзина с самовывозом стоит 0', () => {
  const order = {
    items: [],
    promoCode: undefined,
    deliveryType: 'pickup',
  };
  const result = calculateTotal(order);
  assert.equal(result, 0);
});
