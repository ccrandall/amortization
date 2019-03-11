exports.index = function(req, res) {
  res.render('calculate');
}

exports.calculate_post = function(req, res) {
	console.log(req.body);
  var principal = req.body.param.principal.replace(',','');
  var term = req.body.param.term;
  var interest_rate = Number(req.body.param.interest_rate);
  var start_month = req.body.param.start_month;
  var start_year = req.body.param.start_year;
  var total_months = term * 12;
  var number_of_payments = term * 12;
  var end_month = start_month;
  var end_year = parseInt(start_year) + parseInt(term);
  var current_date = new Date();
  var current_month = current_date.getMonth();

  // interest rate
  var yearly_periodic_interest_rate = interest_rate/100;
  var monthly_periodic_interest_rate = interest_rate/100/12;

  var topNum = 1+monthly_periodic_interest_rate;
  topNum = Math.pow(topNum, total_months);
  topNum = topNum * monthly_periodic_interest_rate;

  var bottomNum = 1+monthly_periodic_interest_rate;
  bottomNum = Math.pow(bottomNum, total_months) - 1;

  var monthly_payment = topNum/bottomNum * principal;

  var balance = Number(principal);
  
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
  data['current_date'] = current_date;
  data['current_month'] = current_month;
  data['monthly_payment'] = monthly_payment.toFixed(2);
  data['balance'] = balance;
  data['yearly_periodic_interest_rate'] = yearly_periodic_interest_rate;
  console.log(data);
	res.render('calculate', {data: data});
}

module.exports = router;