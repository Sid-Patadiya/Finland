import * as TYPES from '../Services/Type';

export function ContactSupportResponse(data) {
  console.log('ContactSupportResponseData---->', data);

  return {
    type: TYPES.CONTACT_SUPPORT_RESPONSE,
    payload: data,
  };
}

export function ContactSupportRequest(bodydata, navigation) {
  console.log('ContactSupportrequest ===>', bodydata);
  return {
    type: TYPES.CONTACT_SUPPORT_REQUEST,
    bodydata: bodydata,
    navigation: navigation,
  };
}
