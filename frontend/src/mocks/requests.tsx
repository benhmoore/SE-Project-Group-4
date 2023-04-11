// This file is used to mock requests to the backend

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

mock.onGet("/users").reply(200, {
  users: [{ id: 1, name: "John Smith" }],
});

mock.onPost("/user/signin").reply(200, {
  token: "1234567890",
});

mock.onGet("/products").reply(200, {
  products: [
    {
      id: 1,
      name: "Product 1",
      description:
        "This is a longer product description that demonstrates omission of text when a description reaches a certain length determined by a magic variable.",
      price: 10.99,
      image: "https://picsum.photos/600/600",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Product 2 description",
      price: 20.99,
      image: "https://picsum.photos/600/600",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Product 3 description",
      price: 30.99,
      image: "https://picsum.photos/600/600",
    },
  ],
});

mock.onGet("/products/1").reply(200, {
  products: [
    {
      id: 1,
      name: "Product 1",
      description:
        "This is a longer product description that demonstrates omission of text when a description reaches a certain length determined by a magic variable.",
      price: 10.99,
      image: "https://picsum.photos/600/600",
    },
  ],
});

mock.onGet("/products/2").reply(200, {
  products: [
    {
      id: 2,
      name: "Product 2",
      description: "Product 2 description",
      price: 20.99,
      image: "https://picsum.photos/600/600",
    },
  ],
});

mock.onGet("/products/3").reply(200, {
  products: [
    {
      id: 3,
      name: "Product 3",
      description: "Product 3 description",
      price: 30.99,
      image: "https://picsum.photos/600/600",
    },
  ],
});

let cartItems = [
  {
    cartItemId: 1,
    productId: 1,
    name: "Product 1",
    price: 10.99,
    quantity: 1,
  },
  {
    cartItemId: 2,
    productId: 2,
    name: "Product 2",
    price: 20.99,
    quantity: 1,
  },
  {
    cartItemId: 3,
    productId: 3,
    name: "Product 3",
    price: 30.99,
    quantity: 1,
  },
  {
    cartItemId: 4,
    productId: 4,
    name: "Product 4",
    price: 30.99,
    quantity: 1,
  },
];

// Mock getting the cart items
mock.onGet("/cart").reply(200, {
  cartItems: cartItems,
});

// Mock updating quantity of cart item
mock.onPut("/cart/items/1").reply(({ data }) => {
  const { quantity } = JSON.parse(data);
  return [200, { quantity }];
});

mock.onPut("/cart/items/").reply(({ data }) => {
  const { quantity } = JSON.parse(data);
  return [200, { quantity }];
});

mock.onPut("/cart/items/3").reply(({ data }) => {
  const { quantity } = JSON.parse(data);
  return [200, { quantity }];
});

// Mock adding a product to the cart
mock.onPost("/cart").reply(({ data }) => {
  const { productId, quantity } = JSON.parse(data);
  const cartItemId = cartItems.length + 1;
  cartItems.push({
    cartItemId,
    productId,
    quantity,
    name: `Product ${productId}`,
    price: 10.99 * cartItemId,
  });
  return [200, { cartItemId }];
});

// Mock adding a product to the cart
mock.onPost("/order").reply(({ data }) => {
  const cartId = 1;
  return [200, { cartId }];
});

mock.onPost("/order/return/1").reply(({ data }) => {
  const cartId = 1;
  return [200, { cartId }];
});
