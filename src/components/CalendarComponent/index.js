import PropTypes from 'prop-types';
import React from 'react';

import MaskedMoney from '../MaskedMoneyComponent';

import classNames from '../../utils/classNames';

import './styles.scss';

const DAY_ORDER = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
];

const CalendarComponent = (props) => {
    const {
        weekList
    } = props;

    const {
        displayName
    } = CalendarComponent;

    const renderWeek = (weekData) => {
        const {
            calculatedWeeklyExpenditure,
            didExceedWeeklyLimit,
            endDate,
            startDate
        } = weekData;

        const weekStatusClassNames = classNames(
            `${displayName}__week-status`,
            {
                [`${displayName}__week-status--is-over`]: didExceedWeeklyLimit,
                [`${displayName}__week-status--is-under`]: !didExceedWeeklyLimit
            }
        );

        const weekDays = DAY_ORDER.map((day) => (
            <div
                className={`${displayName}__day`}
                key={day}
            >
                <span className={`${displayName}__day-label`}>
                    {day}
                </span>
            </div>
        ));

        return (
            <div
                className={`${displayName}__week-wrapper`}
                key={startDate}
            >
                <div className={`${displayName}__week`}>
                    {weekDays}
                    <div className={weekStatusClassNames}>
                        <div className={`${displayName}__week-data`}>
                            <span>
                                {`${startDate} - ${endDate}`}
                            </span>
                            <MaskedMoney value={calculatedWeeklyExpenditure} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={displayName}>
            {
                weekList.map(renderWeek)
            }
        </div>
    );
};

CalendarComponent.displayName = 'CalendarComponent';

CalendarComponent.propTypes = {
    weekList: PropTypes.arrayOf(PropTypes.shape({
        didExceedWeeklyLimit: PropTypes.bool,
        endDate: PropTypes.string,
        startDate: PropTypes.string
    }))
};

CalendarComponent.defaultProps = {
    weekList: []
};

export default CalendarComponent;
