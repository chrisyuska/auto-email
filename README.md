# Auto-Email
### An autocomplete JQuery plugin for email fields

![auto-email](https://github.com/chrisyuska/auto-email/raw/master/screenshot.png)

This plugin autocompletes email addresses when supplied with an email domain.  Instead of the regular JQuery autocomplete's dropdown menu of autocomplete suggestions, this types ahead while keeping the auto-filled text highlighted as to not obstruct the user.

### Demo

http://jsfiddle.net/T45pw/

### To use this plugin, download the file and on pageload, call:

```javascript
$('#your-field').autoEmail(["gmail.com", "foo.org", "foo.com", "foobar.com"], false);
```

The method accepts two parameters, `domains` and `multi-enabled`.

* `domains` is an array of domains to autocomplete with, autocompleting on the first match in the array.  Typing `joe@f` in the above example will first autocomplete to `joe@foo.org`.  After the user types `joe@foob`, the field will autocomplete to `joe@foobar.com`.
* `multi-enabled` is a boolean flag that enables the user to enter multiple emails in the field, separated by a `,` or `;`

### Credits

- Original created by [@chrisyuska](https://github.com/chrisyuska)
- Contributed to by [@btholt](https://github.com/btholt) and [@peterfarrell](https://github.com/peterfarrell)

