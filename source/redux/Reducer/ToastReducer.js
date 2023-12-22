import SnackBar from 'react-native-snackbar';
import {TOGGLE_APP_UPDATE_MODAL, SHOW_TOAST} from '../Services/Type';
import Color from '../../theme/Color';

const initialState = {
  isAppUpdateModalVisible: false,
};

function getToastBackgroundColor(type) {
  switch (type) {
    case 'positive':
      return Color.POSITIVE;
    case 'negative':
      return Color.ERROR;
    default:
      return Color.ERROR;
  }
}

export const TostReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      SnackBar.show({
        text: action.payload.title,
        duration: SnackBar.LENGTH_LONG,
        backgroundColor: getToastBackgroundColor(action.payload.type),
      });
      return {
        ...state,
      };
    default:
      return state;
  }
};
