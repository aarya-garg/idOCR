import vision from "@google-cloud/vision";
import { preprocessedData } from "./preprocess.js";

const KEYS = JSON.parse(
  JSON.stringify({
    "type": "service_account",
    "project_id": "thai-ocr-409208",
    "private_key_id": "a411f911736ad5536a48bcd3038c80381c6a9976",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0F4JqbGn5g6fO\ngwGiyYLmQaWrXuVAHmeAmlKpLTWq2mfpK3E1shbGxIUPvxTlJbqF5ymdRduewvPe\nRrX6cUQh37tvF9NA2jjUa/OjDOjhJkqPndRb74AqweWd4B4K5m+yfiBd5AVcECTt\nAcUjNu14klf8hRWlLnXakazBDQObQXInA2yMfAeoPaxJr2gQsmAEXpHSVd4Re0SI\ni2i4FR7/O30y8GHMNV3xICzCT6IScVw1ZQIA0arPR17BleXpDu0/T1G9DFXGeCgF\nUOm88eUQKCbxQPLgfX6XeTKyLSM9FMZiL1sD/W4WFCQrFo4j3M+GvHhCXSqhD4bW\nacd1Q3DxAgMBAAECggEAHkoH8rtKNZ+JhSeuikEHJY/r+78popeag9www+hpKtOx\n/1sBnuzVfNfHo2bZblLipKvE6YE612BloMBW0gjj0yisfxpMOw+Y2E1RvF4q+tc0\nWiRK96136nkTE/MCSoYISkaBThlQN3Q1qbEPBYWy+gDvEHcXtWDzjG/M1OlJ7n4S\npGl5vt7hcs1VSnFseZEIg7xDHtYwbi3trJImvtfsKwzE9jQ/TKZyYRF6OCph1n1U\nimeXXADP3NjrVzQA0Sur+MS193mQZWKC6PaCWla+0ODtC5BUHUEJZSTxN3tYEp4q\nxZfsx7BsY2J7qeIphcGJq6uLTjdIpMs2UM+rFmVhmQKBgQDbyBfrcyT0gLhFz5+X\nn0Y7Chj1nbh404FL3N8E18EeS1cJyVPkjM7UTncY5TD4s6/JDbchXs2GTtAP/YIB\nc8HKMEdD/n0/R+Jn/IlssKG6Dfwa9sZkhLLG44Jj6SEDySwHXvMTcZMmQ4N0ma2+\nH1Rm+bmpOs60Q+JxbwwM/zeaZQKBgQDRxQbiF1ENVQwvivEH9pKLo3MZoYuoJTi9\nrbWsQf92cZAG4bc1tGpDvR4IeuXgOC/QCNJJ2kCIAa9DtTeZyPtncl+DsHjdRMqI\nwkT0lInVJ1CvtHIt5AQRnX9aIHc2jRdijAcG7vl8R/i+y5S+yVeLU2VUplhivKKW\nzXP1Do4tnQKBgBEZiVrlU4u+dBfiZo1adBFl4LlDczXbZuTrI2LyEnFz9Sqqwl82\n4WS9UiDavCutd1DSQ1xSTvVTLncAB1xrkDlV9kWBCGejBSeIC30sZPjf26yRZLAv\nbuVwkBWL7uinf0h3h7wMiyFgAVtSFaWENIHqjhpvm+OEoJqoxCxCsyXNAoGBAKfn\nRegoc6bxQSy40M7n7Uq6DMIiTS/Mg0tHxJfZx8odggQQHV5uR3Rq5qQxAtjjAFpL\nBU8509dJSekvHw8IETsvEAbPdR7fFiI7JYiDcIPd0Taif5X94cfbwfj47ZMLggFO\nRb2mAKoazZ6iQzAm5tzNZtlHwI1foeCFGOC4wtL9AoGAB2+6HlTuStYL4zYlqNPO\nTWgJ86ZHCtCq/5xQSryglGRaQgXi29Ey4GMuHzPISY5EiKX+v1zUKj7olL5SJXDZ\nIAMMepG/JSDjILmE5YL563nw3jjSYp38s8HvlwIRFJp8nNUv+kzBpUJCtMSgEqXG\ncFQNqlV1pSGCevOaH4pZL9A=\n-----END PRIVATE KEY-----\n",
    "client_email": "ocr-899@thai-ocr-409208.iam.gserviceaccount.com",
    "client_id": "116214677902285743335",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ocr-899%40thai-ocr-409208.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }  
  )
);

const CONFIGURATIONS = {
  credentials: {
    private_key: KEYS.private_key,
    client_email: KEYS.client_email,
  },
};

const client = new vision.ImageAnnotatorClient(CONFIGURATIONS);
function removeThaiWords(sentence) {
  const thaiRange = /[\u0E00-\u0E7F]/;
  const allWords = sentence.split(/\s+/);
  const OtherWords = allWords.filter((word) => !thaiRange.test(word));
  const UpdatedSentence = OtherWords.join(" ");

  return UpdatedSentence;
}
export const OCRinfo = async (path) => {
  let [result] = await client.textDetection(path);
  let astr = result.fullTextAnnotation.text;
  let cleanText = removeThaiWords(astr);
  console.log(cleanText);
  let data = preprocessedData(cleanText);
  return data;
};



