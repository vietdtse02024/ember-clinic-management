import Component from '@ember/component';
import $ from 'jquery';
import { inject as service } from '@ember/service';

export default Component.extend({
  printThis: service(),
  paperWitdth: 312,
  paperHeight: 71,
  init() {
    this._super(...arguments);
    $("#tab-product").addClass('active');
  },
  actions:{
    print : function(){
      var PDF = document.getElementById('pdf_preview');
      PDF.focus();
      PDF.contentWindow.print();
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
      pdfMake.createPdf(docDefinition).print({}, window);
      /*pdfMake.createPdf(docDefinition).getDataUrl(function(outDoc) {
        self.set('pdfData', outDoc);
      });
      $("#view-pdf").modal({
        refresh: true
      });*/
    },
  }
});
