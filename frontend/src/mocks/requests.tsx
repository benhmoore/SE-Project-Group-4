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
