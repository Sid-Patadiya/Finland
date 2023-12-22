import moment from 'moment';
import { Platform, NativeModules } from 'react-native';

export const getLanguage = () => {
    const deviceLanguage = Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] : NativeModules.I18nManager.localeIdentifier;
    let enArray = ["en", "en_au", "en_AU", "en_ca", "en_CA", "en_gb", "en_GB", "en_ie", "en_IE", "en_in", "en_IN", "en_sg", "en_SG", "en_us", "en_US", "en_za", "en_za"]
    if (enArray.includes(deviceLanguage)) {
        return 'English'
    }
    else if (deviceLanguage == "fi") {
        return 'Finnish'
    }
    else {
        return 'English'
    }
}

export const getDurationByDate = (startDate, endDate) => {
    let start = moment(startDate).format('YYYY-MM-DD');
    let end = moment(endDate).format('YYYY-MM-DD');
    let today = moment(new Date()).format('YYYY-MM-DD');

    let _total = start.diff(end, 'days');
    let _days = today.diff(end, 'days');

    return (_days * 100) / _total;
}