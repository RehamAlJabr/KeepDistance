var count =0;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById("info").innerHTML = "";

    },

    onDeviceReady: function() {
        console.log('exec onDeviceReady');
        app.receivedEvent('deviceready');
    },
  
    refreshDeviceList: function() {
        console.log('exec refreshDeviceList');
        document.getElementById("BLE-table-body").innerHTML = '';

        ble.scan([], 5, app.onDiscoverDevice, app.onError);
    },

    onDiscoverDevice: function(device) {
        console.log(JSON.stringify(device));
        var listItem = document.createElement('tr'),
          html = '<td class="mdl-data-table__cell--non-numeric">' + device.name + '</td>' +
            '<td class="mdl-data-table__cell--non-numeric">' + device.rssi + '</td>' +
            '<td class="mdl-data-table__cell--non-numeric">' + device.id + '</td>';

        listItem.setAttribute('onclick',"app.bleConnectionRequest('" + device.id + "')" ); 
        listItem.dataset.deviceId = device.id;
        listItem.innerHTML = html;
        document.getElementById("BLE-table-body").appendChild(listItem);
        count= count+1;
        console.log(" the number :"+ count);
    if (count > 0) {
        cordova.plugins.notification.local.schedule({
            title: 'Together To Stop Covid-19',
            text: 'Hey please keep distance',
            foreground: true,
            led: 'FF0000',
            smallIcon: 'res://mipmap-ldpi/ic_launcher.png'
        });
        document.getElementById("info").innerHTML = "Warning Please Keep Distance!!!";
    }
        cordova.plugins.notification.local.on(onclick, function () {
            count = 0;
        });
    },

};

document.addEventListener('deviceready', function () {
    // cordova.plugins.backgroundMode is now available
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.wakeUp();
    ble.scan([], 10, app.onDiscoverDevice, app.onError);
}, false);
