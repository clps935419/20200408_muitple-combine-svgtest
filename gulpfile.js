var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
//每個資料夾以30個svg為基準，且設定的資料夾名稱會對應合併的svg檔名，例如下列陣列
//模板的資料夾名稱也需對應下列陣列的名稱，且模板裡面的background-image路徑需改成與下列陣列檔名
//陣列裡面的名稱可自行命名但需修改合併前的svg資料夾名稱、合併讀的模板資料夾名稱、合併模板中的background-image檔名，上述需一致
var tmp_arr = ['a-b', 'c', 'c-e', 'f-h', 'i-l', 'm-n', 'p-w'];
tmp_arr.forEach(function(item, index, array) {
  var tmp_val = item;
  gulp.task(tmp_val, function() {
    return gulp
      .src('./cvs-svg/' + tmp_val + '/*.svg')//svg來源資料夾
      .pipe(
        svgSprite({
          shape: {
            spacing: {
              padding: 0
            }
          },
          mode: {
            css: {
              dest: './',
              layout: 'diagonal',
              sprite: '../css/svg(UTF8)/' + tmp_val + '-combine-svg.svg', //合併後的SVG檔檔名
              bust: false,
              render: {
                scss: {
                  dest: '../scss_test/scss/svg/_' + tmp_val + '-svg.scss',//產出的svg.scss
                  template:
                    './sprites/css/' + tmp_val + '/_sprite-template.scss'//讀取的模板資料
                }
              }
            }
          },
          variables: {
            mapname: 'icons'
          }
        })
      )
      .pipe(gulp.dest('sprites'));
  });
});
gulp.task('default', gulp.parallel(tmp_arr));

