var name = school.name,
	address = school.address,
	city = school.city,
	state = school.state,
	zip = school.zip,
	country = 'US';

var dictSchool = {};
$('#school1 tr').each(function(i, el) {
    var key = $.trim($(el).find('strong').text()),
        val = $.trim($(el).find('td[colspan]').text());
    dictSchool[key] = val;
});

var officePhone = dictSchool['Office Phone:'],
    athleticPhone = dictSchool['Athletic Phone:'],
    mascot = dictSchool['Mascot Name:'],
    url = dictSchool['Athletic Website:'] || dictSchool['School Website:'];

var footballCoaches = [];
var boysLacrosseCoaches = [];
var girlsLacrosseCoaches = [];
// pull out contacts with certain titles
$('#contacts1 tr').each(function(i, tr) {
    var tds = $(tr).find('td');
    if (!tds.length) return;
    var position = $.trim($(tds[0]).find('strong').text()),
        name = $.trim($(tds[1]).text().replace('  ', ' ')),
        email = $(tds[2]).find('a[href]').attr('href').substr('mailto:'.length),
        phone = $.trim($(tds[3]).text()) || athleticPhone || officePhone,
        isFootball = position && position.toLowerCase().indexOf('football') !== -1,
		isLacrosse = position && position.toLowerCase().indexOf('lacrosse') != -1,
		isForBoys = position && position.toLowerCase().indexOf('boys') != -1,
		isForGirls = position && position.toLowerCase().indexOf('girls') != -1;
	var contact = {
		name: name, title: position, email: email, phone: phone
	};
    if (isFootball) {
		footballCoaches.push(contact);
    }
	if(isLacrosse) {
		if(isForBoys) {
			boysLacrosseCoaches.push(contact);
		} else if(isForGirls) {
			girlsLacrosseCoaches.push(contact);
		} else {
			boysLacrosseCoaches.push(contact);
			girlsLacrosseCoaches.push(contact);
		}
	}
});
//if (contactAD) contacts.push(contactAD);

var str = '';
for (var i = 0; true; i++) {
	var columns = [];
	columns.push(name, officePhone || athleticPhone, city, state);
	
	if(!footballCoaches[i] && !boysLacrosseCoaches[i] && !girlsLacrosseCoaches[i]) {
		break;
	}
	
	if(footballCoaches[i]) {
		columns.push(footballCoaches[i].name, footballCoaches[i].email);
	} else {
		columns.push('', '');
	}
	if(boysLacrosseCoaches[i]) {
		columns.push(boysLacrosseCoaches[i].name, boysLacrosseCoaches[i].email);
	} else {
		columns.push('', '');
	}
	if(girlsLacrosseCoaches[i]) {
		columns.push(girlsLacrosseCoaches[i].name, girlsLacrosseCoaches[i].email);
	} else {
		columns.push('', '');
	}
	
    if (str) str += "\n";
    str += columns.join("\t");
}
if(str.length == 0){
    str += [name, /*url,*/ '', officePhone || athleticPhone, city, state, '', '', '', '', '', ''].join("\t");
}

//str = ["School", "School xPhone xNo", "City", "State", "Football coach", "Football coach Email", "Boys Lacrosse", "Boys Lacrosse email", "Girls Lacrosse", "Girls Lacrosse email"].join("\t") + "\n" + str;

var textarea = $('<textarea readonly="readonly" style="position:absolute;top:0;left:0;width:350px;height:175px;"></textarea>').val(str);
$('body').append(textarea);
textarea.select();