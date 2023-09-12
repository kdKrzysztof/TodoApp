import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { isDayjs } from 'dayjs';
import { DatePickerElement } from 'react-hook-form-mui';

const DatePicker = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePickerElement
        name="pickedDate"
        label="Expiration Date"
        sx={{ width: '100%' }}
        validation={{
          validate: (value) => (isDayjs(value) && value.isValid() ? true : 'Invalid date format')
        }}
        parseError={(err) => {
          return err?.message || 'Something went wrong';
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
