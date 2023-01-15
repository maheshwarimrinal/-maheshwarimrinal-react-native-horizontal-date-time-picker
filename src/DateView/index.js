import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import moment from 'moment';

const DateView = (props) => {
    const {
        isSelected,
        selectedContainer,
        text,
        onPress,
        displayTextStyle,
        selectedDisplayTextStyle,
    } = props;
    const selectedColor = isSelected ? {} : {};
    const selectedBorder = isSelected ? {} : {};
    const textStyle = isSelected ? selectedDisplayTextStyle : displayTextStyle;

    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                ...selectedContainer,
                backgroundColor: selectedColor,
                borderColor: selectedBorder,
            }}
            onPress={onPress}
        >
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    );
};

DateView.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    selectedContainer: PropTypes.object,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    displayTextStyle: PropTypes.object,
    selectedDisplayTextStyle: PropTypes.object,
};

DateView.defaultProps = {
    isSelected: false,
    selectedContainer: {},
    text: moment().format('Do MMM, YYYY'),
    onPress: () => {},
};

export default DateView;
