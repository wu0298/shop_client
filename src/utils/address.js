import addressData from "china-area-data/data";

export function initAddress(address) {
  const province = addressData[86][address[0]];
  const city = addressData[address[0]][address[1]];
  const area = addressData[address[1]][address[2]];

  return `${province}  ${city}  ${area}`;
}
