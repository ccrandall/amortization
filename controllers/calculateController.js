var validationResult = require('express-validator/check').validationResult;
var check = require('express-validator/check').check;

exports.index = function(req, res) {
  res.render('calculate');
  console.log('called index');
}

exports.validate = function(method) {
	switch (method) {
		case 'calculate_post': {
			return [
				check('param[principal]', 'Principal must be a number, without comma.').isNumeric(),
				check('param[term]', 'Term must be a number.').isNumeric(),
				check('param[interest_rate]', 'Interest Rate must be a number.').isNumeric(),
				// check('param[start_month]', 'Start Month must be a valid month abbreviation, e.g. Jun').escape(),
				check('param[start_date]', 'Start Date is required.').escape()
			]
		}
	}
}

exports.addMonths = function(dateObj, num) {
    var currentMonth = dateObj.getMonth() + dateObj.getFullYear() * 12;
    dateObj.setMonth(dateObj.getMonth() + num);
    var diff = dateObj.getMonth() + dateObj.getFullYear() * 12 - currentMonth;
    // If don't get the right number, set date to 
    // last day of previous month
    if (diff != num) {
        dateObj.setDate(0);
    } 
    return dateObj;
}

exports.calculate_post = function(req, res) {
	var errors = validationResult(req);
	//console.log(errors.array());
	if (!errors.isEmpty()) {
		return res.status(422).render('index', {errors: errors.array()});
	}
	
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  var principal = req.body.param.principal.replace(',','');
  var term = req.body.param.term;
  var interest_rate = Number(req.body.param.interest_rate);
  var start_date = req.body.param.start_date;
  var total_months = term * 12;
  var number_of_payments = term * 12;
  var display_date = new Date(start_date);
  var start_month = monthNames[display_date.getMonth()];
  var start_year = display_date.getFullYear();
  var end_month = '';
  var end_year = '';
  
  // interest rate
  var yearly_periodic_interest_rate = interest_rate/100;
  var monthly_periodic_interest_rate = interest_rate/100/12;

  var topNum = 1+monthly_periodic_interest_rate;
  topNum = Math.pow(topNum, total_months);
  topNum = topNum * monthly_periodic_interest_rate;

  var bottomNum = 1+monthly_periodic_interest_rate;
  bottomNum = Math.pow(bottomNum, total_months) - 1;

  var monthly_payment = Number(topNum/bottomNum * principal);
  var balance = Number(principal);
  var total_interest_paid = 0;
  var remaining_balance = 0;
  var interest_payment = 0;
  var principal_payment = 0;
  var total_of_payments = 0;
  var results_data = '';

  for (var i = 0; i <= number_of_payments-1; i++) {
  	exports.addMonths(display_date,1);
  	remaining_balance = (balance * yearly_periodic_interest_rate/12+balance) - monthly_payment;
    interest_payment = (balance * yearly_periodic_interest_rate)/12;
    principal_payment = monthly_payment - interest_payment;
    balance = remaining_balance;

		total_interest_paid += interest_payment; 
		total_of_payments += principal_payment + interest_payment;
		results_data += '<tr>';
		results_data += '<td>' + monthNames[display_date.getMonth()] + ' ' + display_date.getFullYear() + '</td><td>$' + interest_payment.toFixed(2) + '</td><td>$' + principal_payment.toFixed(2) + '</td><td>$' + remaining_balance.toFixed(2) + '</td>';
		results_data += '</tr>';
		if (i == number_of_payments-1) {
			end_month = monthNames[display_date.getMonth()];
			end_year = display_date.getFullYear();
		}
  }

  results_data += '<tr><td colspan="4">Total Payments: ' + number_of_payments + '</td></tr>';
  
  var data = [];
  data['principal'] = principal;
  data['term'] = term;
  data['interest_rate'] = interest_rate;
  data['start_month'] = start_month;
  data['start_year'] = parseInt(start_year);
  data['total_months'] = total_months;
  data['number_of_payments'] = number_of_payments;
  data['end_month'] = end_month;
  data['end_year'] = end_year;
  //data['current_date'] = current_date;
  //data['current_month'] = current_month;
  data['monthly_payment'] = monthly_payment.toFixed(2);
  data['yearly_periodic_interest_rate'] = yearly_periodic_interest_rate;
  data['total_interest_paid'] = total_interest_paid.toFixed(2);
  data['total_of_payments'] = total_of_payments.toFixed(2);

	res.render('calculate', {data: data, results_data: results_data});
}