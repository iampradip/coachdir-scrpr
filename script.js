// http://ecoachesdirectory.com/subscriber/school_view.php?ID=4759
// modification 23-04-2013 23:15 GMT+0530 iampradip@github

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
})

var officePhone = dictSchool['Office Phone:'],
    athleticPhone = dictSchool['Athletic Phone:'],
    mascot = dictSchool['Mascot Name:'],
    url = dictSchool['Athletic Website:'] || dictSchool['School Website:'];

var contacts = [], contactAD = null;
// pull out contacts with certain titles
$('#contacts1 tr').each(function(i, tr) {
    var tds = $(tr).find('td');
    if (!tds.length) return;
    var position = $.trim($(tds[0]).find('strong').text()),
        name = $.trim($(tds[1]).text().replace('  ', ' ')),
        email = $(tds[2]).find('a[href]').attr('href').substr('mailto:'.length),
        phone = $.trim($(tds[3]).text()) || athleticPhone || officePhone,
        isFootball = position && position.toLowerCase().indexOf('football') !== -1,
        isAD = position && position.toLowerCase().indexOf('athletic director') !== -1;
    if (isFootball /*|| isAD*/) {
        var contact = {
            name: name, title: position, email: email, phone: phone
        };
        if (isAD) {
            contactAD = contact; // we want to wait to put AD contact last
        } else {
            contacts.push(contact);
        }
    }
});
if (contactAD) contacts.push(contactAD);

var str = '';
for (var i = 0; i < contacts.length; i++) {
    contact = contacts[i];
    var columns = [name, /*url,*/ '', contact.email, contact.phone, contact.name, contact.title, address, city, state, zip, country, '', '', '', '', '', mascot];
    if (str) str += "\n";
    str += columns.join("\t");
}

var textarea = $('<textarea readonly="readonly" style="position:absolute;top:0;left:0;width:350px;height:175px;"></textarea>').val(str);
$('body').append(textarea);
textarea.select();