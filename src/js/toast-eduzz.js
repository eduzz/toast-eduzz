var toast = {
    toastEl: document.createElement('div'),
    closeToast: function() {
        clearInterval(this.intervalFunc);
        this.toastEl.classList.remove('active');
    },
    getMessage: function(item) {
        var plural = [
            'Última compra foi concluída nos últimos {value} minutos',
            '{value} pessoas compraram este produto nas últimas 24 horas',
            '{value} pessoas compraram este produto na última semana',
            '{value} pessoas estão acessando este produto',
            '{value} pessoas se interessaram por este produto nas últimas 24 horas',
            '{value} pessoas se interessaram por este produto na última semana'
        ];

        var singular = [
            'Última compra foi concluída no último minuto',
            '{value} pessoa comprarou este produto nas últimas 24 horas',
            '{value} pessoa comprarou este produto na última semana',
            '{value} pessoa está acessando este produto',
            '{value} pessoa se interessarou por este produto nas últimas 24 horas',
            '{value} pessoa se interessarou por este produto na última semana'
        ];

        if (item.value === 1) {
            return singular[item.id - 1].replace('{value}', item.value);
        }

        return plural[item.id - 1].replace('{value}', item.value);
    },
    showToast: function(data, timeout) {
        console.log(data);
        var that = this;
        var elHtml = '<div class="toastIcon">\
              <svg viewBox="0 0 30 25" xmlns="http://www.w3.org/2000/svg">\
                  <g >\
                    <path d="M9.08128544 25c-.68809073 0-1.27032136-.2639752-1.53497164-.7391304-.31758034-.5807454-.26465028-1.3726708.15879017-2.1645963.79395085-1.4254658 2.54064273-2.5341615 4.02268433-2.5341615.6880907 0 1.2703213.2639752 1.5349716.7391304.3175804.5807454.2646503 1.3726708-.1587901 2.1645963C12.3100189 23.8913043 10.563327 25 9.08128544 25zm2.64650286-4.6459627c-1.1644613 0-2.69943291 1.0031056-3.33459359 2.1645962-.31758034.5807454-.3705104 1.0559007-.21172023 1.3726708.21172023.3167702.58223062.3695653.89981096.3695653 1.16446126 0 2.69943286-1.0031056 3.33459356-2.1645963.3175804-.5807453.3705104-1.0559006.2117202-1.3726708-.2117202-.3167702-.5822306-.3695652-.8998109-.3695652zM19.6672968 25c-.6880908 0-1.2703214-.2639752-1.5349717-.7391304-.3175803-.5807454-.2646502-1.3726708.1587902-2.1645963.7939509-1.4254658 2.5406427-2.5341615 3.9697543-2.5341615.6880907 0 1.2703213.2639752 1.5349716.7391304.3175804.5807454.2646503 1.3726708-.1587902 2.1645963C22.8431002 23.8913043 21.0964083 25 19.6672968 25zm2.6465028-4.6459627c-1.1644612 0-2.6994329 1.0031056-3.3345936 2.1645962-.3175803.5807454-.3705103 1.0559007-.2117202 1.3726708.2117202.3167702.5822306.3695653.899811.3695653 1.1644612 0 2.6994329-1.0031056 3.3345936-2.1645963.3175803-.5807453.3705104-1.0559006.2117202-1.3726708-.2117202-.3167702-.6351607-.3695652-.899811-.3695652zm-10.7977315-9.1863354H4.42344045L4 11.9068323h7.1455577l.3705104-.7391304zm-4.44612481 3.8540372h2.48771266l.3705104-.7391304H7.49338374l-.42344045.7391304zM13.1568998 8H8.07561437l-.42344046.73913043h5.08128549L13.1568998 8z"/>\
                    <path d="M14.1330998 7.84210526L18.0210158 0h-3.887916l-.4728546.84210526h3.0998249l-3.0472855 6.10526316L8.14360771 18H24.5884413L30 7.89473684H14.1330998v-.05263158zm10.0875657 9.36842104H9.35201401l1.20840629-2.3157895h14.8686515l-1.2084063 2.3157895zm1.6287215-3.1578947H10.9807356l1.2084063-2.3157895h14.9737303l-1.3134852 2.3157895zm-13.2924693-3.1052632l1.2084063-2.31578945h15.0262697L27.530648 10.9473684H12.5569177zm-4.88616464 6.2631579H.36777583L0 17.9473684h7.30297723l.36777583-.7368421z"/>\
                  </g>\
                </svg>\
            </div> \
            <div class="toastContent"> \
              <p>' + data.message + '</p> \
            </div> \
            <a class="toastClose" onclick="window.toast.closeToast()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"> \
                <path d="M44.8 9.4l-4.2-4.2L25 20.8 9.4 5.2 5.2 9.4 20.8 25 5.2 40.6l4.2 4.2L25 29.2l15.6 15.6 4.2-4.2L29.2 25"/> \
              </svg> \
            </a>';

        that.toastEl.innerHTML = elHtml;

        that.toastEl.classList.add('active');
        var timeoutFunc = setTimeout(function() {
            that.toastEl.classList.remove('active');
            clearTimeout(timeoutFunc);
        }, timeout);
    },
    initToast: function() {
        var that = this;
        var count = 0;

        var data = that.spliceArray(window.TOAST_DATA);

        that.showToast(data[count++], window.TOAST_DELAY || 5000);            
        that.intervalFunc = setInterval(function() {
            if(count >= data.length && data.length) {
                that.closeToast();
                return;
            }
            that.showToast(data[count++], window.TOAST_DELAY || 5000);
        }, window.TOAST_INTERVAL || 6000);
    },
    init: function(productId) {
        console.log('start');
        var that = this;

        window.toast = that;

        that.toastEl.className = "toastContainer";
        document.body.appendChild(this.toastEl);

        if (window.TOAST_DATA && window.TOAST_DATA.length == 0) {
            return;
        }

        if (window.TOAST_DATA) {
            that.initToast();
            return;
        }

        var request = new XMLHttpRequest();
        request.open('GET', 'https://sun.eduzz.com/toast/' + productId, true);
        request.onload = function() {
            if (request.status < 200 || request.status > 400) {
                return;
            }
            var data = JSON.parse(request.responseText);

            console.log(data);

            data = that.spliceArray(data);

            console.log(data);
            
            if(!data || !data.length) {
                return;
            }

            window.TOAST_DATA = data;

            that.initToast();
        };

        request.send();
    },
    spliceArray: function (data) {
        var that = this;

        return data
            .filter(function(item) {
                return item.enabled === true;
            })
            .filter(function(item) {
                if(!!item.gt && item.value > item.gt) {
                    return true;
                }

                if(!!item.lt && item.value < item.lt) {
                    return true
                }

                return false;
            })
            .map(function(item) {
                item.message = that.getMessage(item);
                return item;
            });
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = toast;
  }
  else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return toast;
      });
    }
    else {
      window.toast = toast;
    }
  }
