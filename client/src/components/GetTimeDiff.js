import moment from 'moment';

export default (time) => {
	var duration = moment.duration(moment(moment().format()).diff(time));
	if (duration.days()) {
		return 'Posted ' + duration.days() + ' ' + (duration.days() > 1 ? 'Days Ago' : 'Day Ago')
	} else if (duration.hours()) {
		return 'Posted ' + duration.hours() + ' ' + (duration.hours() > 1 ? 'Hours Ago' : 'Hour Ago')
	} else if (duration.minutes()) {
		return 'Posted ' + duration.minutes() + ' ' + (duration.minutes() > 1 ? 'Minutes Ago' : 'Minute Ago')
	} else {
		return 'Posted ' + duration.seconds() + ' ' + (duration.seconds() === 1 ? 'Second Ago' : 'Seconds Ago')
	}
};

