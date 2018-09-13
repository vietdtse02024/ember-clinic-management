import Component from '@ember/component';
import $ from 'jquery';
import Changeset from 'ember-changeset';

export default Component.extend({
  barcode : "",
  paperWitdth: 312,
  paperHeight: 71,
  init() {
    this._super(...arguments);
    $("#tab-product").addClass('active');
    this.changeset = new Changeset(this);
  },
  actions:{
    print : function(){
    },
    createPdf : function(){
      let self = this;
      let width = self.get('paperWitdth');
      let height = self.get('paperHeight');
      let docDefinition = {
        pageSize: {width: width, height: height},
        pageOrientation: 'landscape',
        pageMargins: [0, 0],
        content: [
          {
            columns: [
              {
                text: 'Nhà thuốc 20',
              },
              {
                text: 'Nhà thuốc 20',
              },
              {
                text: 'Nhà thuốc 20',
              },
            ],
            margin: [0, 10, 0, 0],
            width: width/3,
            fontSize : 8,
            alignment: 'center'
          },
          {
            columns: [
              {
                image: $("#img1").attr('src'),
                width: width/3,
              },
              {
                image: $("#img1").attr('src'),
                width: width/3,
              },
              {
                image: $("#img1").attr('src'),
                width: width/3,
              },

            ],
            alignment: 'center',

          },
          {
            columns: [
              {
                text: '0,9%',
              },
              {
                text: '0,9%',
              },
              {
                text: '0,9%',
              },

            ],
            width: width/3,
            fontSize : 6,
            alignment: 'center'
          },
          {
            columns: [
              {
                text: 'Giá: 11,000 đ',
              },
              {
                text: 'Giá: 11,000 đ',
              },
              {
                text: 'Giá: 11,000 đ',
              },

            ],
            width: width/3,
            fontSize : 6,
            alignment: 'center'
          },
        ],

      };
      let pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getBlob((blob) => {
        var url = URL.createObjectURL(blob);
        printJS(url);
      });
    },

  },
  blobToUint8Array : function (b) {
    var uri = URL.createObjectURL(b),
      xhr = new XMLHttpRequest(),
      i,
      ui8;

    xhr.open('GET', uri, false);
    xhr.send();

    URL.revokeObjectURL(uri);

    ui8 = new Uint8Array(xhr.response.length);

    for (i = 0; i < xhr.response.length; ++i) {
      ui8[i] = xhr.response.charCodeAt(i);
    }

    return ui8;
  }
});
