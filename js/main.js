$(function(){
    let $colsed_modal_btn = $('#js-colsed-btn');
    let $grid_wrap = $('#js-grid-wrap');
    let $output_warp = $('.output-wrap');
    let count_x = 4;
    let count_y = 4;

    function createImagesWrap() {
        for(let i=0 ; i < count_x * count_y ; i++) {
            $grid_wrap.append(
                `<div class="image-wrap">
                    <input type="file" class="edit-btn">
                    <img src="#" alt="your image" />
                </div>`
            );
        }

        $grid_wrap.css({
            'grid-template-columns': `repeat(${count_x}, 1fr)`,
            'grid-template-rows': `repeat(${count_y}, 1fr)`
        });
    }

    function bindImageEvent() {
        $('.edit-btn').each(function(index){
            let $img_wrap = $(this).siblings('img');

            $(this).on('change', function(event){
                /* refrence: http://jsfiddle.net/LvsYc/ */
                if (this.files && this.files[0]) {
                    var reader = new FileReader();
                    
                    reader.onload = function(e) {
                        $img_wrap.attr('src', e.target.result);
                    }
                    
                    reader.readAsDataURL(this.files[0]); // convert to base64 string
                }
            });
        });
    }

    async function buildView() {
        await createImagesWrap();
        await bindImageEvent();
    }

    $colsed_modal_btn.on('click', function(){
        $output_warp.removeClass('show');
    });


    /* init */
    buildView(); // promise

    var app = new Vue({
        el: '#app',
        data: {
            year_text: '',
            year_display: null,
            year_color: '',
            year_font_size: 0,
            year_font_weight: '',
            year_font_family_link: '',
            year_font_family_name: ''
        },
        created: function () {
            let today = new Date();
            this.year_text = today.getFullYear();

            this.year_display = $('#js-year-wrap').css('disply') == 'none' ? false : true;
            
            let year_rgb = getRGB($('#js-year-wrap').css('color'));
            let year_hex = rgbToHex(year_rgb.red, year_rgb.green, year_rgb.blue);
            this.year_color = year_hex;

            this.year_font_size = parseInt($('#js-year-wrap').css('font-size'));
            this.year_font_weight = $('#js-year-wrap').css('font-weight');
            this.year_font_family_link = document.querySelector('link[href*="fonts.googleapis"]').href;
            this.year_font_family_name = $('#js-year-wrap').css('font-family');
        },
        methods: {
            changeYearDisplay: function () {
                let flag = this.year_display ? 'block' : 'none';
                $('#js-year-wrap').css({
                    'display': flag
                });
            },
            changeYearText: function () {
                $('#js-year-wrap').val(this.year_text);
            },
            changeYearColor: function () {
                $('#js-year-wrap').css({
                    'color': this.year_color
                });
            },
            changeYearSize: function () {
                $('#js-year-wrap').css({
                    'font-size': this.year_font_size + 'px'
                });
            },
            changeYearWeight: function () {
                $('#js-year-wrap').css({
                    'font-weight': this.year_font_weight
                });
            },
            changeFontLink: function () {
                console.log(document.querySelector('link[href*="fonts.googleapis"]'));
                document.querySelector('link[href*="fonts.googleapis"]').href = this.year_font_family_link;
            },
            changeYearFont: function () {
                $('#js-year-wrap').css({
                    'font-family': this.year_font_family_name
                });
            },
            getScreenshot: function () {
                $(document).scrollTop(0);
                
                let $output = $('#output');
                $output.empty();
        
                html2canvas(document.querySelector("#capture")).then(canvas => {
                    $output.append(canvas);
                    $('.output-wrap').addClass('show');
                });
            }
        }
    })

    //---------------------------------------------
    // 將 rgb(red, green ,blue) 字串 轉換為 JSON物件
    // 來源: https://stackoverflow.com/questions/34980574/how-to-extract-color-values-from-rgb-string-in-javascript
    //---------------------------------------------
    function getRGB(str) {
        var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
        return match ? {
          red: parseInt(match[1]),
          green: parseInt(match[2]),
          blue: parseInt(match[3])
        } : {};
      }

    //-----------------------
    // 將 0~255 轉換為 16進位
    // 來源: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    //-----------------------
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    
    //-----------------------
    // 將 rgb 轉換為 hex
    // 來源: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    //-----------------------
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
});