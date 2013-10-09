# Auto-Email
### An autocomplete JQuery plugin for email fields

![auto-email](https://github.com/chrisyuska/auto-email/raw/master/screenshot.png)

This plugin autocompletes email addresses when supplied with an email domain.  Instead of the regular JQuery autocomplete's dropdown menu of autocomplete suggestions, this types ahead while keeping the auto-filled text highlighted as to not obstruct the user.

## To use this plugin, download the file and on pageload, call:

```javascript
$('#your-field').autoEmail(["gmail.com", "yahoo.com", "aol.com", "ymail.com", "anything.com"]);
```

The library will give preference to the entry that comes first in the array. IE btholt@y will autocomplete to yahoo.com first, but after typing ym will autocomplete to ymail.com.

##### This is in early development, so it's not perfect.

## Edits by [@holtbt](http://www.twitter.com/holtbt)

- Removed the functionality for semicolons and commas. This is intended for email input fields.
- Added the ability to accept an array of domains.
