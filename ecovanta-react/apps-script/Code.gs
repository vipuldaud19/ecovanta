// ECOVANTA pickup requests -> Google Sheet row + email to you.
// Setup: Sheet > Extensions > Apps Script > paste this > Deploy > New deployment > Web app
// (Execute as: Me, Who has access: Anyone) > copy the Web app URL into src/content.ts (sheetUrl).
const HEADERS = ['Time', 'Request ID', 'Status', 'Name', 'Business', 'Phone', 'Email', 'City', 'Pickup address', 'Google Maps', 'Business type', 'Oil quantity', 'Preferred date', 'Message'];

function doGet() {
  return ContentService.createTextOutput('ECOVANTA pickup endpoint is live.');
}

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (!d.name || !d.phone || !d.address) throw new Error('Missing name, phone or address');
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#0b3d2e').setFontColor('#ffffff');
      sh.setFrozenRows(1);
      sh.getRange('F:F').setNumberFormat('@'); // keep phone numbers as text (+91..., leading 0)
      sh.getRange('C2:C2000').setDataValidation(SpreadsheetApp.newDataValidation()
        .requireValueInList(['New', 'Scheduled', 'Collected', 'Cancelled'], true).build());
    }
    const v = k => String(d[k] || '');
    sh.appendRow([new Date(), v('ref'), 'New', v('name'), v('biz'), v('phone'), v('email'), v('city'), v('address'),
      v('maps'), v('type'), v('qty'), v('date'), v('msg')]);
    const line = (label, k) => label + ': ' + (v(k) || '-');
    MailApp.sendEmail(Session.getEffectiveUser().getEmail(), 'New ECOVANTA pickup request: ' + v('name') + ', ' + v('city'),
      [line('Name', 'name'), line('Business', 'biz'), line('Phone', 'phone'), line('Email', 'email'), line('City', 'city'),
       line('Pickup address', 'address'), line('Google Maps', 'maps'), line('Business type', 'type'),
       line('Oil quantity', 'qty'), line('Preferred date', 'date'), line('Message', 'msg'), line('Request ID', 'ref')].join('\n'));
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}
