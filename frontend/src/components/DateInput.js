import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const DateInput = ({dateLabel, selectedDate, handleDateChange}) => {

    return (
        <div>
            <label htmlFor="dateInput">{dateLabel}</label>
            <DatePicker
                // TODO Need to update ID so that it dynamically changes to start or end date?
                id="dateInput"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
            />
        </div>
    );
};

export default DateInput;