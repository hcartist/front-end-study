export async function getPublicData(year) {

  let url = `https://api.odcloud.kr/api/15044003/v1/${year}?page=1&perPage=10&serviceKey=d2%2BfmlzOnz5tgHooi65chC%2Fve0elOCdD%2F1mDgPETlRvXfkCsEi%2FYgg8wiBvAPoUqgbRTqy39rcHsJ3gNJHlImA%3D%3D`;


  const res = await fetch(url, {});

  if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
  }

  return res.json();

};

// export async function getPublicData2017() {

//   let url = "https://api.odcloud.kr/api/15044003/v1/uddi:f8a6c3c5-de87-497a-bd93-86211f6f0ad3?page=1&perPage=10&serviceKey=d2%2BfmlzOnz5tgHooi65chC%2Fve0elOCdD%2F1mDgPETlRvXfkCsEi%2FYgg8wiBvAPoUqgbRTqy39rcHsJ3gNJHlImA%3D%3D";


//   const res = await fetch(url, {});

//   if (!res.ok) {
//       throw new Error(`${res.status} ${res.statusText}`);
//   }

//   return res.json();

// };

// export async function getPublicData2018() {

//   let url = "https://api.odcloud.kr/api/15044003/v1/uddi:77900950-2d97-4fe5-8bd8-e27f65021a3f?page=1&perPage=10&serviceKey=d2%2BfmlzOnz5tgHooi65chC%2Fve0elOCdD%2F1mDgPETlRvXfkCsEi%2FYgg8wiBvAPoUqgbRTqy39rcHsJ3gNJHlImA%3D%3D";


//   const res = await fetch(url, {});

//   if (!res.ok) {
//       throw new Error(`${res.status} ${res.statusText}`);
//   }

//   return res.json();

// };

// export async function getPublicData2019() {

//   let url = "https://api.odcloud.kr/api/15044003/v1/uddi:d9db23d7-777f-47e6-9439-861f9f222ba2?page=1&perPage=10&serviceKey=d2%2BfmlzOnz5tgHooi65chC%2Fve0elOCdD%2F1mDgPETlRvXfkCsEi%2FYgg8wiBvAPoUqgbRTqy39rcHsJ3gNJHlImA%3D%3D";


//   const res = await fetch(url, {});

//   if (!res.ok) {
//       throw new Error(`${res.status} ${res.statusText}`);
//   }

//   return res.json();

// };

// export async function getPublicData2020() {

//   let url = "https://api.odcloud.kr/api/15044003/v1/uddi:4c6b68db-0857-4422-9bce-e4a9befa64c5?page=1&perPage=10&serviceKey=d2%2BfmlzOnz5tgHooi65chC%2Fve0elOCdD%2F1mDgPETlRvXfkCsEi%2FYgg8wiBvAPoUqgbRTqy39rcHsJ3gNJHlImA%3D%3D";


//   const res = await fetch(url, {});

//   if (!res.ok) {
//       throw new Error(`${res.status} ${res.statusText}`);
//   }

//   return res.json();

// };

// export async function getPublicData2021() {

//   let url = "https://api.odcloud.kr/api/15044003/v1/uddi:36028e48-751c-4609-9d1d-b704d1e0ea0b?page=1&perPage=10&serviceKey=d2%2BfmlzOnz5tgHooi65chC%2Fve0elOCdD%2F1mDgPETlRvXfkCsEi%2FYgg8wiBvAPoUqgbRTqy39rcHsJ3gNJHlImA%3D%3D";


//   const res = await fetch(url, {});

//   if (!res.ok) {
//       throw new Error(`${res.status} ${res.statusText}`);
//   }

//   return res.json();

// };
