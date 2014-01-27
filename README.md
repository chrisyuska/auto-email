# Auto-Email
### An autocomplete JQuery plugin for email fields

![auto-email](https://github.com/chrisyuska/auto-email/raw/master/screenshot.png)

This plugin autocompletes email addresses when supplied with an email domain.  Instead of the regular JQuery autocomplete's dropdown menu of autocomplete suggestions, this types ahead while keeping the auto-filled text highlighted as to not obstruct the user.

### Demo

http://jsfiddle.net/MauH7/

## To use this plugin, download the file and on pageload, call:

```javascript
$('#your-field').autoEmail("yourdomain.com", false);
```

The method accepts two parameters, `domain` and `multi-enabled`.

* `domain` is the domain to use for autocompletion
* `multi-enabled` is a boolean flag that enables the user to enter multiple emails in the field, separated by a `,` or `;`
