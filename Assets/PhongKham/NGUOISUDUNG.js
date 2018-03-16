
var NGUOISUDUNG = function (pLog) {
    this.URL="";

    this.Madvi = '';
    this.nsd = '';
    this.Matkhau = '';
    this.sdt = '';
    this.email = '';
    this.ID_ns = '';
    this.Active = '';
    this.Tenhienthi = '';
    this.ngay_nh = '';

    this.isLog = pLog;
    this.ChiTiet = null;
    this.DanhSach = [];
    var that = this;

    
    this.find_01 = function (pTuKhoa) {
        var _rs = null;
        var _send = { 'pTuKhoa': pTuKhoa };
        var request = $.ajax({
            url: this.URL+"/TiepNhan/nguoisudung_find_01",
            type: "POST",
            data: JSON.stringify(_send),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            async: false
        });

        request.done(function (_response) {
            _rs = _response;
            that.log('_obj', _rs);
            if (_rs.CODE == 'SUC') {
                that.DanhSach = _rs.OBJECT;
            }
            
        });

        request.fail(function (jqXHR, textStatus) {
            alert("Lỗi tại server: " + textStatus);
        });

        return _rs;
    }

    this.log = function (pTitle,pMsg) {
        if (this.isLog == 1) {
            console.log(pTitle + '>>', pMsg);
        }
    }
}