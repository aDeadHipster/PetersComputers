function Cookie() {

    this.data = {};

    this.load = function () {
        var the_cookie = document.cookie.split(';');
        if (the_cookie[0]) {
            this.data = JSON.parse(decodeURIComponent(the_cookie[0]));
        }
    };

    this.save =  function (exDays, path) {
        var date = exDays ? new Date().setDate(new Date().getDate() + exDays) : new Date().setDate(new Date().getDate() + 365);
        var p = path || '/';
        document.cookie = encodeURIComponent(JSON.stringify(this.data))
            + ';path=' + p
            + ';expires=' + date
    };

    this.clear = function() {
        this.data = {};
        this.save();
    }
}

