//global style
//alternative way to do similarly like components TitleText or BodyText
//can manage any styles which is shared across various components
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    bodyText: {
        fontFamily: 'open-sans'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }
})