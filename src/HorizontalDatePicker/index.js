import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Pill from '../Pill';
import { styles } from './styles';
import DateView from '../DateView';

let currentNumberOfDays = 10;
let scrollDateToIndex = true;
let daysDifference = 0;

const HorizontalCalendar = (props) => {
    const { selectedDate, setSelectedDate } = props;
    const [dates, setDates] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const flatListRef = useRef(null);

    useEffect(() => {
        daysDifference = moment(selectedDate).diff(new Date(), 'days') + 10; // Adding 10 so that we can load next 10 days as well
        generateHorizontalCalendarDates(daysDifference);
        return () => {
            scrollDateToIndex = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (dates.length > 0 && scrollDateToIndex) {
            setTimeout(() => {
                flatListRef.current.scrollToIndex({
                    animated: true,
                    index: selectedIndex,
                    viewOffset: 20,
                });
                scrollDateToIndex = false;
            }, 100);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dates, selectedIndex]);

    const dateSubtractDays = (date, days) => {
        var result = moment(date).add(days, 'days');
        return result;
    };

    const isSameDay = (date1, date2, index) => {
        const isSameDaySelected =
            moment(date1).format('Do MMM YYYY') ===
            moment(date2).format('Do MMM YYYY');
        if (isSameDaySelected) setSelectedIndex(index);
        return isSameDaySelected;
    };

    const generateHorizontalCalendarDates = (days) => {
        const today = new Date();
        let result = [];

        for (let i = 0; i < days; i++) {
            result[i] = dateSubtractDays(today, i);
        }
        const newDates = [...result, result];
        setDates(newDates);
    };

    const onDatePress = (date) => {
        setSelectedDate(date);
    };

    const renderItem = ({ item, index }) => {
        const dayNumber = moment(item).format('DD MMM, ddd');
        const isSelected = isSameDay(selectedDate, item, index);
        const onPress = () => onDatePress(item);
        return (
            <DateView
                text={dayNumber}
                onPress={onPress}
                isSelected={isSelected}
                key={dayNumber}
            />
        );
    };

    const keyExtractor = (item) => item?.toString();

    const onEndReached = () => {
        daysDifference += currentNumberOfDays;
        generateHorizontalCalendarDates(daysDifference);
    };

    const scrollToIndexFailed = () => {
        setTimeout(() => {
            flatListRef?.current.scrollToIndex({
                animated: true,
                index: selectedIndex,
                viewOffset: 20,
            });
            scrollDateToIndex = false;
        }, 100);
    };
    return (
        <FlatList
            ref={flatListRef}
            data={dates}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            horizontal
            contentContainerStyle={styles.contentContainerStyle}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={365}
            maxToRenderPerBatch={365}
            onEndReached={onEndReached}
            removeClippedSubviews
            onEndReachedThreshold={0.5}
            scrollEventThrottle={16}
            onScrollToIndexFailed={scrollToIndexFailed}
        />
    );
};

HorizontalCalendar.propTypes = {
    selectedDate: PropTypes.any.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
};

export default HorizontalCalendar;
