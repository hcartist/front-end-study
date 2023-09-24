

export async function getPublicData(districtId, year) {
  
    let url = "https://api.odcloud.kr/api/15044003/v1/uddi:f8a6c3c5-de87-497a-bd93-86211f6f0ad3?page=1&perPage=10&serviceKey=d2%2BfmlzOnz5tgHooi65chC%2Fve0elOCdD%2F1mDgPETlRvXfkCsEi%2FYgg8wiBvAPoUqgbRTqy39rcHsJ3gNJHlImA%3D%3D";

  
    const res = await fetch(url, {});
  
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
  
    return res.json();
  }
  
  