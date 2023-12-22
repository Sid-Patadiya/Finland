import * as TYPES from '../Services/Type';

export function ProfileCategoryResponse(data) {
  console.log('ProfileCategoryResponse---->', data);

  return {
    type: TYPES.PROFILE_CATEGORY_RESPONSE,
    payload: data,
  };
}

export function ProfileCategoryRequest() {
  return {
    type: TYPES.PROFILE_CATEGORY_REQUEST,
  };
}
