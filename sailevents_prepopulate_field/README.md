- jquery.datetimepicker.full.js has an important fix: https://github.com/xdan/datetimepicker/issues/724
This fix changes default behavior on parsing 'h' in format string.
Original datetimepicker reduces this value by one, but when format is '12h' its not desired.