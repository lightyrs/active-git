var dateRangeString = function() {

  var fullDate = new Date();
  var twoDigitMonth = fullDate.getMonth() + 1 + "";

  if (twoDigitMonth.length == 1) {
    twoDigitMonth = "0" + twoDigitMonth;
  }

  var twoDigitDate = fullDate.getDate() + "";

  if (twoDigitDate.length == 1) {
    twoDigitDate = "0" + twoDigitDate;
  }

  var currentDate = "" + fullDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;
  var oneYearAgo  = "" + (fullDate.getFullYear() - 1) + "-" + twoDigitMonth + "-" + twoDigitDate;

  return " pushed:\"" + oneYearAgo + " .. " + currentDate + "\"";
}

var initializeExtension = function() {

  var $searchForm  = jQuery(".js-site-search").not(".repo-scope").find("form").add("form.search_repos");
  var $searchInput = $searchForm.find("input[type=text]");

  $searchForm.on('submit', function(e) {

    var originalValue = $searchInput.val();

    if (!originalValue.match(/pushed:"\d{4}-\d{2}-\d{2}/)) {

      if (originalValue) {
        $searchInput.val("" + originalValue + dateRangeString());
      }
    }
  });
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
  	if (document.readyState === "complete") {
  		clearInterval(readyStateCheckInterval);
      initializeExtension();
  	}
	}, 10);
});
