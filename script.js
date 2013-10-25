var schoolName = school.name;
var schoolCity = school.city;
var schoolZip = school.zip;
var schoolState = school.state;

var dictSchool = {};
$('#school1 tr').each(function(i, el) {
    var key = $.trim($(el).find('strong').text()),
        val = $.trim($(el).find('td[colspan]').text());
    dictSchool[key] = val;
});

var officePhone = dictSchool['Office Phone:'];
var athleticPhone = dictSchool['Athletic Phone:'];
var schoolMascot = dictSchool['Mascot Name:'];
var schoolPhone = athleticPhone || officePhone;
var schoolConference = dictSchool["Conference"];
var schoolClass = dictSchool["Class"];

var lines = [];
$('#contacts1 tr').each(function(i, tr) {
    var tds = $(tr).find('td');
    if (!tds.length) return;
	
	var staffPosition = $.trim($(tds[0]).find('strong').text());
	var staffIsLacrosse = staffPosition && staffPosition.toLowerCase().indexOf('lacrosse') != -1;
	var staffName = $.trim($(tds[1]).text().replace('  ', ' '));
	var staffEmail = $(tds[2]).find('a[href]').attr('href').substr('mailto:'.length);
	
	if(staffIsLacrosse){
		lines.push(
			[
				schoolName,
				schoolCity + ", " + schoolZip,
				schoolState, 
				schoolPhone,
				staffPosition,
				staffName,
				staffEmail,
				schoolMascot,
				schoolConference,
				schoolClass
			].join("\t")
		);
	}
});

var textarea = $('<textarea readonly="readonly" style="position:absolute;top:0;left:0;width:350px;height:175px;"></textarea>').val(lines.join("\n"));
$('body').append(textarea);
textarea.select();
