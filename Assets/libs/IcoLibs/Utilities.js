function ICO_UTILS(pLog) {
    this.isLog = pLog;
    this.getUrlVars = function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    this.getParameterByName = function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    this.Log = function (pTitle, pMesseage) {
        if (that.isLog==1) {
            console.log(pTitle + ">>", pMesseage)
        }
    }

    this.getBase64Image = function (pFileInput, pCallBackFunction) {

        if (pFileInput.files && pFileInput.files[0]) {
            var FR = new FileReader();

            FR.addEventListener("load", function (e) {
                $() = e.target.result;
            });

            FR.readAsDataURL(pFileInput.files[0]);
        }
    }

    var that = this;
}